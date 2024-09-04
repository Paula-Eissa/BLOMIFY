import React, { useState } from 'react'

export default function Filter({data,filteration}) {
  const [searchValue,setSearchValue] = useState('');
  // const [fData,setFData] = useState([]);

  const handleFilterarton = (e) => {
    const value = e.target.value;
    if(value === ""){
      setSearchValue(value);
      // setFData([])
      filteration(data)
    }else{
      setSearchValue(value);
      const filteredData = data.filter((item) => 
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      // setFData(filteredData)
      filteration(filteredData); 
    }
  };
  return <>
    <div>
zz
    </div>
  </>
}



