/*
  
*/
import localUrl from '../server_url';

const urlId = localUrl + '/register/id_check';
const urlNick = localUrl + '/register/nick_check';
const urlEmial = localUrl + '/register/email_check';
const urlRequestCert = localUrl + '/register/request_cert';
const urlCert = localUrl + '/register/cert';

const idMsg = document.getElementById('idMsg');
const pwMsg = document.getElementById('pwMsg');
const pwCheckMsg = document.getElementById('pwCheckMsg');
const nickMsg = document.getElementById('nickMsg');
const emailMsg = document.getElementById('emailMsg');
const certTimer = document.getElementById('certTimer');

let time = 180;
let timerId = false;
let isValidId = false;
let isValidPw = false;
let isValidPwCheck = false;
let isValidNick = false;
let isValidEmail = false;
let isValidCert = false;
const isValidMail = false;

function isInValidId() {
  const id = document.getElementById('id').value;
  const regExp = /^[a-z|0-9|_-]{4,19}$/;

  if (regExp.test(id)) return false;
  idMsg.innerText = '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.';
  idMsg.style.display = 'block';

  return true;
}

function validId() {
  isValidId = true;
  idMsg.innerText = '사용 가능한 아이디입니다.';
}

function inValidId() {
  isValidId = false;
  idMsg.innerText = '이미 사용중이거나 탈퇴한 아이디입니다.';
}

function checkDuplicateId() {
  const id = document.getElementById('id').value;
  const optionId = {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  };

  fetch(urlId, optionId)
    .then(response => response.json())
    .then(isInValid => {
      isInValid ? inValidId() : validId();
    })
    .then((idMsg.style.display = 'block'));
}

function checkIdValid() {
  if (isInValidId()) return;
  checkDuplicateId();
}

function validPw() {
  pwMsg.innerText = '사용 가능한 비밀번호입니다.';
  isValidPw = true;
}

function inValidPw() {
  pwMsg.innerText = '8~16자 영문 대소문자, 숫자, 특수문자를 사용하세요.';
  isValidPw = false;
}

function checkPwValid() {
  const pw = document.getElementById('pw').value;
  const regExp = /^[a-z|A-Z|0-9|{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]{7,15}$/;

  regExp.test(pw) ? validPw() : inValidPw();
  pwMsg.style.display = 'block';
}

function validPwCheck() {
  pwCheckMsg.innerText = '비밀번호가 일치합니다.';
  isValidPwCheck = true;
}

function inValidPwCheck() {
  pwCheckMsg.innerText = '비밀번호가 일치하지 않습니다.';
  isValidPwCheck = false;
}

function checkPwCheckValid() {
  const pw = document.getElementById('pw').value;
  const pwCheck = document.getElementById('pwCheck').value;

  pw === pwCheck ? validPwCheck() : inValidPwCheck();
  pwCheckMsg.style.display = 'block';
}

function isInValidNick() {
  const nick = document.getElementById('nick').value;
  const regExp = /^[a-z|A-Z|0-9|_\-|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{4,19}$/;

  if (regExp.test(nick)) return false;
  nickMsg.innerText = '5~20자의 영문 대소문자, 숫자, 한글과 특수기호(_),(-)만 사용 가능합니다.';
  nickMsg.style.display = 'block';
  return true;
}

function validNick() {
  nickMsg.innerText = '사용 가능한 닉네임입니다.';
  isValidNick = true;
}

function inValidNick() {
  nickMsg.innerText = '이미 사용중인 닉네임입니다.';
  isValidNick = false;
}

function checkDuplicateNick() {
  const nick = document.getElementById('nick').value;
  const optionNick = {
    method: 'POST',
    body: JSON.stringify({ nick }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  };

  fetch(urlNick, optionNick)
    .then(response => response.json())
    .then(isInValid => {
      isInValid ? inValidNick() : validNick();
    })
    .then((nickMsg.style.display = 'block'));
}

function checkNickValid() {
  if (isInValidNick()) return;
  checkDuplicateNick();
}

function isInValidEmail() {
  const email = document.getElementById('email').value;
  const regExp = /^[0-9|a-z|A-Z]([-_.]?[0-9|a-z|A-Z])*@[0-9|a-z|A-Z]([-_.]?[0-9|a-z|A-Z])*\.[a-z|A-Z]*$/i;

  if (regExp.test(email)) return false;
  emailMsg.innerText = '올바른 이메일을 입력해주세요.';
  emailMsg.style.display = 'block';
  return true;
}

function validEmail() {
  emailMsg.innerText = '사용 가능한 이메일입니다.';
  isValidEmail = true;
}

function inValidEmail() {
  emailMsg.innerText = '이미 사용중이거나 탈퇴한 이메일입니다.';
  isValidEmail = false;
}

function checkDuplicateEmail() {
  const email = document.getElementById('email').value;
  const optionEmail = {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  };

  fetch(urlEmial, optionEmail)
    .then(response => response.json())
    .then(isInValid => {
      isInValid ? inValidEmail() : validEmail();
    })
    .then((emailMsg.style.display = 'block'));
}

function checkEmailValid() {
  if (isInValidEmail()) return;
  checkDuplicateEmail();
}

function refreshTimer() {
  const minute = time / 60;
  const second = time % 60;
  certTimer.innerText = minute + ':' + second;
  certTimer.style.display = 'block';
  time -= 1;
  if (time === 0) {
    alert('인증 시간이 만료되었습니다.');
    clearInterval(timerId);
  }
}

function requestCert() {
  checkEmailValid(true);
  time = 180;
  if (!isValidMail) return;
  const optionRequestCert = {
    method: 'POST',
    body: JSON.stringify({ isValidMail }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  };

  fetch(urlRequestCert, optionRequestCert)
    .then(response => response.json())
    .then(response => {
      response ? (timerId = setInterval(refreshTimer, 1000)) : alert('이미 사용중이거나 탈퇴한 이메일입니다.');
    });
}

function validCert() {
  alert('인증에 성공했습니다.');
  isValidCert = true;
}

function inValidCert() {
  alert('인증에 실패했습니다. 올바른 인증코드를 입력해주세요.');
  isValidCert = false;
}

function checkCertValid() {
  const cert = document.getElementById('cert');
  const optionCert = {
    method: 'POST',
    body: JSON.stringify({ cert }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  };

  fetch(urlCert, optionCert)
    .then(response => response.json())
    .then(response => {
      response ? validCert() : inValidCert();
    });
}

document.getElementById('id').addEventListener('change', checkIdValid);
document.getElementById('pw').addEventListener('change', checkPwValid);
document.getElementById('pwCheck').addEventListener('change', checkPwCheckValid);
document.getElementById('nick').addEventListener('change', checkNickValid);
document.getElementById('email').addEventListener('change', checkEmailValid);
document.getElementById('request_cert').addEventListener('click', requestCert);
document.getElementById('send_cert').addEventListener('click', checkCertValid);
