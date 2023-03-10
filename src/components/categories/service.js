function handleCategoryClick(event, endpoint, setEndpoint) {
  if (endpoint.includes(`filter.php?c=${event.target.value}`)) {
    setEndpoint("");
    event.target.checked = false;
  } else {
    setEndpoint(`filter.php?c=${event.target.value}`);
  }
}

export { handleCategoryClick };
