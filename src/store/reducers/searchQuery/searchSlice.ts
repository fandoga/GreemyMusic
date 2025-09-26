// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { fetchSearchQuery } from "./searchThunks";

// interface TrackState {
//     AllTracks: any;
//     isLoading: boolean;
//     error: string;
//     hasMoreTracks: boolean;
// }

// const initialState: TrackState = {
//     AllTracks: [],
//     isLoading: false,
//     error: "",
//     hasMoreTracks: true
// }

// export const searchSlice = createSlice({
//     name: 'search',
//     initialState,
//     reducers: {
//         startLoading(state) {
//             state.isLoading = true
//         },

//         finishLoading(state) {
//             state.isLoading = false
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchSearchQuery.pending, (state) => {
//             })
//             .addCase(fetchSearchQuery.fulfilled, (state, action: PayloadAction<any>) => {
//                 if (action.payload.offset === 0) {
//                     // первая загрузка
//                     state.AllTracks = action.payload.data;
//                     state.hasMoreTracks = true
//                   } else {
//                     // догружаем
//                     state.AllTracks = [...state.AllTracks, ...action.payload.data.items];
//                     if (action.payload.data.next === null) {
//                         state.hasMoreTracks = false
//                     }
//                   }
//                 state.isLoading = false;
//                 state.error = ''
//             })
//             .addCase(fetchSearchQuery.rejected, (state, action) => {
//                 state.isLoading = false
//                 state.error = action.payload ?? 'Неизвестная ошибка'
//             })
//     },
// })


// export default searchSlice.reducer;