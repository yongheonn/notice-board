/*
  아이디, 비밀번호, 비밀번호 재입력, 닉네임, 이메일에 정규식 등의 로직 서버로 옮기기
*/


const url_id = server_url + "/register/id_check";
const url_nick = server_url + "/register/nick_check";
const url_email = server_url + "/register/email_check";
const url_request_cert = server_url + "/register/request_cert";
const url_cert = server_url + "/register/cert";

idMsg = document.getElementById("idMsg");
pwMsg = document.getElementById("pwMsg");
pwCheckMsg = document.getElementById("pwCheckMsg");
nickMsg = document.getElementById("nickMsg");
emailMsg = document.getElementById("emailMsg");

certTimer = document.getElementById("certTimer");

var time = 180;
var timer_id = false;
var isValidId = false;
var isValidPw = false;
var isValidPwCheck = false;
var isValidNick = false;
var isValidEmail = false;
var isValidCert = false;
var isValidMail = false;

document
  .getElementById("id")
  .addEventListener("change", checkIdValid);
document
  .getElementById("pw")
  .addEventListener("change", checkPwValid);
document
  .getElementById("pwCheck")
  .addEventListener("change", checkPwCheckValid);
document
  .getElementById("nick")
  .addEventListener("change", checkNickValid);
document
  .getElementById("email")
  .addEventListener("change", checkEmailValid);
document
  .getElementById("request_cert")
  .addEventListener("click", requestCert);
document
  .getElementById("send_cert")
  .addEventListener("click", checkCertValid);

function checkIdValid() {
  if(isInValidId())
    return;
  checkDuplicateId();
}

function isInValidId() {
  id = document.getElementById("id").value;
  const regExp = /^[a-z|0-9|_\-]{4,19}$/;
 
	if (regExp.test(id))
    return false;
  idMsg.innerText = "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.";
  idMsg.style.display = "block"
  
  return true;
}

function checkDuplicateId() {
  id = document.getElementById("id").value;
  const option_id = {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  };

  fetch(url_id, option_id).then((response) => response.json() )
  .then(isInValid => {isInValid ? inValidId() : validId()})
  .then(idMsg.style.display = "block");
}

function validId() {
  isValidId = true;
  idMsg.innerText = "사용 가능한 아이디입니다."
}

function inValidId() {
  isValidId = false;
  idMsg.innerText = "이미 사용중이거나 탈퇴한 아이디입니다." 
}

function checkPwValid() {
  pw = document.getElementById("pw").value;
  const regExp = /^[a-z|A-Z|0-9|\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{7,15}$/;
  
  regExp.test(pw) ? validPw() : inValidPw();
  pwMsg.style.display = "block"
}

function validPw() {
  pwMsg.innerText = "사용 가능한 비밀번호입니다.";
  isValidPw = true;
}

function inValidPw() {
  pwMsg.innerText = "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.";
  isValidPw = false;
}

function checkPwCheckValid() {
  pw = document.getElementById("pw").value;
  pwCheck = document.getElementById("pwCheck").value;

  (pw === pwCheck) ? validPwCheck() : inValidPwCheck(); 
  pwCheckMsg.style.display = "block";
}

function validPwCheck() {
  pwCheckMsg.innerText = "비밀번호가 일치합니다.";
  isValidPwCheck = true;
}

function inValidPwCheck() {
  pwCheckMsg.innerText = "비밀번호가 일치하지 않습니다.";
  isValidPwCheck = false;
}

function checkNickValid() {
  if(isInValidNick())
    return;
  checkDuplicateNick();
}

function isInValidNick() {
  nick = document.getElementById("nick").value;
  const regExp = /^[a-z|A-Z|0-9|_\-|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{4,19}$/;

  if(regExp.test(nick))
    return false;
  nickMsg.innerText = "5~20자의 영문 대소문자, 한글, 숫자와 특수기호(_),(-)만 사용 가능합니다."
  nickMsg.style.display = "block";
  return true;
}

function checkDuplicateNick() {
  nick = document.getElementById("nick").value;
  const option_nick = {
    method: "POST",
    body: JSON.stringify({ nick }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  };

  fetch(url_nick, option_nick).then((response) => response.json() )
  .then(isInValid => {isInValid ? inValidNick() : validNick()})
  .then(nickMsg.style.display = "block");
}

function validNick() {
  nickMsg.innerText = "사용 가능한 닉네임입니다.";
  validNick = true;
}

function inValidNick() {
  nickMsg.innerText = "이미 사용중인 닉네임입니다." ;
  validNick = false;
}

function checkEmailValid() {
  if(isInValidEmail())
    return;
  checkDuplicateEmail();
}

function isInValidEmail() {
  email = document.getElementById("email").value;
  const regExp = /^[0-9|a-z|A-Z]([\-_\.]?[0-9|a-z|A-Z])*@[0-9|a-z|A-Z]([\-_\.]?[0-9|a-z|A-Z])*\.[a-z|A-Z]*$/i;

  if(regExp.test(email))
    return false;
  emailMsg.innerText = "이메일 주소를 다시 확인해주세요."
  emailMsg.style.display = "block";
  return true;
}

function checkDuplicateEmail() {
  email = document.getElementById("email").value;
  const option_email = {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  };
    
  fetch(url_email, option_email).then((response) => response.json() )
  .then(isInValid => {isInValid ? isInValidEmail() : validEmail() })
  .then(emailMsg.style.display = "block")
}

function validEmail() {
  emailMsg.innerText = "사용 가능한 이메일입니다.";
  isValidEmail = true;
}

function isInValid() {
  email.innerText = "이미 사용중인 이메일입니다."
  isValidEmail = false;
}

function requestCert() {
  checkEmailValid(true);
  time = 180;
  if(!isValidMail)
    return;
  const option_request_cert = {
      method: "POST",
      body: JSON.stringify({ isValidMail }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    };
      
    fetch(url_request_cert, option_request_cert).then((response) => response.json() )
    .then((response) => {response ? timer_id = setInterval(refreshTimer, 1000) 
      : alert("인증코드 요청에 실패했습니다.")})
  
}

function refreshTimer() {
  minute = time / 60;
  second = time % 60;
  certTimer.innerText = minute + ":" + second;
  certTimer.style.display = "block"
  time -= 1;
  if(time == 0) {
    alert("인증시간이 만료되었습니다.");
    clearInterval(timer_id);
  }

}

function checkCertValid() {
  cert = document.getElementById("cert");
  const option_cert = {
    method: "POST",
    body: JSON.stringify({ cert }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  };
    
  fetch(url_cert, option_cert).then((response) => response.json() )
  .then((response) => {response ? validCert()
    : inValidCert()})
}

function validCert() {
  alert("인증에 성공하였습니다.")
  validCert = true;
}

function inValidCert() {
  alert("인증에 실패했습니다. 올바른 인증코드를 입력해주세요.")
  validCert = false;
}