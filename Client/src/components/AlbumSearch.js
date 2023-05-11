import { useDispatch } from "react-redux";

function AlbumSearch() {
  const dispatch = useDispatch();

  async function search(searchTerm) {
    if (searchTerm === undefined) {
      alert("Try Again");
      return;
    }
    try {
      const res = await fetch("/api/searchfilter", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ searchTerm: searchTerm }),
      });
      const data = await res.json();
      dispatch({ type: "SET_ALBUMS", payload: data });
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="searchBoxAlbums">
      <input
        placeholder="Search here...."
        className="searchalbum"
        type="text"
        onKeyDown={(e) => (e.which === 13 ? search(e.target.value) : null)}
      />
      <svg
        /* grabs value of previous element on click */
        onClick={(e) => search(e.target.previousElementSibling?.value)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="searchIcon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}

export default AlbumSearch;
