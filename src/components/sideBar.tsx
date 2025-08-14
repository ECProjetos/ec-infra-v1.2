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
    type LucideIcon,
} from "lucide-react";

import { useUserPermissions } from "@/hooks/use-permissions";
import { usePermissionStore } from "@/stores/usePermissionStore";

/** ----------------------- Tipos ----------------------- */
type NavItem = {
    title: string;
    perm: string;          // deve casar com "value" vindo em permissoes
    url?: string;          // se existe, é item clicável (folha)
    icon?: LucideIcon;     // apenas usado no nível raiz
    subitems?: NavItem[];  // suporte ilimitado a nested submenus
};

/** ----------------------- Helpers ----------------------- */
const normalizePerm = (p: string) => p.replace(/^\/+/, ""); // remove barras iniciais
const normalizePath = (p: string) => {
    const url = p.split("?")[0].split("#")[0];
    return url !== "/" ? url.replace(/\/+$/, "") : "/";
};

const pathStartsWith = (pathname: string, candidate: string) => {
    const a = normalizePath(pathname);
    const b = normalizePath(candidate);
    return a === b || a.startsWith(b + "/");
};

/** Filtra recursivamente respeitando a regra:
 * - Grupo só aparece se o usuário tiver a perm do grupo E pelo menos um subitem permitido
 * - Item simples precisa da perm do próprio item
 */
function filterByPermissions(items: NavItem[], userPerms: Set<string>): NavItem[] {
    return items
        .map<NavItem | null>((item) => {
            const permOk = userPerms.has(normalizePerm(item.perm));

            if (item.url) {
                return permOk ? item : null;
            }

            if (item.subitems && item.subitems.length > 0) {
                const filteredChildren = filterByPermissions(item.subitems, userPerms);
                if (permOk && filteredChildren.length > 0) {
                    return { ...item, subitems: filteredChildren };
                }
            }

            return null;
        })
        .filter(Boolean) as NavItem[];
}

/** Retorna a cadeia de perms (ancestrais -> alvo) até o item cujo url casa com a rota atual.
 * Usa o prefixo do ativo ao comparar.
 */
function findPermPathByUrl(items: NavItem[], pathname: string, ativoPrefix: string): string[] | null {
    for (const item of items) {
        if (item.url && pathStartsWith(pathname, ativoPrefix + item.url)) {
            return [normalizePerm(item.perm)];
        }
        if (item.subitems?.length) {
            const path = findPermPathByUrl(item.subitems, pathname, ativoPrefix);
            if (path) return [normalizePerm(item.perm), ...path];
        }
    }
    return null;
}

/** ----------------------- Configuração do menu ----------------------- */
const items: NavItem[] = [
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
            { title: "Laboratórios", url: "/sustentabilidade/laboratorios", perm: "sustentabilidade/laboratorios" },
            {
                title: "Licensas Ambientais",
                perm: "sustentabilidade/licensas",
                subitems: [
                    { title: "Painel de Licensas", url: "/sustentabilidade/licensas/dashboard", perm: "sustentabilidade/licensas/dashboard" },
                    { title: "Coleta de Dados", url: "/sustentabilidade/licensas/coleta-dados", perm: "sustentabilidade/licensas/coleta-dados" },
                ],
            },
            { title: "Cadastro P&P", url: "/sustentabilidade/programas", perm: "sustentabilidade/criar-programa" },
            { title: "PBA Do Porto", url: "/sustentabilidade/pba-do-porto", perm: "sustentabilidade/pba-do-porto" },
            { title: "Geração de Relatórios", url: "/sustentabilidade/relatorios", perm: "sustentabilidade/gerar-relatorios" },
        ],
    },
    { title: "Gestão da Infraestrutura", url: "/infraestrutura", icon: Users, perm: "infraestrutura" },
];

/** ----------------------- Componente ----------------------- */
export function AppSidebar() {
    const pathname = usePathname();
    const ativo = useAtivoStore((state) => state.ativo);
    const permissions = usePermissionStore().permissions as string[] | undefined;

    // carrega dados externos
    useAtivoAtual();
    useUserPermissions();

    const ativoPrefix = ativo ? `/${ativo.url}` : "";

    // Normaliza conjunto de permissões do usuário (remove barra inicial)
    const userPerms = useMemo(
        () => new Set((permissions ?? []).map(normalizePerm)),
        [permissions]
    );

    /** Filtragem recursiva com perms normalizadas */
    const filteredItems = useMemo<NavItem[]>(() => {
        return filterByPermissions(items, userPerms);
    }, [userPerms]);

    /** Estado de grupos abertos — usa a perm normalizada como chave estável */
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());

    // Abre automaticamente toda a cadeia de grupos até o item ativo (em qualquer profundidade)
    useEffect(() => {
        if (!ativo) return;

        const permsPath = findPermPathByUrl(filteredItems, normalizePath(pathname), ativoPrefix);

        if (permsPath && permsPath.length > 0) {
            setOpenItems((prev) => {
                const next = new Set(prev);
                permsPath.forEach((perm) => next.add(perm));
                return next;
            });
        }
    }, [ativo, ativoPrefix, pathname, filteredItems]);

    if (!ativo) return null;

    const toggleOpen = (permKey: string) => {
        setOpenItems((prev) => {
            const next = new Set(prev);
            if (next.has(permKey)) next.delete(permKey);
            else next.add(permKey);
            return next;
        });
    };

    /** Determina se um item (url) está ativo considerando subrotas */
    const isUrlActive = (url?: string) => {
        if (!url) return false;
        return pathStartsWith(pathname, ativoPrefix + url);
    };

    /** Atividade recursiva: grupo é ativo se QUALQUER descendente (em qualquer nível) estiver ativo */
    const isGroupActive = (node: NavItem): boolean => {
        if (node.url && isUrlActive(node.url)) return true;
        if (node.subitems?.length) return node.subitems.some(isGroupActive);
        return false;
    };

    /** Render recursivo */
    const renderItems = (nodes: NavItem[], depth = 0) => {
        return nodes.map((item) => {
            const permKey = normalizePerm(item.perm);
            const isGroup = !!item.subitems?.length && !item.url;
            const isActive = isGroup ? isGroupActive(item) : isUrlActive(item.url);
            const isOpen = isGroup && openItems.has(permKey);

            if (isGroup) {
                return (
                    <SidebarMenuItem key={permKey}>
                        <SidebarMenuButton
                            onClick={() => toggleOpen(permKey)}
                            className={[
                                "text-sm font-medium flex items-center justify-between gap-2 px-4 py-2 rounded-lg transition-all duration-200",
                                isActive
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "text-zinc-800 hover:bg-zinc-100",
                            ].join(" ")}
                            style={{ paddingLeft: `${Math.min(4 + depth * 8, 48)}px` }}
                        >
                            <div className="flex items-center gap-2">
                                {item.icon ? <item.icon className="w-5 h-5" /> : null}
                                <span>{item.title}</span>
                            </div>
                            <ChevronDown
                                className={[
                                    "w-5 h-5 transition-transform duration-200",
                                    isOpen ? "rotate-180" : "",
                                ].join(" ")}
                            />
                        </SidebarMenuButton>

                        {isOpen && item.subitems?.length ? (
                            <SidebarMenu className="mt-2">
                                {renderItems(item.subitems, depth + 1)}
                            </SidebarMenu>
                        ) : null}
                    </SidebarMenuItem>
                );
            }

            // Item folha (com URL)
            return (
                <SidebarMenuItem key={permKey}>
                    <SidebarMenuButton
                        asChild
                        className={[
                            "text-sm font-medium flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200",
                            isActive
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "text-zinc-800 hover:bg-zinc-100 hover:translate-x-1",
                        ].join(" ")}
                        style={{ paddingLeft: `${Math.min(4 + depth * 8, 48)}px` }}
                    >
                        <Link href={ativoPrefix + (item.url ?? "#")} className="flex items-center gap-2 w-full">
                            {item.icon ? <item.icon className="w-5 h-5" /> : null}
                            <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>

                    {item.subitems?.length ? (
                        <SidebarMenu className="mt-2 pl-2">
                            {renderItems(item.subitems, depth + 1)}
                        </SidebarMenu>
                    ) : null}
                </SidebarMenuItem>
            );
        });
    };

    return (
        <Sidebar className="mt-20">
            <SidebarContent className="mx-4">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>{renderItems(filteredItems)}</SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
