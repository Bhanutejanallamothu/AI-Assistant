import { Header } from '@/components/header';
import { Nav } from '@/components/nav';
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { users } from '@/lib/data';

// In a real app, this would come from an auth session.
// We're using a mock user for demonstration.
const currentUser = users[0];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <Nav userRole={currentUser.role} />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="flex flex-col">
            <Header />
            <main className="flex-1 p-6 md:p-8">{children}</main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
