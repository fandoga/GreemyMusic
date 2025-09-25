import { combineReducers, configureStore } from "@reduxjs/toolkit";
import trackReducer from "./reducers/trackSlice";


const rootReducer = combineReducers({
    track: trackReducer
})

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]

