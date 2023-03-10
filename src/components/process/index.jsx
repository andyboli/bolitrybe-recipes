import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import serviceProcess from "./service";

function Process({ id, ingredients, measures, page, isUpdate, setUpdate }) {
  const { isChecked, handleClick } = serviceProcess;
  return (
    <section className="box90 boxAround flex-column">
      <h2 className="boxYellow spaceLarge">Ingredients</h2>
      <section className="box80 flex-row">
        {ingredients.map((ingredient, index) => (
          <div key={`default-${ingredient}`} className="box30">
            <Form.Check
              data-testid={ingredient}
              defaultChecked={isChecked(id, ingredient, page)}
              id={`default-${ingredient}`}
              key={`ingredient - ${index}`}
              label={
                measures[index]
                  ? `${ingredient} - ${measures[index]}`
                  : `${ingredient}`
              }
              onClick={(e) => handleClick(e, id, page, isUpdate, setUpdate)}
              value={ingredient}
            />
          </div>
        ))}
      </section>
    </section>
  );
}

Process.propTypes = {
  id: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  measures: PropTypes.arrayOf(PropTypes.string),
  page: PropTypes.string.isRequired,
  isUpdate: PropTypes.bool.isRequired,
  setUpdate: PropTypes.func.isRequired,
};

export default Process;
