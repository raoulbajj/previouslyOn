import { useState, useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../Searchbar/SearchBar';
import PopularCards from '../cards/PopularCards';
import SearchCards from '../cards/SearchCards';
import ModalRa from '../ModaleRa/ModaleRa';

function Profile() {
  const apiKey = import.meta.env.VITE_REACT_APP_APIKEY;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayData, setDisplayData] = useState(null);
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  const [Modale, setModale] = useState(false);

  const ToggleModale = () => {
    setModale(!Modale);
  }

  useEffect(() => {
    console.log('toggle modale : ', Modale);
  }, [Modale]);

  // ajouter une série au compte
  const addToAccount = async (serieId) => {

    console.log('adding to account...');

    try {
      const response = await fetch(`https://api.betaseries.com/shows/show?id=${serieId}&token=${accessToken.access_token}`, {
        method: 'POST',
        headers: {
          'X-BetaSeries-Key': apiKey,
          'Content-Type': 'application/json',
        },
      });
      console.log('response : ', response);
      const json = await response.json();
      console.log('json : ', json);
    }
    catch (error) {
      console.error('Add to account request error : ', error);
    }
  };



  // ajouter une série à ses favorist + compte
  const addToFavorites = async (serieId) => {

    await addToAccount(serieId);

    console.log('adding to favorites...');

    try {
      const response = await fetch(`https://api.betaseries.com/shows/favorite?id=${serieId}&token=${accessToken.access_token}`, {
        method: 'POST',
        headers: {
          'X-BetaSeries-Key': apiKey,
          'Content-Type': 'application/json',
        },
      });
      console.log('response : ', response);
      const json = await response.json();
      console.log('json : ', json);
    } catch (error) {
      console.error('Add to favorites request error : ', error);
    }
  };

  // la fonction qui appelle addToFavorites
  const handleAddToFavoritesOnClick = (serieId) => {
    addToAccount(serieId);
    addToFavorites(serieId);
  };

  const handleAddToCountOnClick = (serieId) => {
    addToAccount(serieId);
  };

  // faire une recherche
  const fetchSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.betaseries.com/search/shows?client_id=${apiKey}&text=${searchTerm}`, {
        method: 'GET',
        headers: {
          'X-BetaSeries-Key': apiKey,
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      setDisplayData(json.shows);
      setSearchClicked(true);
    } catch (error) {
      console.error('Search request error : ', error);
    } finally {
      setIsLoading(false);
    }
  };

  // la fonction qui appelle fetchSearch
  const handleSearchOnClick = (event) => {
    fetchSearch();
    setSearchClicked(true);

  };


  // récupérer les données des séries
  const getSeriesData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.betaseries.com/shows/discover?client_id=${apiKey}&type=popular&limit=199`, {
        method: 'GET',
        headers: {
          'X-BetaSeries-Key': apiKey,
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      setDisplayData(json.shows);
    } catch (error) {
      console.error('API request error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect pour récupérer les données des séries
  useEffect(() => {
    if (!searchTerm) {
      getSeriesData();
    }
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalItems = displayData ? displayData.length : 0;
  const currentItems = displayData ? displayData.slice(startIndex, endIndex).filter(Boolean) : [];

  return (
    <div className='w-full flex flex-col justify-center items-center flex-grow'>
      {isLoading ? (
        <div className="loader2"></div>
      ) : (
        <>
          <div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearchOnClick={handleSearchOnClick} fetchSearch={fetchSearch} />
          </div>

          {
            searchClicked ? (
              <div className='text-4xl tracking-widest flex gap-7 m-10 flex-col flex-grow'>
                <div className='flex gap-2 items-center justify-center'>
                  <p className='xs:text-2xl'>SEARCH</p>
                  <p className='xs:text-2xl'>RESULTS</p>

                </div>
                <div className="flex flex-wrap items-center justify-center gap-5 mb-5">
                  {currentItems.length === 0 && (
                    <p className='text-sm'>No results found</p>
                  )}

                  {currentItems.map((serie) => (
                    <SearchCards serie={serie} key={serie.id} handleAddToFavoritesOnClick={handleAddToFavoritesOnClick} handleAddToCountOnClick={handleAddToCountOnClick} />
                  ))}
                </div>
              </div>


            ) : (
              <div className='text-4xl tracking-widest flex gap-7 m-10 flex-col items-center justify-center '>
                <div className='flex gap-3'>
                  <p className='xs:text-base'>MOST</p>
                  <p className='xs:text-base'>POPULAR</p>
                  <p className='xs:text-base'>&nbsp;SERIES</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-5 mb-5">
                  {currentItems.map((serie) => (
                    <PopularCards serie={serie} key={serie.id} handleAddToFavoritesOnClick={handleAddToFavoritesOnClick} handleAddToCountOnClick={handleAddToCountOnClick} modale={Modale} ToggleModale={ToggleModale} />
                  ))}
                </div>
              </div>
            )
          }

          {/* MODALE ICI */}
          {

            Modale &&

            <ModalRa ToggleModale={ToggleModale} apiKey={apiKey} Token={accessToken.access_token} />
          }

          <div className='w-full'>
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )
      }
    </div >
  );
}

export default Profile;
