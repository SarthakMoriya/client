import React, { useState } from "react";
import { useSelector } from "react-redux";

const SearchBar = ({searchRecords}) => {
  const records = useSelector((state) => state.record.records);
  const [searchString, setSearchString] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(records);
    let searchStr = searchString.replace(/\s+/g, "").trim().toLowerCase();
    let searchResults = [];
    // console.log(searchString.replace(/\s+/g, "").trim().toLowerCase())
    records?.forEach((rec) => {
      let studentName = rec?.studentName.toLowerCase();
      let courseName = rec?.studentCourse.toLowerCase();
      console.log("StudentName: " + studentName + " CourseName: " + courseName)
      let studentId = rec?.studentId?.toLowerCase();
      if (
        studentName.includes(searchStr)  ||
        courseName.includes(searchStr)  ||
        studentId.includes(searchStr) 
      ) {
        searchResults.push(rec);
      }
    });
    console.log(searchResults);
    searchRecords(searchResults)
  };
  return (
    <form onSubmit={handleSearch}>
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
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
          class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Mockups, Logos..."
          required
        />
        <button
          type="submit"
          class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
