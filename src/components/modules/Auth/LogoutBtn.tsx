"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import React from "react";

const LogoutBtn = () => {

    const signOut = async () => {
        await authClient.signOut();
        window.location.href = "/";
    }


  return (
    <Button
      asChild
      size="sm"
      className="cursor-pointer"
      onClick={() => {
        signOut();
      }}
    >
      <span>Logout</span>
    </Button>
  );
};

export default LogoutBtn;
