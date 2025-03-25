import React from 'react'
import PerSearchResultCard from './PerSearchResultCard'
import SearchForm from './SearchForm'

const SearchComponent = () => {
  return (
    <div className="search-res-page rounded-md shadow-md p-6 bg-gray-50 flex justify-center md:flex-nowrap flex-wrap gap-6 text-gray-500">
        <SearchForm/>
        <PerSearchResultCard/>
    </div>
  )
}

export default SearchComponent