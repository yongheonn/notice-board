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
        this.inputEl = document.getElementById('id');
    }
    checkValid() {
        let data = this.inputEl.value;
        if (data === '')
            return false;
        return true;
    }
}
class PwObserver {
    constructor() {
        this.inputEl = document.getElementById('pw');
    }
    checkValid() {
        let data = this.inputEl.value;
        if (data === '')
            return false;
        return true;
    }
}
class FormObserver {
    constructor() {
        var _a;
        this.url = localUrl + '/login/';
        this.loginMsg = document.getElementById('loginMsg');
        this.idObserver = new IdObserver();
        this.pwObserver = new PwObserver();
        (_a = document.getElementById('submit')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.submitData.bind(this));
    }
    setMsg(msg) {
        if (this.loginMsg == null)
            return;
        this.loginMsg.innerText = msg;
        this.loginMsg.style.display = 'block';
    }
    checkValid() {
        const isIdValid = this.idObserver.checkValid();
        const isPwValid = this.pwObserver.checkValid();
        if (!isIdValid && !isPwValid)
            this.setMsg('아이디와 비밀번호를 입력해주세요.');
        else if (!isIdValid)
            this.setMsg('아이디를 입력해주세요.');
        else if (!isPwValid)
            this.setMsg('비밀번호를 입력해주세요.');
        else
            return true;
        return false;
    }
    submitData() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.checkValid())
                return;
            const formData = new FormData(document.getElementById('login'));
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
                if (response.status === 401)
                    this.setMsg('아이디 또는 비밀번호를 잘못 입력했습니다. 입력한 내용을 다시 확인해주세요.');
                else if (response.status === 200) {
                    const access_token = yield response.text();
                    localStorage.setItem('access_token', access_token);
                }
                else
                    throw new Error();
                /*
                if (typeof status !== 'number') throw new Error();
                if (status == loginStatus.ERROR) throw new Error();
                else if (status == loginStatus.OK) location.href = '/';
                else if (status == loginStatus.FAIL)
                  this.setMsg(' ');
                  */
            }
            catch (e) {
                this.setMsg('오류가 발생했습니다.');
            }
        });
    }
}
var formObserver = new FormObserver();
