import React, { useEffect, useState } from 'react';

function CarSearch() {
  const [search, setSearch] = useState('');

  const handleSearch = (data) => {
    setSearch(data);
  };

  return (
    <div>
      <input type="string" onChange={(e) => handleSearch(e.target.value)} />
    </div>
  );
}

export default CarSearch;
