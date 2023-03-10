import React from "react";
import PropTypes from "prop-types";

function DetailCard({ video }) {
  return (
    <section className="box90 boxRound flex-column spaceLarge">
      <header className="box90 spaceThin">
        <h2 className="boxYellow">Video</h2>
      </header>
      <iframe
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
        src={video}
        title="Recipe video"
        width="100%"
        height="500px"
      ></iframe>
    </section>
  );
}

DetailCard.propTypes = {
  video: PropTypes.string.isRequired,
};

export default DetailCard;
