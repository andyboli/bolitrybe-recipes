import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Footer from "../../components/footer";
import Header from "../../components/header";

function Explorer() {
  const history = useHistory();

  return (
    <section className="box60 boxAround flex-column spaceThin">
      <Header hasSearch={false} title="explorer" />
      <section className="box60 boxAround flex-column spaceLarge">
        <Button
          className="box60 boxYellow spaceLarge"
          data-testid="explore-food"
          onClick={() => {
            history.push("/explorer/meals");
          }}
          variant="outline-danger"
        >
          Meals Explorer
        </Button>
        <Button
          className="box60 boxYellow spaceLarge"
          data-testid="explore-drinks"
          onClick={() => {
            history.push("/explorer/drinks");
          }}
          variant="outline-danger"
        >
          Drinks Explorer
        </Button>
      </section>
      <Footer />
    </section>
  );
}

export default Explorer;
