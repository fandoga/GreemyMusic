import Searchbar from "./Searchbar";
import Track from "./Track";

const Center = () => {
    return (
        <div className="main__centerblock centerblock">
            <Searchbar />
            <h2 className="centerblock__h2">Треки</h2>
            <div className="centerblock__filter filter">
                <div className="filter__title">Искать по:</div>
                <div className="filter__button button-author _btn-text">
                    исполнителю
                </div>
                <div className="filter__button button-year _btn-text">
                    году выпуска
                </div>
                <div className="filter__button button-genre _btn-text">жанру</div>
            </div>
            <div className="centerblock__content">
                <div className="content__title playlist-title">
                    <div className="playlist-title__col col01">Трек</div>
                    <div className="playlist-title__col col02">ИСПОЛНИТЕЛЬ</div>
                    <div className="playlist-title__col col03">АЛЬБОМ</div>
                    <div className="playlist-title__col col04">
                        <svg className="playlist-title__svg" >
                            <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
                        </svg>
                    </div>
                </div>
                <div className="content__playlist playlist">
                    <Track
                        Name="Крит"
                        Author="OG Buda"
                        Album="POX VAWË"
                        Time="2:47"
                        Info="(feat. Toxi$)"
                    />
                    <Track
                        Name="Guilt"
                        Author="Nero"
                        Album="Welcome Reality"
                        Time="4:44"
                        Info=""
                    />
                    <Track
                        Name="Elektro"
                        Author="Dynoro, Outwork, Mr. Gee"
                        Album="Elektro"
                        Time="2:22"
                        Info=""
                    />
                    <Track
                        Name="I’m Fire"
                        Author="Ali Bakgor"
                        Album="I’m Fire"
                        Time="2:22"
                        Info=""
                    />
                    <Track
                        Name="Non Stop"
                        Author="Стоункат, Psychopath"
                        Album="Non Stop"
                        Time="4:12"
                        Info="(Remix)"
                    />
                    <Track
                        Name="Run Run"
                        Author="Jaded, Will Clarke, AR/CO"
                        Album="Run Run"
                        Time="2:54"
                        Info="(feat. AR/CO)"
                    />
                    <Track
                        Name="Eyes on Fire"
                        Author="Blue Foundation, Zeds Dead"
                        Album="Eyes on Fire"
                        Time="5:20"
                        Info="(Zeds Dead Remix)"
                    />
                    <Track
                        Name="Mucho Bien"
                        Author="HYBIT, Mr. Black, Offer Nissim, Hi Profile"
                        Album="Mucho Bien"
                        Time="3:41"
                        Info="(Hi Profile Remix)"
                    />
                    <Track
                        Name="Knives n Cherries"
                        Author="minthaze"
                        Album="Captivating"
                        Time="1:48"
                        Info=""
                    />
                    <Track
                        Name="Knives n Cherries"
                        Author="minthaze"
                        Album="Captivating"
                        Time="1:48"
                        Info=""
                    />
                    <Track
                        Name="Knives n Cherries"
                        Author="minthaze"
                        Album="Captivating"
                        Time="1:48"
                        Info=""
                    />
                    <Track
                        Name="Knives n Cherries"
                        Author="minthaze"
                        Album="Captivating"
                        Time="1:48"
                        Info=""
                    />
                    <Track
                        Name="Knives n Cherries"
                        Author="minthaze"
                        Album="Captivating"
                        Time="1:48"
                        Info=""
                    />
                    <Track
                        Name="Knives n Cherries"
                        Author="minthaze"
                        Album="Captivating"
                        Time="1:48"
                        Info=""
                    />
                    <Track
                        Name="Knives n Cherries"
                        Author="minthaze"
                        Album="Captivating"
                        Time="1:48"
                        Info=""
                    />
                    <Track
                        Name="Knives n Cherries"
                        Author="minthaze"
                        Album="Captivating"
                        Time="1:48"
                        Info=""
                    />
                    <Track
                        Name="Knives n Cherries"
                        Author="minthaze"
                        Album="Captivating"
                        Time="1:48"
                        Info=""
                    />

                </div>
            </div>
        </div>
    );
}

export default Center;