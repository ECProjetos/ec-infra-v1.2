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
} from "lucide-react"

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        active: true,
    },
    {
        title: "Operações",
        url: "/operacoes",
        icon: Briefcase,
    },
    {
        title: "Financeiro",
        url: "#",
        icon: LineChart,
    },
    {
        title: "Gestão Estratégica",
        url: "#",
        icon: Puzzle,
    },
    {
        title: "Inteligência de Mercado",
        url: "#",
        icon: Globe2,
    },
    {
        title: "Sustentabilidade",
        url: "#",
        icon: Leaf,
    },
    {
        title: "Gestão da Infraestrutura",
        url: "#",
        icon: Users,
    },
]

export function AppSidebar() {
    return (
        <Sidebar className="mt-20">
            <SidebarContent className="mx-4">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        className={`text-sm font-medium flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${item.active
                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                            : "text-zinc-800 hover:bg-zinc-100 hover:translate-x-1"
                                            }`}
                                    >
                                        <a href={item.url}>
                                            <item.icon className="w-5 h-5" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
