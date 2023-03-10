import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ReciperContext = createContext();

const ReciperProvider = ({ children }) => {
  const [areas, setAreas] = useState({ meals: null });
  const [categories, setCategories] = useState({ meals: null, drinks: null });
  const [endpoint, setEndpoint] = useState("");
  const [ingredients, setIngredients] = useState({ meals: null, drinks: null });
  const [recipes, setRecipes] = useState({ meals: null, drinks: null });

  const context = {
    areas,
    categories,
    endpoint,
    ingredients,
    recipes,
    setAreas,
    setCategories,
    setEndpoint,
    setIngredients,
    setRecipes
  };

  return (
    <ReciperContext.Provider value={context}>
      {children}
    </ReciperContext.Provider>
  );
}

export { ReciperContext, ReciperProvider as Provider };

ReciperProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
