import React, { createContext, useState, useContext } from "react";

interface PlaylistContextType {
    playlistId: string;
    playlistTitle: string;
    picksPlaylists: {}
    setPlaylistId: React.Dispatch<React.SetStateAction<string>>;
    setPlaylistTitle: React.Dispatch<React.SetStateAction<string>>;
    setPicksPlaylists: React.Dispatch<React.SetStateAction<{}>>;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [picksPlaylists, setPicksPlaylists] = useState({});
    const [playlistId, setPlaylistId] = useState("");
    const [playlistTitle, setPlaylistTitle] = useState("Ваш плейлист")

    return (
        <PlaylistContext.Provider value={{ playlistId, picksPlaylists, setPicksPlaylists, setPlaylistId, playlistTitle, setPlaylistTitle }}>
            {children}
        </PlaylistContext.Provider>
    );
};

export const usePlaylist = () => {
    const context = useContext(PlaylistContext);
    if (!context) {
        throw new Error("usePlaylist must be used within a PlaylistProvider");
    }
    return context;
};