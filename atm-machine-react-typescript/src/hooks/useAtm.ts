import { useContext } from "react";
import { AtmContext } from "../context/AtmContext";

export const useAtm = () => {
  const context = useContext(AtmContext);
  if (!context) {
    throw new Error("useAtm must be used within an AtmProvider");
  }
  return context;
};
