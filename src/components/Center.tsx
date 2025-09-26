import React, { useEffect, useRef } from "react";
import FilterBar from "./FilterBar";
import Searchbar from "./Searchbar";
import Track from "./Track";
import TrackSkeleton from "./TrackSkeleton";
import TrackData from "../pages/main/TrackData";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchRecomendations } from "../store/reducers/track/trackThunks";
import { fetchSearchQuery } from "../store/reducers/searchQuery/searchThunks";


interface CenterProps {
    loading?: boolean;
    title: string;
    tracks: TrackData[];
    searchTracks?: React.Dispatch<React.SetStateAction<string>> | undefined;
    query?: string;
    onTrackSelect?: (track: TrackData) => void
}

const Center: React.FC<CenterProps> = ({ title, searchTracks, tracks, loading, onTrackSelect, query }) => {
    const dispatch = useAppDispatch()
    const {hasMoreTracks} = useAppSelector(state => state.trackReducer)
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const tracksRef = useRef<TrackData[]>(tracks);
    
    //инфинти-скролл
    useEffect(() => {
      tracksRef.current = tracks;
    }, [tracks]);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !loading) {
            const isSearching = Boolean(query && query.trim().length > 0);
            if (isSearching) {
              dispatch(fetchSearchQuery({ offset: tracksRef.current.length, limit: 25, query: query!.trim() }))
            } else {
              dispatch(fetchRecomendations({ offset: tracksRef.current.length, limit: 25 }))
            }
          }
        },
        { threshold: 1.0 }
      );
  
      const observed = loaderRef.current;
      if (observed) observer.observe(observed);
      return () => {
        if (observed) observer.unobserve(observed);
      };
    }, [dispatch, loading, query]);

    return (
        <div className="main__centerblock centerblock">
            <Searchbar setSearch={searchTracks} />
            <h2 className="centerblock__h2">{title}</h2>
            <FilterBar />
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
                    {loading
                        ? Array.from({ length: 10 }).map((_, i) => <TrackSkeleton key={i} />)
                        :
                            tracks.map((track, idx) => (
                                <Track
                                    key={idx}
                                    {...track}
                                    onSelect={() => onTrackSelect && onTrackSelect(track)
                                    }
                                />
                            ))
                    } 
                    <div ref={loaderRef} style={{ height: 1 }}></div>
                    {hasMoreTracks && (
                        Array.from({ length: 16 }).map((_, i) => <TrackSkeleton  key={i} />)
                    )}
                </div>
            </div>
        </div>
    );
}

export default Center;