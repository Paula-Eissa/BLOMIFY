import React, { useState } from "react";

export default function Filter({ data, filteration }) {
  const [searchValue, setSearchValue] = useState("");
  // const [fData,setFData] = useState([]);

  const handleFilterarton = (e) => {
    const value = e.target.value;
    if (value === "") {
      setSearchValue(value);
      // setFData([])
      filteration(data);
    } else {
      setSearchValue(value);
      const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      // setFData(filteredData)
      filteration(filteredData);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center w-full ">
        <input
          type="text"
          className="w-full max-w-md px-4 rounded-tr-full rounded-bl-full bg-light-pink text-deep-burgundy py-2 mt-5 border border-deep-burgundy rounded-lg shadow-sm focus:ring-2 focus:ring-dusty-mauve focus:border-dusty-mauve focus:outline-none"
          onChange={handleFilterarton}
          placeholder="Search..."
          value={searchValue}
        />
      </div>
    </>
  );
}
