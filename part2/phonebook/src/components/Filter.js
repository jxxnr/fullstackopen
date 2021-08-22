const Filter = ({ filter, setFilter } ) => {


  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  return(
    <div>
      filter shown with &nbsp;
      <input value={filter} onChange={handleFilterChange} />
    </div>
  );
}

export default Filter;