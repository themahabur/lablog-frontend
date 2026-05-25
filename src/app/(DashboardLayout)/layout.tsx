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
      <div className="flex min-h-screen w-full">
        <AppSidebar roles={roles} />

        <main className="flex-1 p-4">
          <SidebarTrigger />

          {roles === "ADMIN" ? admin : user}
        </main>
      </div>
    </SidebarProvider>
  );
};
export default dashboardLayout;
