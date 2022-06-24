const localUrl: string = 'http://192.168.0.19/ajax';
const defaultUrl: string = 'http://127.0.0.1/ajax';

type AjaxOption = {
  method: string;
  body: string;
  headers: {
    Accept: string;
    'Content-Type': string;
  };
};

export { localUrl, defaultUrl, AjaxOption };
