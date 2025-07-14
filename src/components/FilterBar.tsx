import React, { useState } from "react";

const years = Array.from({ length: 2025 - 1980 + 1 }, (_, i) => (1980 + i).toString()).reverse();
const filters = [
    { key: "artist", label: "исполнителю", options: ["Michael Jackson", "Frank Sinatra", "OG Buda", "Mayot", "Heronwater", "Lil Krytstal", "Lil Nas X", "Fandy"] },
    { key: "year", label: "году выпуска", options: years },
    { key: "genre", label: "жанру", options: ["Pop", "Rock", "Jazz", "Electronic", "EDM", "Rap", ""] },
];

const FilterBar = () => {
    const [openFilter, setOpenFilter] = useState<string | null>(null);

    const handleFilterClick = (key: string) => {
        setOpenFilter(prev => (prev === key ? null : key));
    }

    return (
        <div className="centerblock_filter">
            <span className="filter__title">Искать по:</span>
            {filters.map(filter => (
                <div className="filter__item" key={filter.key} style={{ position: "relative", display: "inline-block" }}>
                    <button
                        className={`filter__button${openFilter === filter.key ? " filter__button--active" : ""}`}
                        onClick={() => handleFilterClick(filter.key)}
                    >
                        {filter.label}
                    </button>
                    {openFilter === filter.key && (
                        <div className="filter__dropdown">
                            {filter.options.map(option => (
                                <div className="filter__dropdown-item" key={option}>
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default FilterBar;