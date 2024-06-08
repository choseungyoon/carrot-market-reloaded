import TabBar from "@/components/tabBar";
import React from "react";

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <TabBar></TabBar>
    </div>
  );
}
