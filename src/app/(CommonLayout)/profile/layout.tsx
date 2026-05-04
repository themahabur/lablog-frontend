import { Heart, Home, LogOut, MapPin, Package, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

const menuItems = [
  { id: "account", icon: Home, label: "Account", url: "/profile" },
  {
    id: "my-equipment",
    icon: Package,
    label: "My Equipment",
    url: "/profile/my-equipment",
  },
  {
    id: "wishlist",
    icon: Heart,
    label: "Wishlist",
    url: "/profile/wishlist",
  },
  { id: "settings", icon: Settings, label: "Settings", url: "/profile/settings" },
  { id: "logout", icon: LogOut, label: "Logout", url: "/" },
];

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex gap-6 bg-zinc-50 font-sans dark:bg-black p-6 ">
      <div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-4">
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    href={item.url}
                    key={item.id}
                    //   onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors cursor-pointer`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
      <div className="lg:col-span-3 mt-6 lg:mt-0">{children}</div>
    </div>
  );
};

export default layout;
