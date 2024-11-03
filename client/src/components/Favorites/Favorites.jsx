import React, { useState, useEffect } from 'react'
import FavoritesCards from '../cards/FavoritesCards'

const Favorites = () => {

  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const client_id = import.meta.env.VITE_REACT_APP_APIKEY
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));

  const getFavorites = async () => {
    const response = await fetch(`https://api.betaseries.com/shows/favorites?token=${accessToken.access_token}&client_id=${client_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const favoritesList = await response.json();
    setFavorites(favoritesList)
    setLoading(false)
  }

  useEffect(() => {
    getFavorites()
    
  }, [favorites])


  return (
    <div className='p-5 flex flex-col items-center h-full gap-5  overflow-y-scroll'>
      {/* TITLE */}
      <p className='text-6xl mb-5 tracking-widest xs:text-4xl'>
        Favorites
      </p>

      {/* FAVORITES LIST */}
      <div className='flex items-center gap-5 flex-wrap justify-center'>
        {
          loading

            ?

            <div className="loader2"></div>


            :

            favorites.shows.map((favorite) => {
              return(
                <FavoritesCards favorite={favorite} key={favorite.id} client_id={client_id} accessToken={accessToken} />
              )
            })
        }
      </div>


    </div>
  )
}

export default Favorites
