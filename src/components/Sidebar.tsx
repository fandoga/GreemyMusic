

const Sidebar = () => {
    return (
        <div className="main__sidebar sidebar">
            <div className="sidebar__personal">
                <p className="sidebar__personal-name">Sergey.Ivanov</p>
                <div className="sidebar__icon">
                    <svg>
                        <use xlinkHref="img/icon/sprite.svg#logout"></use>
                    </svg>
                </div>
            </div>
            <div className="sidebar__block">
                <div className="sidebar__list">
                    <div className="sidebar__item">
                        <a className="sidebar__link" href="#">
                            <img
                                className="sidebar__img"
                                src="img/playlist01.png"
                                alt="day's playlist"
                            />
                        </a>
                    </div>
                    <div className="sidebar__item">
                        <a className="sidebar__link" href="#">
                            <img
                                className="sidebar__img"
                                src="img/playlist02.png"
                                alt="day's playlist"
                            />
                        </a>
                    </div>
                    <div className="sidebar__item">
                        <a className="sidebar__link" href="#">
                            <img
                                className="sidebar__img"
                                src="img/playlist03.png"
                                alt="day's playlist"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;