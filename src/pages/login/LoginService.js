function setLocalStorage(email) {
  localStorage.setItem("user", JSON.stringify({ email: email.value }));
  localStorage.setItem(
    "recipe-status",
    JSON.stringify({ meals: null, drinks: null })
  );
  localStorage.setItem(
    "favorites-recipes",
    JSON.stringify({ meals: null, drinks: null })
  );
}

function handleEmail(event, setEmail) {
  setEmail({
    valid: event.target.value.match(/\S+@\S+\.\S+/),
    value: event.target.value,
  });
}

function handlePassword(event, setPassword) {
  setPassword({
    valid: event.target.value.match(
      /(?=.{6,})(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/
    ),
  });
}

function handleSubmit(event, email, history) {
  event.preventDefault();
  setLocalStorage(email);
  history.push("/recipes/meals");
}

export { handleEmail, handlePassword, handleSubmit };
