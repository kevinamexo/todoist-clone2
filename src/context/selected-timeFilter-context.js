import React, { createContext, useContext, useState } from "react";

export const SelectedTimeFilterContext = createContext();

export const SelectedTimeFilterProvider = ({ children }) => {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("inbox");

  return (
    <SelectedTimeFilterContext.Provider
      value={{ selectedTimeFilter, setSelectedTimeFilter }}
    >
      {children}
    </SelectedTimeFilterContext.Provider>
  );
};

export const useSelectedTimeFilterValue = () =>
  useContext(SelectedTimeFilterContext);
