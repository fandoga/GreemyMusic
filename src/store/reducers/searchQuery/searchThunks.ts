import { createAsyncThunk } from "@reduxjs/toolkit";

interface FetchSearchArgs {
    offset: number,
    limit: number,
    query: string,
}

export const fetchSearchQuery = createAsyncThunk<
        any,
        FetchSearchArgs,
        { rejectValue: string }
    >(
    "search/fetchQuery",
    async ({offset, limit = 25, query}, thunkAPI) => {
        const accessToken = localStorage.getItem('access-token');
        try {
            const res = await fetch(
                `https://api.spotify.com/v1/search?q=track:${encodeURIComponent(query)}&type=track&offset=${offset}&limit=${limit}`,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            const data = await res.json();
            return { data, offset }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(`Не удалось выполнить загрузку. ${e.message}`)
        }
    }
)


