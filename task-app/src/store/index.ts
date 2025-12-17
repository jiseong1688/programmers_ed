import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer/reducer";

const store = configureStore({
    reducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
// 타입스크립트가 추론 X => 개발자가 타입지정 annotate를 해야한다.


export default store;