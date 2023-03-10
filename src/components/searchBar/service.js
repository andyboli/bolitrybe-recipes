function handleChange(event, setFilter, type) {
  setFilter({ type, endpoint: event.target.value });
}

function setEndpointBySearchFilter({ type, endpoint }, search, setEndpoint) {
  if (search.length >= 1) {
    if (type === "first-letter" && search.length === 1) {
      setEndpoint(`${endpoint}${search}`);
    }
    if (type !== "first-letter") {
      setEndpoint(`${endpoint}${search}`);
    }
  }
}

export { handleChange, setEndpointBySearchFilter };
