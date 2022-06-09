//fetch
const url_id = server_url + "/register/id_check";
idMsg = document.getElementById("idMsg");
document
  .getElementById("user_id")
  .addEventListener("change", checkIdValid);

function checkIdValid() {
  if(isInValidLenId())
    return
  checkDuplicateId()
}

function isInValidLenId() {
  id = document.getElementById("user_id").value;
  if(id.length > 20 || id.length < 5) {
    idMsg.innerText = "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다."
    return true;
  }

  idMsg.innerText = ""
  return false;
}

function checkDuplicateId() {
  id = document.getElementById("user_id").value;
  const option_id = {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  };

  fetch(url_id, option_id).then((response) => response.json() )
  .then(isInValid => isInValid ? idMsg.innerText = "이미 사용중이거나 탈퇴한 아이디입니다." 
  : idMsg.innerText = "사용 가능한 아이디입니다.");
  
}
