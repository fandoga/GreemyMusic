const NavSkeleton = () => {
    return (
        <div className="nav__menu menu">
            <ul className="menu__list">
                <li className="menu__item">
                    <p className="skeleton__text"></p>
                </li>
            </ul>
            <ul className="playlist__list">
                <li className="playlist-list__item">
                    <p className="skeleton__text"></p>
                </li>
            </ul>
        </div>
    );
}

export default NavSkeleton