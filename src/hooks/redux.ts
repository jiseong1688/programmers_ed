import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch,RootState } from "../store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const useTypedDispatch = () => useDispatch<AppDispatch>();

// const logger = useSelector((state: TypedUseSelectorHook<RootState>) => state.logger);

// interface Obj<T> {
//     name: T;
// }
