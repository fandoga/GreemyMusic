import { useEffect, useState } from "react";
import SidebarSkeleton from "./SidebarSkeleton";
import UserSkeleton from "./UserSkeleton";
import { Link } from "react-router-dom";
import { usePlaylist } from "../context/PlaylistContext";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchPicks } from "../store/reducers/picks/picksThunks";

const Sidebar = () => {
    const dispatch = useAppDispatch()
    const { PicksPlaylists } = useAppSelector(state => state.playlistReducer)
    const { setPicksPlaylists } = usePlaylist()

    const playlistIds = [
        '1CnDCN10TJZjw6K2H3gNRv',
        '4JbSoqC2zjkAFiaN8K4NYy',
        '357fWKFTiDhpt9C69CMG4q'
    ];
    const [playlists, setPlaylists] = useState<{ id: string; image: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [user, SetUser] = useState(null);

    const loadData = async () => {
        const accessToken = localStorage.getItem('access-token');
        setLoading(true);

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
            );
            setPicksPlaylists(playlistData)
            setPlaylists(playlistData);

            // Загружаем пользователя
            const userRes = await fetch('https://api.spotify.com/v1/me', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            const userData = await userRes.json();
            SetUser(userData.display_name);
        } catch (err) {
            console.error('Ошибка:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        dispatch(fetchPicks({offset: 0, limit: 25}));
        console.log(PicksPlaylists);
        loadData();
    }, []);

    if (loading) {
        return (
            <SidebarSkeleton />
        );
    }

    return (
        <div className="main__sidebar sidebar">
            {loading
                ? <UserSkeleton />
                : (
                    <div className="sidebar__personal">
                        <p className="sidebar__personal-name">{user}</p>
                        <div className="sidebar__icon">
                            <Link to={"/login"}>
                                <svg>
                                    <use xlinkHref="/img/icon/sprite.svg#logout"></use>
                                </svg>
                            </Link>
                        </div>
                    </div>
                )
            }

            <div className="sidebar__block">
                <div className="sidebar__list">
                    {playlists.map((pl, index) => (
                        <div className="sidebar__item" key={pl.id}>
                            <Link className="sidebar__link" to={`/picks/${index + 1}`}>
                                <div
                                    className="sidebar__img"
                                    style={{ backgroundImage: `url(${pl.image})` }}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;