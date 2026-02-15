import React from "react";
import { HeadProvider } from "react-head";

const HeadContextProvider = ({ children }) => {
  return <HeadProvider>{children}</HeadProvider>;
};

export default HeadContextProvider;