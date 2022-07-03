var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { localUrl } from './server_config.js';
class LoginMenu {
    constructor() {
        this.url = localUrl + '/main/account/';
        this.guestEl = document.getElementById('guest');
        this.memberEl = document.getElementById('member');
    }
    setLoginMenu() { }
    setLogoutMenu() { }
    getStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const access_token = localStorage.getItem('access_token');
            if (access_token == null)
                return;
            //alert(access_token);
            const data = '';
            const option = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: access_token,
                },
            };
            try {
                const response = yield fetch(this.url, option);
                if (response.status === 200) {
                    this.guestEl.style.display = 'none';
                    this.memberEl.style.display = 'block';
                    //alert(await response.text());
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
                alert(e);
            }
        });
    }
}
let loginMenu = new LoginMenu();
loginMenu.getStatus();
