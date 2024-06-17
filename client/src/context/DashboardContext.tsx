import React, { createContext, useState } from "react";
import { ActiveButtonType } from "../types/types";

const DashboardContext = createContext(null as any);

const DashboardProvider = ({ children }: any) => {
  const [activeButton, setActiveButton] =
    useState<ActiveButtonType>("Entity 1");
  return (
    <DashboardContext.Provider value={{ activeButton, setActiveButton }}>
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContext, DashboardProvider };
