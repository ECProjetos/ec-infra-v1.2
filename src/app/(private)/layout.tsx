"use client"
import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sideBar";
import { AppNav } from "@/components/navBar";
import { usePathname } from "next/navigation";

export default function PrivateLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const shouldShowSidebar = pathname !== '/selecionar-ativo' && pathname !== '/cadastrar-ativo';

    return (
        <div>
            <AppNav />
            <SidebarProvider>
                {shouldShowSidebar && <AppSidebar />}
                <SidebarInset className={`mt-20 ${!shouldShowSidebar ? 'ml-0' : ''}`}>
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}

