"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
    LayoutDashboard,
    Briefcase,
    LineChart,
    Puzzle,
    Globe2,
    Leaf,
    Users,
    ChevronDown,
} from "lucide-react"

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Operações",
        url: "/operacoes",
        icon: Briefcase,
    },
    {
        title: "Financeiro",
        url: "/financeiro",
        icon: LineChart,
    },
    {
        title: "Gestão Estratégica",
        url: "/estrategica",
        icon: Puzzle,
    },
    {
        title: "Inteligência de Mercado",
        url: "/mercado",
        icon: Globe2,
    },
    {
        title: "Sustentabilidade",
        icon: Leaf,
        subitems: [
            {
                title: "Dashboard",
                url: "/sustentabilidade/dashboard",
            },
            {
                title: "Criar Programas",
                url: "/sustentabilidade/programas",
            },
            {
                title: "Gestão & Medições",
                url: "/sustentabilidade/gestao-medicoes",
            },
            {
                title: "IDA ANTAQ",
                url: "/sustentabilidade/ida-antaq",
            },
        ],
    },
    {
        title: "Gestão da Infraestrutura",
        url: "/infraestrutura",
        icon: Users,
    },
]

export function AppSidebar() {
    const pathname = usePathname()
    const [openItems, setOpenItems] = useState<string[]>([])

    const toggleItem = (title: string) => {
        setOpenItems((prev) =>
            prev.includes(title)
                ? prev.filter((item) => item !== title)
                : [...prev, title]
        )
    }

    return (
        <Sidebar className="mt-20">
            <SidebarContent className="mx-4">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isOpen = openItems.includes(item.title)
                                const isActive =
                                    item.url && pathname === item.url ||
                                    item.subitems?.some((sub) => pathname.startsWith(sub.url))

                                // Menu com subitens
                                if (item.subitems) {
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                className={`text-sm font-medium flex items-center justify-between gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                                    : "text-zinc-800 hover:bg-zinc-100"
                                                    }`}
                                                onClick={() => toggleItem(item.title)}
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
                                                    {item.subitems.map((subitem) => {
                                                        const isSubitemActive = pathname === subitem.url
                                                        return (
                                                            <Link
                                                                key={subitem.title}
                                                                href={subitem.url}
                                                                className={`text-sm font-medium flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isSubitemActive
                                                                    ? "bg-blue-500 text-white"
                                                                    : "text-zinc-700 hover:bg-zinc-100"
                                                                    }`}
                                                            >
                                                                {subitem.title}
                                                            </Link>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </SidebarMenuItem>
                                    )
                                }

                                // Menu simples
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            className={`text-sm font-medium flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                                : "text-zinc-800 hover:bg-zinc-100 hover:translate-x-1"
                                                }`}
                                        >
                                            <Link href={item.url!} className="flex items-center gap-2 w-full">
                                                <item.icon className="w-5 h-5" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
