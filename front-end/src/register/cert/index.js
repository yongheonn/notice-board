import { localUrl } from '../../server_config.js';
class CertObserver {
    constructor() {
        var _a;
        this.codes = document.getElementsByClassName('code');
        this.codeIndex = 0;
        this.url = localUrl + '/register/cert';
        this.isValid = false;
        (_a = document.getElementById('send_cert')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.checkCert.bind(this));
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
    inputCode(e) {
        if (this.codes == null)
            return false;
        const keyCode = e.keyCode;
        const isValidKey = (keyCode >= 48 && keyCode <= 57) || // Numbers
            (keyCode >= 65 && keyCode <= 90); // Alphabet
        let code = this.codes[this.codeIndex];
        if (isValidKey) {
            code.innerText = String.fromCharCode(keyCode);
            if (this.codeIndex < 5)
                this.codeIndex += 1;
        }
        else if (keyCode === 8) {
            code.innerText = '?'; // BackSpace
            if (this.codeIndex > 0)
                this.codeIndex -= 1;
        }
    }
    codesToStr() {
        if (this.codeIndex != 5)
            return '';
        let codesStr = '';
        for (let code of this.codes) {
            codesStr += code.innerText;
        }
        return codesStr;
    }
    checkCert() {
        const data = this.codesToStr();
        if (data === '')
            return;
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
            response ? this.setValid() : this.setInValid();
        });
    }
}
let certObserver = new CertObserver();
