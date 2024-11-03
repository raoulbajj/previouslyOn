import React from 'react';
import { useLongPress } from 'use-long-press';
import { useNavigate } from 'react-router-dom';

const FavoritesCards = ({ favorite, accessToken }) => {

    const navigate = useNavigate();

    const bindLongPress = useLongPress(() => {
        navigate(`/serie/${favorite.id}`);
    });

    const updateLocalStorage = () => {
        localStorage.removeItem('serie');
        localStorage.setItem('serie', JSON.stringify(favorite));
    }

    const apiKey = import.meta.env.VITE_REACT_APP_APIKEY;

    const handleRemoveFromFavoritesOnClick = async (serieId) => {
        console.log('removing from favorites...');

        try {
            const response = await fetch(`https://api.betaseries.com/shows/show?id=${serieId}&token=${accessToken.access_token}`, {
                method: 'DELETE',
                headers: {
                    'X-BetaSeries-Key': apiKey,
                    'Content-Type': 'application/json',
                },
            });
            console.log('response : ', response);
            const json = await response.json();
            console.log('json : ', json);
        } catch (error) {
            console.error('Remove from favorites request error : ', error);
        }
    };

    return (
        <div div key={favorite.id} className="card card-compact w-96 bg-base-100 shadow-2xl m-2 xs:w-auto xs:min-w-[270px] border border-base-200 hover-cards transition-all duration-200 hover:bg-base-300 hover:border-base-300" >
            <figure className='figure'>
                <img src={favorite.images.poster} alt={favorite.title} className='object-fit popular-img' />
            </figure>
            <div className="card-body h-[400px] transition-all duration-200">
                <h2 className="card-title tracking-widest font-extrabold text-primary">{favorite.title}</h2>
                <p className="jetbrains flex items-center gap-2">
                    Number of seasons :
                    <span className='jetbrains italic'>
                        {favorite.seasons}
                    </span>
                </p>
                <p className="jetbrains">Number of episodes: {favorite.episodes}</p>
                <p className="jetbrains">Episode length: {favorite.length} minutes</p>
                <p className="jetbrains">Rating: {favorite.notes.mean.toFixed(2)}</p>
                <p className="jetbrains">Genres: {Object.values(favorite.genres).join(', ')}</p>
                <button
                    className="w-full btn btn-primary btn-modal tracking-widest"
                    value={favorite}
                    {...bindLongPress()}
                >
                    SEE MORE
                </button>
                <button className="btn-outline btn btn-secondary tracking-widest"
                    onClick={() => handleRemoveFromFavoritesOnClick(favorite.id)}
                >Remove from favs</button>
            </div>
        </div >
    )
}

export default FavoritesCards