//fetch
const url_id = "http://192.168.0.19/forms/register/id_check";

document
  .getElementById("user_id_check")
  .addEventListener("click", checkDuplicateId);

function checkDuplicateId() {
  id = document.getElementsByName("user_id")[0].value;
  const option_id = {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  };
  fetch(url_id, option_id).then((response) => alert(response));
}
