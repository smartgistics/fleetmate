import { SidebarProvider } from "@/components/layout/SidebarContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { MainContent } from "@/components/layout/MainContent";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar />
      <MainContent>{children}</MainContent>
    </SidebarProvider>
  );
}
