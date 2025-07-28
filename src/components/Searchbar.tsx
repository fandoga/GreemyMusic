
interface SearchbarProps {
    setSearch?: React.Dispatch<React.SetStateAction<string>> | undefined;
}

const Searchbar: React.FC<SearchbarProps> = ({ setSearch }) => {
    return (
        <div className="centerblock__search search">
            <svg className="search__svg">
                <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
            </svg>
            <input
                onChange={e => setSearch?.(e.target.value)}
                className="search__text"
                type="search"
                placeholder="Поиск"
                name="search"
            />
        </div>
    );
}
export default Searchbar;