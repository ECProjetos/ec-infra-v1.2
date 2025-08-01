import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sideBar";
import { AppNav } from "@/components/navBar";
export default async function PrivateLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div>
            <AppNav />
            <SidebarProvider >
                <AppSidebar />
                <SidebarInset>
                    <main className="h-screen w-full mt-20">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
