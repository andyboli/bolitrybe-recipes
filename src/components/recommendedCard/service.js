function get6Recommendations(recipes, id) {
  const recommendations = [];
  const indexes = [];
  for (let i = 0; i < 6; i += 1) {
    const index = Math.floor(Math.random() * recipes.length);
    if (indexes.includes(index) || recipes[index].idMeal === id || recipes[index].idDrink === id) {
      i -= 1;
    } else {
      indexes.push(index);
      recommendations.push(recipes[index]);
    }
  }
  return recommendations;
}

export default get6Recommendations;
