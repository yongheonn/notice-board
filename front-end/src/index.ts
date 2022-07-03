import { localUrl, AjaxOption } from './server_config.js';

class LoginMenu {
  url: string;
  guestEl: HTMLDivElement;
  memberEl: HTMLDivElement;

  constructor() {
    this.url = localUrl + '/main/account/';
    this.guestEl = <HTMLDivElement>document.getElementById('guest');
    this.memberEl = <HTMLDivElement>document.getElementById('member');
  }

  setLoginMenu() {}

  setLogoutMenu() {}

  async getStatus() {
    const access_token: string | null = localStorage.getItem('access_token');
    if (access_token == null) return;
    //alert(access_token);
    const data = '';
    const option: AjaxOption = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: access_token,
      },
    };

    try {
      const response = await fetch(this.url, option);
      if (response.status === 200) {
        this.guestEl.style.display = 'none';
        this.memberEl.style.display = 'block';
        //alert(await response.text());
      } else throw new Error();
      /*
      if (typeof status !== 'number') throw new Error();
      if (status == loginStatus.ERROR) throw new Error();
      else if (status == loginStatus.OK) location.href = '/';
      else if (status == loginStatus.FAIL)
        this.setMsg(' ');
        */
    } catch (e: any) {
      alert(e);
    }
  }
}

let loginMenu = new LoginMenu();
loginMenu.getStatus();
