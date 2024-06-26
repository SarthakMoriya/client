import React, { useState } from "react";
import { useSelector } from "react-redux";

const SearchBar = ({ searchRecords }) => {
  const records = useSelector((state) => state.record.records);
  const [searchString, setSearchString] = useState("");
  const [isValidSearch, setIsValidSearch] = useState(true);
  const handleSearch = (e) => {
    e.preventDefault();
    let searchStr = searchString.replace(/\s+/g, "").trim().toLowerCase();
    let searchResults = [];
    records?.forEach((rec) => {
      let studentName = rec?.studentName.toLowerCase();
      let courseName = rec?.studentCourse.toLowerCase();
      let studentId = rec?.studentId?.toLowerCase();
      if (
        studentName.includes(searchStr) ||
        courseName.includes(searchStr) ||
        studentId.includes(searchStr)
      ) {
        searchResults.push(rec);
      }
    });
    if (searchResults.length > 0) {
      searchRecords(searchResults);
      setIsValidSearch("true");
    } else {
      searchRecords([]);
      setIsValidSearch(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSearch} className="p-2">
        <label
          for="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-blue"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            value={searchString}
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 placeholder-blue"
            placeholder="Search Student name , Id..."
          />
          <button
            type="submit"
            className="text-blue absolute right-2.5 bottom-2.5 border border-primary  hover:bg-blue hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      {!isValidSearch && (
        <div className="text-center text-primary font-bold text-2xl py-4">
          NO RECORDS FOUND
        </div>
      )}
      {isValidSearch === "true" && (
        <div className="px-4 text-primary font-bold text-2xl py-4">
          {" "}
          RECORDS FOUND
        </div>
      )}
    </>
  );
};

export default SearchBar;
