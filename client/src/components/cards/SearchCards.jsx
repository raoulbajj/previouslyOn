import React from 'react'
import { BiPlusCircle } from 'react-icons/bi'
import { AiFillHeart } from 'react-icons/ai'


const SearchCards = ({ serie, handleAddToFavoritesOnClick, handleAddToCountOnClick }) => {

    console.log('serie : ', serie);

    return (
        <div>
            {
                serie &&

                <div key={serie.id} className="card card-compact w-96 bg-base-100 shadow-2xl m-2 xs:w-auto xs:min-w-[270px] border border-base-200 hover-cards transition-all duration-200 hover:bg-base-300 hover:border-base-300">
                    <figure className='figure'>
                        <img src={serie.poster} alt={serie.title} className='object-fit popular-img' />
                    </figure>
                    <div className="card-body h-[310px] gap-3">
                        <h2 className="card-title tracking-widest font-extrabold text-primary netflix">{serie.title}</h2>
                        <p>Release date : {serie.release_date}</p>






                        <a className='w-full'>
                            <button className="w-full btn btn-primary tracking-widest">
                                SEE MORE
                            </button>
                        </a>
                        <button className="btn-outline btn btn-primary"
                            onClick={() => handleAddToCountOnClick(serie.id)}>
                            Add to WatchList
                            {/* <BiPlusCircle className='text-2xl text-primary' /> */}
                        </button>
                        <button className="btn-outline btn btn-accent"
                            onClick={() => handleAddToFavoritesOnClick(serie.id)}>
                            Add to favs
                            {/* <AiFillHeart className='text-2xl text-accent' /> */}
                        </button>

                    </div>
                </div>
            }
        </div >
    )
}

export default SearchCards
