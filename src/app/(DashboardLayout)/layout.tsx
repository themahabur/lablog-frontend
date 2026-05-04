import { AppSidebar } from "@/components/shared/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const roles = "user";

const dashboardLayout = ({
  admin,
  user,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
}) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {roles as string === "admin" ? admin : user}
      </main>
    </SidebarProvider>
  );
};
export default dashboardLayout;
