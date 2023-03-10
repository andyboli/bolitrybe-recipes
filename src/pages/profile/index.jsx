import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Footer from "../../components/footer";

function Profile() {
  const history = useHistory();
  const { email } = JSON.parse(localStorage.getItem("user"));

  return (
    <section className="box90 boxAround boxBlack flex-column spaceLarge">
      <hearder className="box80 boxBlack boxAround flex-column">
        <h1 className="boxYellow" data-testid="profile-email">
          {email}
        </h1>
      </hearder>
      <section className="box60 boxAround flex-column spaceThin">
        <Button
          className="box60 boxYellow spaceThin"
          data-testid="profile-done-btn"
          onClick={() => {
            history.push("/done");
          }}
          variant="outline-danger"
        >
          Done Recipes
        </Button>
        <Button
          className="box60 boxYellow spaceThin"
          data-testid="profile-favorite-btn"
          onClick={() => {
            history.push("/favorites");
          }}
          variant="outline-danger"
        >
          Favorite Recipes
        </Button>
        <Button
          className="box60 boxYellow spaceThin"
          data-testid="profile-logout-btn"
          onClick={() => {
            localStorage.clear();
            history.push("/");
          }}
          variant="outline-danger"
        >
          Exit
        </Button>
      </section>
      <Footer />
    </section>
  );
}

export default Profile;
