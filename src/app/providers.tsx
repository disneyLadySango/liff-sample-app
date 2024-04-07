import { ChakraProvider } from "@/components/design-system";
import { FC, ReactNode } from "react";

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};
