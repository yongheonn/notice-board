import { localUrl } from '../server_config.js';
class IdObserver {
    constructor() {
        var _a;
        this.inputEl = document.getElementById('id');
        this.msgEl = document.getElementById('idMsg');
        this.url = localUrl + '/register/id_check';
        this.isValid = false;
        (_a = document.getElementById('id')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.checkValid.bind(this));
    }
    checkRegExp() {
        const regExp = /^[a-z|0-9|_-]{4,19}$/;
        if (regExp.test(this.inputEl.value))
            return false;
        if (this.msgEl == null)
            return false;
        this.msgEl.innerText = '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.';
        this.msgEl.style.display = 'block';
        return true;
    }
    setValid() {
        this.isValid = true;
        if (this.msgEl == null)
            return;
        this.msgEl.innerText = '사용 가능한 아이디입니다.';
    }
    setInValid() {
        this.isValid = false;
        if (this.msgEl == null)
            return;
        this.msgEl.innerText = '이미 사용중이거나 탈퇴한 아이디입니다.';
    }
    checkDuplicate() {
        const data = this.inputEl.value;
        const option = {
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
            if (this.msgEl instanceof HTMLElement)
                this.msgEl.style.display = 'block';
        });
    }
    checkValid() {
        if (this.checkRegExp())
            return;
        this.checkDuplicate();
    }
}
class PwObserver {
    constructor() {
        var _a;
        this.inputEl = document.getElementById('pw');
        this.msgEl = document.getElementById('pwMsg');
        this.isValid = false;
        (_a = document.getElementById('pw')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.checkValid.bind(this));
    }
    setValid() {
        if (this.msgEl == null)
            return;
        this.msgEl.innerText = '사용 가능한 비밀번호입니다.';
        this.isValid = true;
    }
    setInValid() {
        if (this.msgEl == null)
            return;
        this.msgEl.innerText = '8~16자 영문 대소문자, 숫자, 특수문자를 사용하세요.';
        this.isValid = false;
    }
    checkValid() {
        const pw = this.inputEl.value;
        const regExp = /^[a-z|A-Z|0-9|{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]{7,15}$/;
        if (this.msgEl == null)
            return;
        regExp.test(pw) ? this.setValid() : this.setInValid();
        this.msgEl.style.display = 'block';
    }
}
class PwReObserver {
    constructor() {
        var _a;
        this.targetEl = document.getElementById('pw');
        this.inputEl = document.getElementById('pwRe');
        this.msgEl = document.getElementById('pwReMsg');
        this.isValid = false;
        (_a = document.getElementById('pwRe')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.checkValid.bind(this));
    }
    setValid() {
        if (this.msgEl == null)
            return;
        this.msgEl.innerText = '비밀번호가 일치합니다.';
        this.isValid = true;
    }
    setInValid() {
        if (this.msgEl == null)
            return;
        this.msgEl.innerText = '비밀번호가 일치하지 않습니다.';
        this.isValid = false;
    }
    checkValid() {
        const pw = this.targetEl.value;
        const pwRe = this.inputEl.value;
        if (this.msgEl == null)
            return;
        pw === pwRe ? this.setValid() : this.setInValid();
        this.msgEl.style.display = 'block';
    }
}
class NickObserver {
    constructor() {
        var _a;
        this.inputEl = document.getElementById('nick');
        this.msgEl = document.getElementById('nickMsg');
        this.url = localUrl + '/register/nick_check';
        this.isValid = false;
        (_a = document.getElementById('nick')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.checkValid.bind(this));
    }
    checkRegExp() {
        const nick = this.inputEl.value;
        const regExp = /^[a-z|A-Z|0-9|_\-|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{4,19}$/;
        if (this.msgEl == null)
            return false;
        if (regExp.test(nick))
            return false;
        this.msgEl.innerText = '5~20자의 영문 대소문자, 숫자, 한글과 특수기호(_),(-)만 사용 가능합니다.';
        this.msgEl.style.display = 'block';
        return true;
    }
    setValid() {
        if (this.msgEl == null)
            return;
        this.msgEl.innerText = '사용 가능한 닉네임입니다.';
        this.isValid = true;
    }
    setInValid() {
        if (this.msgEl == null)
            return;
        this.msgEl.innerText = '이미 사용중인 닉네임입니다.';
        this.isValid = false;
    }
    checkDuplicate() {
        const data = this.inputEl.value;
        const option = {
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
            if (this.msgEl instanceof HTMLElement)
                this.msgEl.style.display = 'block';
        });
    }
    checkValid() {
        if (this.checkRegExp())
            return;
        this.checkDuplicate();
    }
}
class EmailObserver {
    constructor() {
        var _a;
        this.inputEl = document.getElementById('email');
        this.msgEl = document.getElementById('emailMsg');
        this.url = localUrl + '/register/email_check';
        this.isValid = false;
        (_a = document.getElementById('email')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.checkValid.bind(this));
    }
    checkRegExp() {
        const email = this.inputEl.value;
        const regExp = /^[0-9|a-z|A-Z]([-_.]?[0-9|a-z|A-Z])*@[0-9|a-z|A-Z]([-_.]?[0-9|a-z|A-Z])*\.[a-z|A-Z]*$/i;
        if (this.msgEl == null)
            return false;
        if (regExp.test(email))
            return false;
        this.msgEl.innerText = '올바른 이메일을 입력해주세요.';
        this.msgEl.style.display = 'block';
        return true;
    }
    setValid() {
        if (this.msgEl == null)
            return;
        this.msgEl.innerText = '사용 가능한 이메일입니다.';
        this.isValid = true;
    }
    setInValid() {
        if (this.msgEl == null)
            return;
        this.msgEl.innerText = '이미 사용중이거나 탈퇴한 이메일입니다.';
        this.isValid = false;
    }
    checkDuplicate() {
        const data = this.inputEl.value;
        const option = {
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
            if (this.msgEl instanceof HTMLElement)
                this.msgEl.style.display = 'block';
        });
    }
    checkValid() {
        if (this.checkRegExp())
            return;
        this.checkDuplicate();
    }
}
class TimerObserver {
    constructor() {
        this.time = 180;
        this.id = undefined;
        this.el = document.getElementById('certTimer');
    }
    refresh() {
        const minute = this.time / 60;
        const second = this.time % 60;
        if (this.el == null)
            return;
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
    constructor(emailObserver, timerObserver) {
        var _a;
        this.url = localUrl + '/register/request_cert';
        (_a = document.getElementById('request_cert')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.requestCert.bind(this));
        this.emailObserver = emailObserver;
        this.timerObserver = timerObserver;
    }
    requestCert() {
        this.emailObserver.checkValid();
        if (!this.emailObserver.isValid)
            return;
        const data = this.emailObserver.isValid;
        const option = {
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
    constructor() {
        var _a;
        this.url = localUrl + '/register/request_cert';
        this.idObserver = new IdObserver();
        this.pwObserver = new PwObserver();
        this.pwReObserver = new PwReObserver();
        this.nickObserver = new NickObserver();
        this.emailObserver = new EmailObserver();
        (_a = document.getElementById('submit')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.submitData.bind(this));
    }
    checkValid() {
        return (this.idObserver.isValid &&
            this.pwObserver.isValid &&
            this.pwReObserver.isValid &&
            this.nickObserver.isValid &&
            this.emailObserver.isValid);
    }
    submitData() {
        alert(this.checkValid());
        if (!this.checkValid())
            return false;
        const formData = new FormData(document.getElementById('register'));
        let data = {};
        for (let pair of formData.entries()) {
            data[pair[0]] = pair[1];
        }
        const option = {
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
