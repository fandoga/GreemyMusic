const SidebarSkeleton = () => {
    return (
        <div className="main__sidebar sidebar">
            <div className="skeleton__none"></div>
            <div className="sidebar__block">
                <div className="sidebar__list">
                    <div className="sidebar__item skeleton__big"></div>
                    <div className="sidebar__item skeleton__big"></div>
                    <div className="sidebar__item skeleton__big"></div>
                </div>
            </div>
        </div>
    );
}

export default SidebarSkeleton;