const SearchFilter = ({ filterText, handleFilteredNames }) => {
  return (
    <form>
      <div>
        filter with <input 
          value={filterText}
          onChange={handleFilteredNames}
        />
      </div>
    </form>
  )
}

export default SearchFilter