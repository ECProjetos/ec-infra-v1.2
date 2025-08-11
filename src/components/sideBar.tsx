/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAtivoAtual } from "@/hooks/use-ativo";
import { useAtivoStore } from "@/stores/useAtivoStore";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
    LayoutDashboard,
    Briefcase,
    LineChart,
    Puzzle,
    Globe2,
    Leaf,
    Users,
    ChevronDown,
} from "lucide-react";
import { useUserPermissions } from "@/hooks/use-permissions";
import { usePermissionStore } from "@/stores/usePermissionStore";

type Subitem = {
    title: string;
    url: string;
    perm: string; // deve casar com "value" vindo em permissoes
};

type MenuItem =
    | {
        title: string;
        url: string;
        icon: any;
        perm: string; // deve casar com "value" vindo em permissoes
        subitems?: never;
    }
    | {
        title: string;
        icon: any;
        perm: string; // perm do grupo pai
        subitems: Subitem[];
        url?: never;
    };

const items: MenuItem[] = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, perm: "dashboard" },
    { title: "Operações", url: "/operacoes", icon: Briefcase, perm: "operacoes" },
    { title: "Financeiro", url: "/financeiro", icon: LineChart, perm: "financeiro" },
    { title: "Gestão Estratégica", url: "/estrategica", icon: Puzzle, perm: "estrategica" },
    { title: "Inteligência de Mercado", url: "/mercado", icon: Globe2, perm: "mercado" },
    {
        title: "Sustentabilidade",
        icon: Leaf,
        perm: "sustentabilidade",
        subitems: [
            { title: "Dashboard", url: "/sustentabilidade/dashboard", perm: "sustentabilidade/dashboard" },
            { title: "Licensas Ambientais", url: "/sustentabilidade/licensas", perm: "sustentabilidade/licensas" },
            { title: "Cadastro P&P", url: "/sustentabilidade/programas", perm: "sustentabilidade/criar-programa" },
            { title: "PBA Do Porto", url: "/sustentabilidade/pba-do-porto", perm: "sustentabilidade/pba-do-porto" },
            { title: "Geração de Relatórios", url: "/sustentabilidade/gerar-relatorios", perm: "sustentabilidade/gerar-relatorios" },
        ],
    },
    { title: "Gestão da Infraestrutura", url: "/infraestrutura", icon: Users, perm: "infraestrutura" },
];

export function AppSidebar() {
    const pathname = usePathname();
    const [openItems, setOpenItems] = useState<string[]>([]);
    const ativo = useAtivoStore((state) => state.ativo);
    const permissions = usePermissionStore().permissions as string[]; // ex.: ["dashboard", "sustentabilidade", "sustentabilidade/dashboard", ...]
    const userPerms = useMemo(() => new Set(permissions ?? []), [permissions]);

    useAtivoAtual();
    useUserPermissions();

    const ativoPrefix = ativo ? `/${ativo.url}` : "";

    /** Filtra menu e submenus conforme permissões */
    const filteredItems = useMemo<MenuItem[]>(() => {
        return items
            .map((item) => {
                // item simples: precisa da perm do próprio item
                if ("url" in item) {
                    if (!userPerms.has(item.perm)) return null;
                    return item;
                }

                // grupo: precisa da perm do grupo E pelo menos um subitem permitido
                if (!userPerms.has(item.perm)) return null;

                const allowedSubs = item.subitems.filter((s) => userPerms.has(s.perm));
                if (allowedSubs.length === 0) return null;

                return { ...item, subitems: allowedSubs };
            })
            .filter(Boolean) as MenuItem[];
    }, [userPerms]);

    // Abre automaticamente o grupo do subitem ativo
    useEffect(() => {
        if (!ativo) return;
        const current = filteredItems.find(
            (item) =>
                "subitems" in item &&
                item.subitems?.some((sub) => pathname.startsWith(ativoPrefix + sub.url))
        );

        if (current && !openItems.includes(current.title)) {
            setOpenItems((prev) => [...prev, current.title]);
        }
    }, [ativo, ativoPrefix, pathname, filteredItems, openItems]);

    if (!ativo) return null;

    const toggleItem = (title: string) => {
        setOpenItems((prev) =>
            prev.includes(title) ? prev.filter((i) => i !== title) : [...prev, title]
        );
    };

    return (
        <Sidebar className="mt-20">
            <SidebarContent className="mx-4">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {filteredItems.map((item) => {
                                const isActive =
                                    ("url" in item && pathname === ativoPrefix + item.url) ||
                                    ("subitems" in item &&
                                        item.subitems?.some((sub) =>
                                            pathname.startsWith(ativoPrefix + sub.url)
                                        ));

                                if ("subitems" in item) {
                                    const isOpen = openItems.includes(item.title);
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                onClick={() => toggleItem(item.title)}
                                                className={`text-sm font-medium flex items-center justify-between gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                                    : "text-zinc-800 hover:bg-zinc-100"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <item.icon className="w-5 h-5" />
                                                    <span>{item.title}</span>
                                                </div>
                                                <ChevronDown
                                                    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </SidebarMenuButton>

                                            {isOpen && (
                                                <div className="pl-6 mt-2 space-y-1">
                                                    {item.subitems?.map((subitem) => {
                                                        const isSubitemActive =
                                                            pathname === ativoPrefix + subitem.url;
                                                        return (
                                                            <Link
                                                                key={subitem.title}
                                                                href={ativoPrefix + subitem.url}
                                                                className={`text-sm font-medium flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isSubitemActive
                                                                    ? "bg-blue-500 text-white"
                                                                    : "text-zinc-700 hover:bg-zinc-100"
                                                                    }`}
                                                            >
                                                                {subitem.title}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </SidebarMenuItem>
                                    );
                                }

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            className={`text-sm font-medium flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                                : "text-zinc-800 hover:bg-zinc-100 hover:translate-x-1"
                                                }`}
                                        >
                                            <Link
                                                href={ativoPrefix + item.url}
                                                className="flex items-center gap-2 w-full"
                                            >
                                                <item.icon className="w-5 h-5" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
