import React from 'react'

const SearchBar = ({ searchTerm, setSearchTerm, handleSearchOnClick }) => {

    return (
        <div>
            <div className='flex gap-1 bg-base-100 rounded-3xl'>
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-outline bg-base-100 p-2 lg-min:min-w-[500px] xs:max-w-[180px] text-center rounded-xl transition-all duration-200" placeholder="Find your way"
                />
                <button
                    onClick={handleSearchOnClick}
                    className="bg-base-200 p-2 rounded-r-xl tracking-widest btn rounded-l-none search-outline">Search</button>
            </div>
        </div>
    )
}

export default SearchBar