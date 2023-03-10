import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import SearchIcon from "../../images/search-icon.png";
import UserIcon from "../../images/user-icon.png";
import SearchBar from "../searchBar";

function Header({ hasSearch, title }) {
  const history = useHistory();
  const [isSearch, setSearch] = useState(false);

  return (
    <section className="box90 boxAround boxWhite flex-column spaceThin">
      <header className="box90 boxAround  flex-row">
        <Button
          className="box10"
          data-testid="profile-top-btn"
          onClick={() => history.push("/profile")}
          type="button"
          variant="outline-danger"
        >
          <img alt="user icon" src={UserIcon} width="90%" />
        </Button>
        <div className="box40 boxAround flex-column">
          <h1 className={hasSearch ? "box40" : "box50"}>{title}</h1>
        </div>
        {hasSearch && (
          <Button
            className="box10"
            data-testid="search-top-btn"
            onClick={() => setSearch(!isSearch)}
            type="button"
            variant="outline-danger"
          >
            <img alt="search icon" src={SearchIcon} width="100%" />
          </Button>
        )}
        {isSearch && <SearchBar />}
      </header>
    </section>
  );
}

Header.propTypes = {
  hasSearch: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
