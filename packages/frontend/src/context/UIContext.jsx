import { createContext, useContext, useState } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("light");

  const value = {
    sidebarOpen,
    setSidebarOpen,
    theme,
    setTheme
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  return useContext(UIContext);
}
