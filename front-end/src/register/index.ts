import { localUrl, AjaxOption } from '../server_config.js';

class IdObserver {
  inputEl: HTMLInputElement;
  msgEl: HTMLElement | null;
  url: string;

  constructor() {
    this.inputEl = <HTMLInputElement>document.getElementById('id');
    this.msgEl = document.getElementById('idMsg');
    this.url = localUrl + '/register/id_check';
    document.getElementById('id')?.addEventListener('change', this.checkValid.bind(this));
  }

  setMsg(msg: string): void {
    if (this.msgEl == null) return;
    this.msgEl.innerText = msg;
    this.msgEl.style.display = 'block';
  }

  checkEmpty(): boolean {
    if (this.inputEl?.value != '') return false;
    this.setMsg('필수 정보입니다.');
    return true;
  }

  checkRegExp(): boolean {
    const regExp: RegExp = /^[a-z|0-9|_-]{5,20}$/;
    const isMatch = regExp.test(this.inputEl.value);
    if (isMatch) return true;
    this.setMsg('5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.');

    return false;
  }

  async checkDuplicate(): Promise<boolean> {
    const data: string = this.inputEl.value;
    const option: AjaxOption = {
      method: 'POST',
      body: JSON.stringify({ data }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: '',
      },
    };
    try {
      const response = await fetch(this.url, option);
      const isDuplicate = await response.json();
      if (typeof isDuplicate !== 'boolean') throw new Error();
      isDuplicate ? this.setMsg('이미 사용중이거나 탈퇴한 아이디입니다.') : this.setMsg('사용 가능한 아이디입니다.');
      return !isDuplicate;
    } catch (e) {
      this.setMsg('오류가 발생했습니다.');
      return false;
    }
  }

  async checkValid(): Promise<boolean> {
    if (this.checkEmpty()) return false;
    if (!this.checkRegExp()) return false;
    return await this.checkDuplicate();
  }
}

class PwObserver {
  inputEl: HTMLInputElement;
  msgEl: HTMLElement | null;

  constructor() {
    this.inputEl = <HTMLInputElement>document.getElementById('pw');
    this.msgEl = document.getElementById('pwMsg');

    document.getElementById('pw')?.addEventListener('change', this.checkValid.bind(this));
  }

  setMsg(msg: string): void {
    if (this.msgEl == null) return;
    this.msgEl.innerText = msg;
    this.msgEl.style.display = 'block';
  }

  checkEmpty(): boolean {
    if (this.inputEl?.value != '') return false;
    this.setMsg('필수 정보입니다.');
    return true;
  }

  checkRegExp(): boolean {
    const pw: string = this.inputEl.value;
    const regExp: RegExp = /^[a-z|A-Z|0-9|{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]{8,16}$/;
    const isMatch = regExp.test(pw);

    isMatch
      ? this.setMsg('사용 가능한 비밀번호입니다.')
      : this.setMsg('8~16자 영문 대소문자, 숫자, 특수문자를 사용하세요.');
    return isMatch;
  }

  checkValid(): boolean {
    if (this.checkEmpty()) return false;
    return this.checkRegExp();
  }
}

class PwReObserver {
  targetEl: HTMLInputElement; //pw input
  inputEl: HTMLInputElement; //pwRe input
  msgEl: HTMLElement | null;

  constructor() {
    this.targetEl = <HTMLInputElement>document.getElementById('pw');
    this.inputEl = <HTMLInputElement>document.getElementById('pwRe');
    this.msgEl = document.getElementById('pwReMsg');

    document.getElementById('pwRe')?.addEventListener('change', this.checkValid.bind(this));
  }

  setMsg(msg: string): void {
    if (this.msgEl == null) return;
    this.msgEl.innerText = msg;
    this.msgEl.style.display = 'block';
  }

  checkEmpty(): boolean {
    if (this.inputEl?.value != '') return false;
    this.setMsg('필수 정보입니다.');
    return true;
  }

  checkMatch(): boolean {
    const pw: string = this.targetEl.value;
    const pwRe: string = this.inputEl.value;
    const isMatch = pw === pwRe;

    isMatch ? this.setMsg('비밀번호가 일치합니다.') : this.setMsg('비밀번호가 일치하지 않습니다.');
    return isMatch;
  }

  checkValid(): boolean {
    if (this.checkEmpty()) return false;
    return this.checkMatch();
  }
}

class NickObserver {
  inputEl: HTMLInputElement; //pwRe input
  msgEl: HTMLElement | null;
  url: string;

  constructor() {
    this.inputEl = <HTMLInputElement>document.getElementById('nick');
    this.msgEl = document.getElementById('nickMsg');
    this.url = localUrl + '/register/nick_check';
    document.getElementById('nick')?.addEventListener('change', this.checkValid.bind(this));
  }

  setMsg(msg: string): void {
    if (this.msgEl == null) return;
    this.msgEl.innerText = msg;
    this.msgEl.style.display = 'block';
  }

  checkEmpty(): boolean {
    if (this.inputEl?.value != '') return false;
    this.setMsg('필수 정보입니다.');
    return true;
  }

  checkRegExp(): boolean {
    const nick: string = this.inputEl.value;
    const regExp: RegExp = /^[a-z|A-Z|0-9|_\-|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{5,20}$/;
    const isMatch = regExp.test(nick);

    if (isMatch) return false;
    this.setMsg('5~20자의 영문 대소문자, 숫자, 한글과 특수기호(_),(-)만 사용 가능합니다.');
    return true;
  }

  async checkDuplicate(): Promise<boolean> {
    const data: string = this.inputEl.value;
    const option: AjaxOption = {
      method: 'POST',
      body: JSON.stringify({ data }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: '',
      },
    };

    try {
      const response = await fetch(this.url, option);
      const isDuplicate = await response.json();
      if (typeof isDuplicate !== 'boolean') throw new Error();
      isDuplicate ? this.setMsg('이미 사용중인 닉네임입니다.') : this.setMsg('사용 가능한 닉네임입니다.');
      return !isDuplicate;
    } catch (e) {
      this.setMsg('오류가 발생했습니다.');
      return false;
    }
  }

  async checkValid(): Promise<boolean> {
    if (this.checkEmpty()) return false;
    if (this.checkRegExp()) return false;
    return this.checkDuplicate();
  }
}

class EmailObserver {
  inputEl: HTMLInputElement; //pwRe input
  msgEl: HTMLElement | null;
  url: string;

  constructor() {
    this.inputEl = <HTMLInputElement>document.getElementById('email');
    this.msgEl = document.getElementById('emailMsg');
    this.url = localUrl + '/register/email_check';
    document.getElementById('email')?.addEventListener('change', this.checkValid.bind(this));
  }

  setMsg(msg: string): void {
    if (this.msgEl == null) return;
    this.msgEl.innerText = msg;
    this.msgEl.style.display = 'block';
  }

  checkEmpty(): boolean {
    if (this.inputEl?.value != '') return false;
    this.setMsg('필수 정보입니다.');
    return true;
  }

  checkRegExp(): boolean {
    const email: string = this.inputEl.value;
    const regExp: RegExp = /^[0-9|a-z|A-Z]([-_.]?[0-9|a-z|A-Z])*@[0-9|a-z|A-Z]([-_.]?[0-9|a-z|A-Z])*\.[a-z|A-Z]*$/i;
    const isMatch = regExp.test(email);
    if (isMatch) return false;
    this.setMsg('올바른 이메일을 입력해주세요.');
    return true;
  }

  async checkDuplicate(): Promise<boolean> {
    const data: string = this.inputEl.value;
    const option: AjaxOption = {
      method: 'POST',
      body: JSON.stringify({ data }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: '',
      },
    };

    try {
      const response = await fetch(this.url, option);
      const isDuplicate = await response.json();
      if (typeof isDuplicate !== 'boolean') throw new Error();
      isDuplicate ? this.setMsg('이미 사용중이거나 탈퇴한 이메일입니다.') : this.setMsg('사용 가능한 이메일입니다.');
      return !isDuplicate;
    } catch (e) {
      this.setMsg('오류가 발생했습니다.');
      return false;
    }
  }

  async checkValid(): Promise<boolean> {
    if (this.checkEmpty()) return false;
    if (this.checkRegExp()) return false;
    return this.checkDuplicate();
  }
}

class TimerObserver {
  time: number;
  id: NodeJS.Timer | undefined;
  el: HTMLElement | null;
  constructor() {
    this.time = 180;
    this.id = undefined;
    this.el = document.getElementById('certTimer');
  }

  refresh() {
    const minute: number = this.time / 60;
    const second: number = this.time % 60;

    if (this.el == null) return;
    this.el.innerText = minute + ':' + second;
    this.el.style.display = 'block';
    this.time -= 1;
    if (this.time === 0) {
      alert('인증 시간이 만료되었습니다. 재발급 받으세요');
      clearInterval(this.id);
    }
  }

  start() {
    this.time = 180;
    this.id = setInterval(this.refresh, 1000);
  }
}

class ReqCertObserver {
  url: string;
  emailObserver: EmailObserver;
  timerObserver: TimerObserver;

  constructor(emailObserver: EmailObserver, timerObserver: TimerObserver) {
    this.url = localUrl + '/register/request_cert';
    this.emailObserver = emailObserver;
    this.timerObserver = timerObserver;
  }
}

class FormObserver {
  url: string;
  idObserver: IdObserver;
  pwObserver: PwObserver;
  pwReObserver: PwReObserver;
  nickObserver: NickObserver;
  emailObserver: EmailObserver;

  constructor() {
    this.url = localUrl + '/register/';
    this.idObserver = new IdObserver();
    this.pwObserver = new PwObserver();
    this.pwReObserver = new PwReObserver();
    this.nickObserver = new NickObserver();
    this.emailObserver = new EmailObserver();
    document.getElementById('submit')?.addEventListener('click', this.submitData.bind(this));
  }

  async checkValid(): Promise<boolean> {
    let isValid = await this.idObserver.checkValid();
    isValid = this.pwObserver.checkValid() && isValid;
    isValid = this.pwReObserver.checkValid() && isValid;
    isValid = (await this.nickObserver.checkValid()) && isValid;
    isValid = (await this.emailObserver.checkValid()) && isValid;
    return isValid;
  }

  async submitData() {
    if (!(await this.checkValid())) return false;
    const formData = new FormData(<HTMLFormElement>document.getElementById('register'));
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
      const isValid = await response.json();
      if (typeof isValid !== 'boolean') throw new Error();
      isValid ? (location.href = '/register/cert') : alert('잘못된 요청입니다.');
    } catch (e) {
      alert('오류가 발생했습니다.');
    }
  }
}

var formObserver = new FormObserver();
