import React, { useState, useEffect } from 'react'

const ModaleRa = ({ ToggleModale, apiKey, Token }) => {

    const modaleInfoSeries = JSON.parse(localStorage.getItem('serie'));
    const [episodes, setEpisodes] = useState([])

    console.log('fetching episodes...')
    const getEpisodes = async () => {
        try {
            const response = await fetch(`https://api.betaseries.com/episodes/list?client_id=${apiKey}&token=${Token}&showId=${modaleInfoSeries.id}&limit=100`, {
                method: 'GET',
                headers: {
                    'X-BetaSeries-Key': apiKey,
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            setEpisodes(json)
        } catch (error) {
            console.error('Episodes request error : ', error);
        }
    };


    const unseenEpisodes = []
    episodes.shows && episodes.shows[0].unseen.forEach((episode) => {
        unseenEpisodes.push(episode)
    })

    const saveEpisodes = () => {
        localStorage.setItem('episodes', JSON.stringify(unseenEpisodes))
    }

    useEffect(() => {
        getEpisodes();
    }, [modaleInfoSeries.id]);


    useEffect(() => {
        saveEpisodes()
    }, [episodes])


    return (
        <div div className="modale rounded-2xl p-5">
            <div className="modale-overlay">


                <div className="modale-content p-5 bg-base-200 rounded-2xl flex flex-col flex-wrap">
                    {
                        modaleInfoSeries &&

                        <div key={modaleInfoSeries.id} className='flex flex-col gap-2 rounded-2xl'>
                            <div className='flex justify-center gap-10'>
                                {/* image */}
                                <img src={modaleInfoSeries.images.poster} alt={modaleInfoSeries.title} className='max-w-[185px] rounded-2xl' />

                                {/* infos */}
                                <div className="flex flex-col gap-2 items-center justify-center">
                                    <h2 className="card-title tracking-widest font-extrabold text-primary">{modaleInfoSeries.title}</h2>
                                    <p className="netflix flex items-center gap-2">
                                        Number of seasons :
                                        <span className='netflix'>
                                            {modaleInfoSeries.seasons}
                                        </span>
                                    </p>
                                    <p className="netflix">Number of episodes: {modaleInfoSeries.episodes}</p>
                                    <p className="netflix">Episode length: {modaleInfoSeries.length} minutes</p>
                                    <p className="netflix">Rating: {modaleInfoSeries.notes.mean.toFixed(2)}</p>
                                    <p className="netflix">Diffusion: {modaleInfoSeries.creation}</p>

                                    {/* UNSEEN EPISODES DEPUIS LE LOCALSTORAGE : */}
                                    <div className='flex flex-col items-center gap-2 justify-center'>
                                        <p className='text-primary tracking-widest'>Unseen episodes :</p>
                                        <div className='w-full max-h-[50px] overflow-y-scroll'>
                                            {
                                                unseenEpisodes && unseenEpisodes.map((episode) => {
                                                    return (
                                                        <p className='text-center hover:text-primary cursor-pointer duration-200 transition-all hover:scale-95'>{episode.code}</p>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/* close button */}
                            <div className='w-full items-center justify-center flex mt-2'>
                                <button
                                    onClick={ToggleModale}
                                    className='w-full btn btn-secondary tracking-widest close'>
                                    Close
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ModaleRa