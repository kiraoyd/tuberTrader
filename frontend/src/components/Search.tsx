

//create search bar component

export const SearchBar = () => (
    <form action = "/" method = "get">
        <label htmlFor = "header-search">
            <span className="visually-hidden"> Find an Island! </span>
        </label>
        <input
            type="text"
            id="island-search"
            placeholder="Search islands"
            name="s"
            />
        <button type="submit"> Search </button>
    </form>
);

