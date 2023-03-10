import React, { useContext, useEffect, useState } from "react";
import { ReciperContext } from "../../context";
import { DebounceInput } from "react-debounce-input";
import { handleChange, setEndpointBySearchFilter } from "./service";

function SearchBar() {
  const { setEndpoint } = useContext(ReciperContext);
  const [filter, setFilter] = useState({
    type: "name",
    endpoint: "search.php?s=",
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    setEndpointBySearchFilter(filter, search, setEndpoint);
  }, [search, filter]);

  return (
    <section className="box90 boxAround boxWhite flex-column spaceLarge">
      <section className="box90 boxAround flex-row">
        <section className="box-input">
          <input
            data-testid="name-search-radio"
            defaultChecked={filter.type === "name"}
            id="name"
            name="search-type"
            onClick={(e) => handleChange(e, setFilter, "name")}
            type="radio"
            value="search.php?s="
          />
          <label htmlFor="name">Name</label>
        </section>
        <section className="box-input">
          <input
            data-testid="ingredient-search-radio"
            id="ingredient"
            name="search-type"
            onClick={(e) => handleChange(e, setFilter, "ingredient")}
            type="radio"
            value="filter.php?i="
          />
          <label htmlFor="ingredient">Ingredient</label>
        </section>
        <section className="box-input">
          <input
            data-testid="first-letter-search-radio"
            id="first-letter"
            name="search-type"
            onClick={(e) => handleChange(e, setFilter, "first-letter")}
            type="radio"
            value="search.php?f="
          />
          <label htmlFor="first-letter">First Letter</label>
        </section>
      </section>
      <DebounceInput
        className="box80 search-input"
        data-testid="search-input"
        debounceTimeout={600}
        minLength={1}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`Search by ${filter.type}`}
      />
    </section>
  );
}

export default SearchBar;
