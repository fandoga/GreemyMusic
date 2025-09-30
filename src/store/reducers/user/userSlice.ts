import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUser } from "./userThunk";

interface UserState {
    userName: string
    isLoading: boolean;
    error: {};
}

const initialState: UserState = {
    userName: "Мой аккаунт",
    isLoading: false,
    error: {},
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true
        },
        finishLoading(state) {
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.userName = action.payload?.data?.display_name ?? "Мой аккаунт";

                state.isLoading = false;
                state.error = ''
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? 'Неизвестная ошибка'
            })
    },
})


export default userSlice.reducer;