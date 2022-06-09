//fetch
const url = "http://192.168.0.19/forms/write";

data = { title: "temp title", contents: "temp contents" };

const option = {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
};
elem = document.getElementById("123");
elem.innerText = "abcd";

fetch(url, option).then((response) => console.log(response));
