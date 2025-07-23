import React, { createContext, useState, useContext } from "react";

interface PlaylistContextType {
    playlistId: string;
    setPlaylistId: React.Dispatch<React.SetStateAction<string>>;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [playlistId, setPlaylistId] = useState("");

    return (
        <PlaylistContext.Provider value={{ playlistId, setPlaylistId }}>
            {children}
        </PlaylistContext.Provider>
    );
};

// Хук, чтобы использовать контекст
export const usePlaylist = () => {
    const context = useContext(PlaylistContext);
    if (!context) {
        throw new Error("usePlaylist must be used within a PlaylistProvider");
    }
    return context;
};