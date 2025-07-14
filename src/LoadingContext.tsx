import React, { createContext, useContext } from "react";
export const LoadingContext = createContext(true);
export const useLoading = () => useContext(LoadingContext);