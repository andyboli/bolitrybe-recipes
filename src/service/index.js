function getPathnameChunk(pathname, index) {
  const path = pathname.split("/");
  return path[index];
}

async function getData(page, endpoint) {
  let recipes;
  if (endpoint === "") {
    recipes = await get12RandomRecipes(page);
    return recipes.map((recipe) => recipe[page][0]);
  }
  recipes = await getRecipies(page, endpoint);
  return recipes[page];
}

async function get12RandomRecipes(page) {
  const recipes = [];
  for (let index = 0; index < 12; index += 1) {
    recipes.push(await getRecipies(page, "random.php"));
  }
  return Promise.all(recipes).then((recipes) => {
    const recipesIds = recipes.map((recipe) => {
      if (page === "meals") return recipe[page][0].idMeal;
      return recipe[page][0].idDrink;
    });
    if (recipesIds.find((id, index) => recipesIds.indexOf(id) !== index)) {
      return get12RandomRecipes(page);
    }
    return recipes;
  });
}

async function getRecipies(page, endpoint) {
  let response;
  page === "meals"
    ? (response = fetch(`https://www.themealdb.com/api/json/v1/1/${endpoint}`))
    : (response = fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/${endpoint}`
      ));
  return await response.then((response) => response.json());
}

function getChunksNumberByDocumentWidth(chunksRules) {
  const documentWidth = document
    .getElementById("root")
    .getBoundingClientRect().width;
  let chunks;
  if (documentWidth >= 800) {
    chunks = chunksRules[0];
  } else if (documentWidth < 800 && documentWidth > 500) {
    chunks = chunksRules[1];
  } else {
    chunks = chunksRules[2];
  }
  return chunks;
}

function getChunks(element, chunksRules) {
  const chunks = [];
  const chunksNumber = getChunksNumberByDocumentWidth(chunksRules);
  for (let index = 0; index < element.length; index += chunksNumber) {
    const each = [];
    for (let i = 0; i < chunksNumber; i += 1) {
      each.push(element[index + i]);
    }
    chunks.push(each);
  }
  return chunks;
}

const serviceApp = {
  getChunks,
  getData,
  getPathnameChunk,
};

export default serviceApp;
