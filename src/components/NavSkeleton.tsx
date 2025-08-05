const NavSkeleton = () => {
    return (
        <nav className="main__nav nav">
            <div className="nav__top">
                <div className="nav__logo logo">
                    <p className="skeleton__text"></p>
                </div>
                <div className="nav__burger burger">
                    <span className="burger__line"></span>
                    <span className="burger__line"></span>
                    <span className="burger__line"></span>
                </div>
                <div className="nav__menu menu">
                    <ul className="menu__list">
                        <li className="menu__item">
                            <button className="skeleton__text"></button>
                        </li>
                    </ul>
                    <ul className="playlist__list">
                        <li className="playlist-list__item">
                            <button className="skeleton__text"></button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavSkeleton