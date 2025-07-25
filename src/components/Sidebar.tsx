import { useEffect, useState } from "react";
import { useLoading } from "../context/LoadingContext";
import SidebarSkeleton from "./SidebarSkeleton";
import UserSkeleton from "./UserSkeleton";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const loadingGlobal = useLoading();
    const [loading, setLoading] = useState(false);
    const [user, SetUser] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('access-token');
        if (!accessToken) return;

        setLoading(true)
        fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                SetUser(data.display_name)
                setLoading(false)
            })

            .catch(err => {
                console.error('Ошибка:', err);
            });
    }, []);

    if (loadingGlobal) {
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
                    <div className="sidebar__item">
                        <Link className="sidebar__link" to="/picks/1">
                            <img
                                className="sidebar__img"
                                src="/img/playlist01.png"
                                alt="day's playlist"
                            />
                        </Link>
                    </div>
                    <div className="sidebar__item">
                        <Link className="sidebar__link" to="/picks/2">
                            <img
                                className="sidebar__img"
                                src="/img/playlist02.png"
                                alt="day's playlist"
                            />
                        </Link>
                    </div>
                    <div className="sidebar__item">
                        <Link className="sidebar__link" to="/picks/3">
                            <img
                                className="sidebar__img"
                                src="/img/playlist03.png"
                                alt="day's playlist"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;