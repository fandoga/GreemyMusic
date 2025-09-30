import { createAsyncThunk } from "@reduxjs/toolkit";

interface fetchTrackArgs {
    offset : number,
    limit : number,
}


export const fetchPicks = createAsyncThunk<
        any,
        fetchTrackArgs,
        { rejectValue: string }
    >(
    "track/fetchPicks",
    async ({offset, limit = 25}, thunkAPI) => {
        const playlistIds = [
            '1CnDCN10TJZjw6K2H3gNRv',
            '4JbSoqC2zjkAFiaN8K4NYy',
            '357fWKFTiDhpt9C69CMG4q'
        ];
        const accessToken = localStorage.getItem('access-token');
        try {
            const playlistData = await Promise.all(
                playlistIds.map(async (id) => {
                    const res = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    });
                    const data = await res.json();
                    return {
                        data,
                        id,
                        image: data.images[0]?.url || `/img/playlist0${id + 1}`,
                    };
                })
            )
            // const data = await res.json();
            // return { data, offset }
            console.log(playlistData);
            return { playlistData, offset }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(`Не удалось выполнить загрузку. ${e.message}`)
        }
    }
)