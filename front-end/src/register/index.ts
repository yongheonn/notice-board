import { localUrl, AjaxOption } from '../server_config.js';

class IdObserver {
  inputEl: HTMLInputElement;
  msgEl: HTMLElement | null;
  url: string;
  isValid: boolean;

  constructor() {
    this.inputEl = <HTMLInputElement>document.getElementById('id');
    this.msgEl = document.getElementById('idMsg');
    this.url = localUrl + '/register/id_check';
    this.isValid = false;
    document.getElementById('id')?.addEventListener('change', this.checkValid.bind(this));
  }

  checkRegExp(): boolean {
    const regExp: RegExp = /^[a-z|0-9|_-]{4,19}$/;
    if (regExp.test(this.inputEl.value)) return false;
    if (this.msgEl == null) return false;
    this.msgEl.innerText = '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.';
    this.msgEl.style.display = 'block';

    return true;
  }

  setValid(): void {
    this.isValid = true;
    if (this.msgEl == null) return;
    this.msgEl.innerText = '사용 가능한 아이디입니다.';
  }

  setInValid(): void {
    this.isValid = false;
    if (this.msgEl == null) return;
    this.msgEl.innerText = '이미 사용중이거나 탈퇴한 아이디입니다.';
  }

  checkDuplicate(): void {
    const data: string = this.inputEl.value;
    const option: AjaxOption = {
      method: 'POST',
      body: JSON.stringify({ data }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    fetch(this.url, option)
      .then(response => response.json())
      .then(isInValid => {
        isInValid ? this.setInValid() : this.setValid();
      })
      .then(() => {
        if (this.msgEl instanceof HTMLElement) this.msgEl.style.display = 'block';
      });
  }

  checkValid() {
    if (this.checkRegExp()) return;
    this.checkDuplicate();
  }
}

class PwObserver {
  inputEl: HTMLInputElement;
  msgEl: HTMLElement | null;
  isValid: boolean;

  constructor() {
    this.inputEl = <HTMLInputElement>document.getElementById('pw');
    this.msgEl = document.getElementById('pwMsg');
    this.isValid = false;

    document.getElementById('pw')?.addEventListener('change', this.checkValid.bind(this));
  }

  setValid() {
    if (this.msgEl == null) return;
    this.msgEl.innerText = '사용 가능한 비밀번호입니다.';
    this.isValid = true;
  }

  setInValid() {
    if (this.msgEl == null) return;
    this.msgEl.innerText = '8~16자 영문 대소문자, 숫자, 특수문자를 사용하세요.';
    this.isValid = false;
  }

  checkValid() {
    const pw: string = this.inputEl.value;
    const regExp: RegExp = /^[a-z|A-Z|0-9|{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]{7,15}$/;

    if (this.msgEl == null) return;
    regExp.test(pw) ? this.setValid() : this.setInValid();
    this.msgEl.style.display = 'block';
  }
}

class PwReObserver {
  targetEl: HTMLInputElement; //pw input
  inputEl: HTMLInputElement; //pwRe input
  msgEl: HTMLElement | null;
  isValid: boolean;

  constructor() {
    this.targetEl = <HTMLInputElement>document.getElementById('pw');
    this.inputEl = <HTMLInputElement>document.getElementById('pwRe');
    this.msgEl = document.getElementById('pwReMsg');
    this.isValid = false;

    document.getElementById('pwRe')?.addEventListener('change', this.checkValid.bind(this));
  }

  setValid() {
    if (this.msgEl == null) return;
    this.msgEl.innerText = '비밀번호가 일치합니다.';
    this.isValid = true;
  }

  setInValid() {
    if (this.msgEl == null) return;
    this.msgEl.innerText = '비밀번호가 일치하지 않습니다.';
    this.isValid = false;
  }

  checkValid() {
    const pw: string = this.targetEl.value;
    const pwRe: string = this.inputEl.value;

    if (this.msgEl == null) return;
    pw === pwRe ? this.setValid() : this.setInValid();
    this.msgEl.style.display = 'block';
  }
}

class NickObserver {
  inputEl: HTMLInputElement; //pwRe input
  msgEl: HTMLElement | null;
  url: string;
  isValid: boolean;

  constructor() {
    this.inputEl = <HTMLInputElement>document.getElementById('nick');
    this.msgEl = document.getElementById('nickMsg');
    this.url = localUrl + '/register/nick_check';
    this.isValid = false;
    document.getElementById('nick')?.addEventListener('change', this.checkValid.bind(this));
  }

  checkRegExp() {
    const nick: string = this.inputEl.value;
    const regExp: RegExp = /^[a-z|A-Z|0-9|_\-|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{4,19}$/;

    if (this.msgEl == null) return false;
    if (regExp.test(nick)) return false;
    this.msgEl.innerText = '5~20자의 영문 대소문자, 숫자, 한글과 특수기호(_),(-)만 사용 가능합니다.';
    this.msgEl.style.display = 'block';
    return true;
  }

  setValid() {
    if (this.msgEl == null) return;
    this.msgEl.innerText = '사용 가능한 닉네임입니다.';
    this.isValid = true;
  }

  setInValid() {
    if (this.msgEl == null) return;
    this.msgEl.innerText = '이미 사용중인 닉네임입니다.';
    this.isValid = false;
  }

  checkDuplicate() {
    const data: string = this.inputEl.value;
    const option: AjaxOption = {
      method: 'POST',
      body: JSON.stringify({ data }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch(this.url, option)
      .then(response => response.json())
      .then(isInValid => {
        isInValid ? this.setInValid() : this.setValid();
      })
      .then(() => {
        if (this.msgEl instanceof HTMLElement) this.msgEl.style.display = 'block';
      });
  }

  checkValid() {
    if (this.checkRegExp()) return;
    this.checkDuplicate();
  }
}

class EmailObserver {
  inputEl: HTMLInputElement; //pwRe input
  msgEl: HTMLElement | null;
  url: string;
  isValid: boolean;

  constructor() {
    this.inputEl = <HTMLInputElement>document.getElementById('email');
    this.msgEl = document.getElementById('emailMsg');
    this.url = localUrl + '/register/email_check';
    this.isValid = false;
    document.getElementById('email')?.addEventListener('change', this.checkValid.bind(this));
  }

  checkRegExp() {
    const email: string = this.inputEl.value;
    const regExp: RegExp = /^[0-9|a-z|A-Z]([-_.]?[0-9|a-z|A-Z])*@[0-9|a-z|A-Z]([-_.]?[0-9|a-z|A-Z])*\.[a-z|A-Z]*$/i;

    if (this.msgEl == null) return false;
    if (regExp.test(email)) return false;
    this.msgEl.innerText = '올바른 이메일을 입력해주세요.';
    this.msgEl.style.display = 'block';
    return true;
  }

  setValid() {
    if (this.msgEl == null) return;
    this.msgEl.innerText = '사용 가능한 이메일입니다.';
    this.isValid = true;
  }

  setInValid() {
    if (this.msgEl == null) return;
    this.msgEl.innerText = '이미 사용중이거나 탈퇴한 이메일입니다.';
    this.isValid = false;
  }

  checkDuplicate() {
    const data: string = this.inputEl.value;
    const option: AjaxOption = {
      method: 'POST',
      body: JSON.stringify({ data }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch(this.url, option)
      .then(response => response.json())
      .then(isInValid => {
        isInValid ? this.setInValid() : this.setValid();
      })
      .then(() => {
        if (this.msgEl instanceof HTMLElement) this.msgEl.style.display = 'block';
      });
  }

  checkValid() {
    if (this.checkRegExp()) return;
    this.checkDuplicate();
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
    document.getElementById('request_cert')?.addEventListener('change', this.requestCert.bind(this));
    this.emailObserver = emailObserver;
    this.timerObserver = timerObserver;
  }

  requestCert() {
    this.emailObserver.checkValid();
    if (!this.emailObserver.isValid) return;
    const data: boolean = this.emailObserver.isValid;
    const option: AjaxOption = {
      method: 'POST',
      body: JSON.stringify({ data }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch(this.url, option)
      .then(response => response.json())
      .then(response => {
        response['valid'] ? this.timerObserver.start() : alert(response['emailMsg']);
      });
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
    this.url = localUrl + '/register/request_cert';
    this.idObserver = new IdObserver();
    this.pwObserver = new PwObserver();
    this.pwReObserver = new PwReObserver();
    this.nickObserver = new NickObserver();
    this.emailObserver = new EmailObserver();
    document.getElementById('submit')?.addEventListener('click', this.submitData.bind(this));
  }

  checkValid() {
    return (
      this.idObserver.isValid &&
      this.pwObserver.isValid &&
      this.pwReObserver.isValid &&
      this.nickObserver.isValid &&
      this.emailObserver.isValid
    );
  }

  submitData() {
    alert(this.checkValid());
    if (!this.checkValid()) return false;
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
      },
    };

    fetch(this.url, option)
      .then(response => response.json())
      .then(isValid => {
        isValid ? (location.href = '/register/cert/') : alert('잘못된 요청입니다.');
      });
  }
}

var formObserver = new FormObserver();
