import { localUrl, AjaxOption } from '../../server_config.js';

class CertObserver {
  codes: HTMLCollectionOf<Element>;
  codeIndex: number;
  url: string;
  isValid: boolean;

  constructor() {
    this.codes = document.getElementsByClassName('code');
    this.codeIndex = 0;
    this.url = localUrl + '/register/cert';
    this.isValid = false;
    document.getElementById('send_cert')?.addEventListener('click', this.checkCert.bind(this));
    window.addEventListener('keydown', this.inputCode.bind(this));
  }

  setValid() {
    alert('인증에 성공했습니다.');
    this.isValid = true;
  }

  setInValid() {
    alert('인증에 실패했습니다. 올바른 인증코드를 입력해주세요.');
    this.isValid = false;
  }

  inputCode(e: any) {
    if (this.codes == null) return false;
    const keyCode = e.keyCode;
    const isValidKey =
      (keyCode >= 48 && keyCode <= 57) || // Numbers
      (keyCode >= 65 && keyCode <= 90); // Alphabet
    let code: HTMLSpanElement = <HTMLSpanElement>this.codes[this.codeIndex];
    if (isValidKey) {
      code.innerText = String.fromCharCode(keyCode);
      if (this.codeIndex < 5) this.codeIndex += 1;
    } else if (keyCode === 8) {
      code.innerText = '?'; // BackSpace
      if (this.codeIndex > 0) this.codeIndex -= 1;
    }
  }

  codesToStr() {
    if (this.codeIndex != 5) return '';
    let codesStr: string = '';
    for (let code of this.codes) {
      codesStr += (<HTMLSpanElement>code).innerText;
    }
    return codesStr;
  }

  checkCert() {
    const data = this.codesToStr();
    if (data === '') return;
    const option: AjaxOption = {
      method: 'POST',
      body: JSON.stringify({ data }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: '',
      },
    };

    fetch(this.url, option)
      .then(response => response.json())
      .then(response => {
        response ? this.setValid() : this.setInValid();
      });
  }
}

let certObserver = new CertObserver();
