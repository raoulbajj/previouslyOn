import React from 'react';
import { useLongPress } from 'use-long-press';
import { useNavigate } from 'react-router-dom';

const PopularCards = ({ serie, handleAddToFavoritesOnClick, handleAddToCountOnClick, ToggleModale, Modale }) => {

    const navigate = useNavigate();

    const bindLongPress = useLongPress(() => {
        navigate(`/serie/${serie.id}`);
    });

    if (!serie || !serie.images) {
        return null;
    }

    const updateLocalStorage = () => {
        localStorage.removeItem('serie');
        localStorage.setItem('serie', JSON.stringify(serie));
    }

    const updateLocalStorageModale = () => {
        updateLocalStorage();
        ToggleModale();
    }

    return (
        <div>
            {
                serie &&
                <div key={serie.id} className="card card-compact w-96 bg-base-100 shadow-2xl m-2 xs:w-auto xs:min-w-[270px] border border-base-200 hover-cards transition-all duration-200 hover:bg-base-300 hover:border-base-300">
                    <figure className='figure'>
                        <img src={serie.images.poster} alt={serie.title} className='object-fit popular-img' />
                    </figure>
                    <div className="card-body h-[450px]">
                        <h2 className="card-title tracking-widest font-extrabold text-primary">{serie.title}</h2>
                        <p className="netflix flex items-center gap-2">
                            Number of seasons :
                            <span className='netflix'>
                                {serie.seasons}
                            </span>
                        </p>
                        <p className="netflix">Number of episodes: {serie.episodes}</p>
                        <p className="netflix">Episode length: {serie.length} minutes</p>
                        <p className="netflix">Rating: {serie.notes.mean.toFixed(2)}</p>
                        <p className="netflix">Genres: {Object.values(serie.genres).join(', ')}</p>

                        <button
                            className="w-full btn btn-primary btn-modal tracking-widest"
                            value={serie}
                            onClick={updateLocalStorageModale}
                            {...bindLongPress()}
                        >
                            SEE MORE
                        </button>

                        <button className="btn-outline btn btn-primary"
                            onClick={() => handleAddToCountOnClick(serie.id)}>
                            Add to WatchList +
                        </button>
                        <button className="btn-outline btn btn-accent"
                            onClick={() => handleAddToFavoritesOnClick(serie.id)}>
                            Add to favs +
                        </button>
                    </div>
                </div>
            }
        </div >
    )
}

export default PopularCards;
