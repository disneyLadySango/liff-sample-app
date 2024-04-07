import { FC, ReactNode } from "react";

import { ChakraProvider } from "@/components/design-system";

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};
