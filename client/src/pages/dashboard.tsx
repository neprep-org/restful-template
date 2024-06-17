import React from "react";
import SideBar from "../components/sidebar";
import { DashboardProvider } from "../context/DashboardContext";

const Dashboard = () => {
  return (
    <DashboardProvider>
      <div className=" h-screen w-full">
        <SideBar />
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;
