import type { RootState,AppDispatch } from "../store";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();


