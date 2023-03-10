function handleClick(event, recipeId, page, isUpdate, setUpdate) {
  const status = JSON.parse(localStorage.getItem("recipe-status"));
  const recipes = status[page].find(({ id }) => id === recipeId);

  recipes.progress.map((each) => {
    if (each.ingredient === event.target.value) {
      each.status = event.target.checked;
    }
    return each;
  });

  localStorage.setItem(
    "recipe-status",
    JSON.stringify({
      ...status,
      [page]: [...status[page].filter(({ id }) => id !== recipeId), recipes],
    })
  );

  setUpdate(!isUpdate);
}

function isChecked(recipeId, recipeIngredient, page) {
  const status = JSON.parse(localStorage.getItem("recipe-status"));

  const recipes = status[page].find(({ id }) => id === recipeId);

  return recipes.progress.find(
    ({ ingredient }) => ingredient === recipeIngredient
  ).status;
}

const serviceProcess = {
  isChecked, handleClick
}

export default serviceProcess;
