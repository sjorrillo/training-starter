import superagent from 'superagent';
import URL from 'url';
// import config from '../config';

export default class ApiClient {
  constructor() {
    this.uploadRequestMap = new Map();

    ['get', 'post', 'put', 'patch', 'del'].forEach(method => {
      this[method] = (path, options) => {
        const methodPromise = new Promise((resolve, reject) => {
          const url = this.formatUrl(path);
          const request = this.getRequestOptions(url, method, options);

          request.end((err, { body } = { body: undefined }) => {
            if (err) {
              reject(body || err);
            } else {
              resolve(body);
            }
          });
        });

        return methodPromise;
      };
    });
  }

  getRequestOptions(url, method, options = {}) {
    const request = superagent[method](url);

    if (options && options.params) {
      request.query(options.params);
    }

    if (this.headers) {
      request.set(this.headers);
    }

    if (options && options.headers) {
      request.set(options.headers);
    }

    if (options && options.data) {
      request.send(options.data);
    }

    return request;
  }

  formatUrl(path) {
    const url = path[0] === '/' ? path.substring(1) : path;
    return URL.resolve('http://localhost:3300/api/', url);
  }

  clearHeaders() {
    this.headers = null;
  }

  setExtraHeaders(headers) {
    this.headers = {
      ...headers,
    };
  }
}
