import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constatnts";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    const timer = setTimeout(() => {
      if(searchCache[searchQuery]){
        setSuggestions(searchCache[searchQuery]);
      }else{
        getSearchSuggestions() 
      }     
    }, 200);

    return () => {
      clearTimeout(timer);
    }
    
  },[searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API+searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);

    // update cache
    dispatch(cacheResults({
      [searchQuery] : json[1]
    }));
  }

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 mx-2 cursor-pointer"
          src="https://cdn0.iconfinder.com/data/icons/rounded-basics/24/rounded__menu-512.png"
          alt="hamberger menu"
        />
        <a href="/">
        <img
          className="h-8"
          src="data:image/png;base64,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"
          alt="youtube-icon"
        />
        </a>
      </div>
      <div className="col-span-10 px-10">
        <div className="flex">
        <input
          className="w-1/2 px-5 border border-gray-400 p-2 rounded-l-full outline-none"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
        />
        <button className="border border-gray-400 p-2 rounded-r-full">
          <img
            className="w-6"
            src="data:image/png;base64,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"
            alt="search-icon"
          />
        </button>
        </div>
        {showSuggestions && (
        <div className="fixed bg-white py-2 px-2 w-[27rem] shadow-lg rounded-lg border border-gray-100">
          <ul>
            {suggestions.map(suggestion => <li key={suggestion} className="py-2 px-3 shadow-sm hover:bg-gray-100">{suggestion}</li>)}
            
          </ul>
        </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className="h-8"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt="user-icon"
        />
      </div>
    </div>
  );
};

export default Head;
