import { combineReducers, configureStore } from "@reduxjs/toolkit";
import trackReducer from "./reducers/track/trackSlice";
import playlistReducer from "./reducers/playlists/playlistSlice";


const rootReducer = combineReducers({
    trackReducer,
    playlistReducer
})

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]

