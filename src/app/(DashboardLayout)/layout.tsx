import { AppSidebar } from "@/components/modules/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";
import React from "react";
export const dynamic = "force-dynamic";

const dashboardLayout = async ({
  admin,
  user,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
}) => {
  const { data } = await userService.getSession();
  if (!data?.user) {
    redirect("/login");
  }
  const roles = data.user.role;

  return (
    <SidebarProvider>
      <AppSidebar roles={roles} />
      <main>
        <SidebarTrigger />
        {(roles as string) === "ADMIN" ? admin : user}
      </main>
    </SidebarProvider>
  );
};
export default dashboardLayout;
