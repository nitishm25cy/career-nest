import { useEffect, useRef } from "react";

function SearchBar({ keyword, setKeyword }) {

  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  return (
    <div className="search-bar">

      <span className="search-icon">⌕</span>

      <input
        ref={searchRef}
        type="text"
        placeholder="Search job title, company or keyword..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

    </div>
  );
}

export default SearchBar;