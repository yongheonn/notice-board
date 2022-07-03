var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { localUrl } from '../server_config.js';
class IdObserver {
    constructor() {
        var _a;
        this.inputEl = document.getElementById('id');
        this.msgEl = document.getElementById('idMsg');
        this.url = localUrl + '/register/id_check';
        (_a = document.getElementById('id')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.checkValid.bind(this));
    }
    setMsg(msg) {
        if (this.msgEl == null)
            return;
        this.msgEl.innerText = msg;
        this.msgEl.style.display = 'block';
    }
    checkEmpty() {
        var _a;
        if (((_a = this.inputEl) === null || _a === void 0 ? void 0 : _a.value) != '')
            return false;
        this.setMsg('필수 정보입니다.');
        return true;
    }
    checkRegExp() {
        const regExp = /^[a-z|0-9|_-]{5,20}$/;
        const isMatch = regExp.test(this.inputEl.value);
        if (isMatch)
            return true;
        this.setMsg('5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.');
        return false;
    }
    checkDuplicate() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.inputEl.value;
            const option = {
                method: 'POST',
                body: JSON.stringify({ data }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: '',
                },
            };
            try {
                const response = yield fetch(this.url, option);
                const isDuplicate = yield response.json();
                if (typeof isDuplicate !== 'boolean')
                    throw new Error();
                isDuplicate ? this.setMsg('이미 사용중이거나 탈퇴한 아이디입니다.') : this.setMsg('사용 가능한 아이디입니다.');
                return !isDuplicate;
            }
            catch (e) {
                this.setMsg('오류가 발생했습니다.');
                return false;
            }
        });
    }
    checkValid() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checkEmpty())
                return false;
            if (!this.checkRegExp())
                return false;
            return yield this.checkDuplicate();
        });
    }
}
class PwObserver {
    constructor() {
        var _a;
        this.inputEl = document.getElementById('pw');
        this.msgEl = document.getElementById('pwMsg');
        (_a = document.getElementById('pw')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.checkValid.bind(this));
    }
    setMsg(msg) {
        if (this.msgEl == null)
            return;
        this.msgEl.innerText = msg;
        this.msgEl.style.display = 'block';
    }
    checkEmpty() {
        var _a;
        if (((_a = this.inputEl) === null || _a === void 0 ? void 0 : _a.value) != '')
            return false;
        this.setMsg('필수 정보입니다.');
        return true;
    }
    checkRegExp() {
        const pw = this.inputEl.value;
        const regExp = /^[a-z|A-Z|0-9|{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]{8,16}$/;
        const isMatch = regExp.test(pw);
        isMatch
            ? this.setMsg('사용 가능한 비밀번호입니다.')
            : this.setMsg('8~16자 영문 대소문자, 숫자, 특수문자를 사용하세요.');
        return isMatch;
    }
    checkValid() {
        if (this.checkEmpty())
            return false;
        return this.checkRegExp();
    }
}
class PwReObserver {
    constructor() {
        var _a;
        this.targetEl = document.getElementById('pw');
        this.inputEl = document.getElementById('pwRe');
        this.msgEl = document.getElementById('pwReMsg');
        (_a = document.getElementById('pwRe')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.checkValid.bind(this));
    }
    setMsg(msg) {
        if (this.msgEl == null)
            return;
        this.msgEl.innerText = msg;
        this.msgEl.style.display = 'block';
    }
    checkEmpty() {
        var _a;
        if (((_a = this.inputEl) === null || _a === void 0 ? void 0 : _a.value) != '')
            return false;
        this.setMsg('필수 정보입니다.');
        return true;
    }
    checkMatch() {
        const pw = this.targetEl.value;
        const pwRe = this.inputEl.value;
        const isMatch = pw === pwRe;
        isMatch ? this.setMsg('비밀번호가 일치합니다.') : this.setMsg('비밀번호가 일치하지 않습니다.');
        return isMatch;
    }
    checkValid() {
        if (this.checkEmpty())
            return false;
        return this.checkMatch();
    }
}
class NickObserver {
    constructor() {
        var _a;
        this.inputEl = document.getElementById('nick');
        this.msgEl = document.getElementById('nickMsg');
        this.url = localUrl + '/register/nick_check';
        (_a = document.getElementById('nick')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.checkValid.bind(this));
    }
    setMsg(msg) {
        if (this.msgEl == null)
            return;
        this.msgEl.innerText = msg;
        this.msgEl.style.display = 'block';
    }
    checkEmpty() {
        var _a;
        if (((_a = this.inputEl) === null || _a === void 0 ? void 0 : _a.value) != '')
            return false;
        this.setMsg('필수 정보입니다.');
        return true;
    }
    checkRegExp() {
        const nick = this.inputEl.value;
        const regExp = /^[a-z|A-Z|0-9|_\-|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{5,20}$/;
        const isMatch = regExp.test(nick);
        if (isMatch)
            return false;
        this.setMsg('5~20자의 영문 대소문자, 숫자, 한글과 특수기호(_),(-)만 사용 가능합니다.');
        return true;
    }
    checkDuplicate() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.inputEl.value;
            const option = {
                method: 'POST',
                body: JSON.stringify({ data }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: '',
                },
            };
            try {
                const response = yield fetch(this.url, option);
                const isDuplicate = yield response.json();
                if (typeof isDuplicate !== 'boolean')
                    throw new Error();
                isDuplicate ? this.setMsg('이미 사용중인 닉네임입니다.') : this.setMsg('사용 가능한 닉네임입니다.');
                return !isDuplicate;
            }
            catch (e) {
                this.setMsg('오류가 발생했습니다.');
                return false;
            }
        });
    }
    checkValid() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checkEmpty())
                return false;
            if (this.checkRegExp())
                return false;
            return this.checkDuplicate();
        });
    }
}
class EmailObserver {
    constructor() {
        var _a;
        this.inputEl = document.getElementById('email');
        this.msgEl = document.getElementById('emailMsg');
        this.url = localUrl + '/register/email_check';
        (_a = document.getElementById('email')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.checkValid.bind(this));
    }
    setMsg(msg) {
        if (this.msgEl == null)
            return;
        this.msgEl.innerText = msg;
        this.msgEl.style.display = 'block';
    }
    checkEmpty() {
        var _a;
        if (((_a = this.inputEl) === null || _a === void 0 ? void 0 : _a.value) != '')
            return false;
        this.setMsg('필수 정보입니다.');
        return true;
    }
    checkRegExp() {
        const email = this.inputEl.value;
        const regExp = /^[0-9|a-z|A-Z]([-_.]?[0-9|a-z|A-Z])*@[0-9|a-z|A-Z]([-_.]?[0-9|a-z|A-Z])*\.[a-z|A-Z]*$/i;
        const isMatch = regExp.test(email);
        if (isMatch)
            return false;
        this.setMsg('올바른 이메일을 입력해주세요.');
        return true;
    }
    checkDuplicate() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.inputEl.value;
            const option = {
                method: 'POST',
                body: JSON.stringify({ data }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: '',
                },
            };
            try {
                const response = yield fetch(this.url, option);
                const isDuplicate = yield response.json();
                if (typeof isDuplicate !== 'boolean')
                    throw new Error();
                isDuplicate ? this.setMsg('이미 사용중이거나 탈퇴한 이메일입니다.') : this.setMsg('사용 가능한 이메일입니다.');
                return !isDuplicate;
            }
            catch (e) {
                this.setMsg('오류가 발생했습니다.');
                return false;
            }
        });
    }
    checkValid() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checkEmpty())
                return false;
            if (this.checkRegExp())
                return false;
            return this.checkDuplicate();
        });
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
        this.url = localUrl + '/register/request_cert';
        this.emailObserver = emailObserver;
        this.timerObserver = timerObserver;
    }
}
class FormObserver {
    constructor() {
        var _a;
        this.url = localUrl + '/register/';
        this.idObserver = new IdObserver();
        this.pwObserver = new PwObserver();
        this.pwReObserver = new PwReObserver();
        this.nickObserver = new NickObserver();
        this.emailObserver = new EmailObserver();
        (_a = document.getElementById('submit')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.submitData.bind(this));
    }
    checkValid() {
        return __awaiter(this, void 0, void 0, function* () {
            let isValid = yield this.idObserver.checkValid();
            isValid = this.pwObserver.checkValid() && isValid;
            isValid = this.pwReObserver.checkValid() && isValid;
            isValid = (yield this.nickObserver.checkValid()) && isValid;
            isValid = (yield this.emailObserver.checkValid()) && isValid;
            return isValid;
        });
    }
    submitData() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.checkValid()))
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
                    Authorization: '',
                },
            };
            try {
                const response = yield fetch(this.url, option);
                const isValid = yield response.json();
                if (typeof isValid !== 'boolean')
                    throw new Error();
                isValid ? (location.href = '/register/cert') : alert('잘못된 요청입니다.');
            }
            catch (e) {
                alert('오류가 발생했습니다.');
            }
        });
    }
}
var formObserver = new FormObserver();
