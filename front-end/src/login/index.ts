import { localUrl, AjaxOption } from '../server_config.js';

class IdObserver {
  inputEl: HTMLInputElement;

  constructor() {
    this.inputEl = <HTMLInputElement>document.getElementById('id');
  }

  checkValid() {
    let data = this.inputEl.value;
    if (data === '') return false;
    return true;
  }
}

class PwObserver {
  inputEl: HTMLInputElement;

  constructor() {
    this.inputEl = <HTMLInputElement>document.getElementById('pw');
  }

  checkValid() {
    let data = this.inputEl.value;
    if (data === '') return false;
    return true;
  }
}

class FormObserver {
  url: string;
  loginMsg: HTMLElement | null;
  idObserver: IdObserver;
  pwObserver: PwObserver;

  constructor() {
    this.url = localUrl + '/login/';
    this.loginMsg = document.getElementById('loginMsg');
    this.idObserver = new IdObserver();
    this.pwObserver = new PwObserver();

    document.getElementById('submit')?.addEventListener('click', this.submitData.bind(this));
  }

  setMsg(msg: string): void {
    if (this.loginMsg == null) return;
    this.loginMsg.innerText = msg;
    this.loginMsg.style.display = 'block';
  }

  checkValid() {
    const isIdValid = this.idObserver.checkValid();
    const isPwValid = this.pwObserver.checkValid();
    if (!isIdValid && !isPwValid) this.setMsg('아이디와 비밀번호를 입력해주세요.');
    else if (!isIdValid) this.setMsg('아이디를 입력해주세요.');
    else if (!isPwValid) this.setMsg('비밀번호를 입력해주세요.');
    else return true;
    return false;
  }

  async submitData() {
    if (!this.checkValid()) return;
    const formData = new FormData(<HTMLFormElement>document.getElementById('login'));
    let data: any = {};
    for (let pair of formData.entries()) {
      data[pair[0]] = pair[1];
    }

    const option: AjaxOption = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: '',
      },
    };

    try {
      const response = await fetch(this.url, option);
      if (response.status === 401)
        this.setMsg('아이디 또는 비밀번호를 잘못 입력했습니다. 입력한 내용을 다시 확인해주세요.');
      else if (response.status === 200) {
        const access_token = await response.text();
        localStorage.setItem('access_token', access_token);
      } else throw new Error();
      /*
      if (typeof status !== 'number') throw new Error();
      if (status == loginStatus.ERROR) throw new Error();
      else if (status == loginStatus.OK) location.href = '/';
      else if (status == loginStatus.FAIL)
        this.setMsg(' ');
        */
    } catch (e) {
      this.setMsg('오류가 발생했습니다.');
    }
  }
}

var formObserver = new FormObserver();
