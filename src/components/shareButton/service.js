export default function handleClick(pathname) {
  const el = document.createElement("textarea");
  el.value = `https://bolivar-recipes.herokuapp.com${pathname}`;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  alert("Copied the Recipe Url");
  document.body.removeChild(el);
}
