const defaultOptions = {
  method: 'GET',
  headers: {},
};

const findOptions = (options) => {
  if (options) {
    const cleanOptions = Object.keys(options).map(key => defaultOptions[key] !== 'undefined');
    return Object.assign(defaultOptions, cleanOptions);
  }
  return defaultOptions;
};

class Request {
  constructor() {
    this.results = [];
    this.queue = [];
    this.addToQueue = this.addToQueue.bind(this);
    this.inProcess = false;
  }

  addToQueue(request) {
    this.queue.push(request);
    this.checkIfStart();
  }

  async checkIfStart() {
    if (this.inProcess === true || !this.queue.length) {
      return;
    }
    const firstTask = this.queue.shift();
    this.inProcess = true;
    const result = await firstTask.requestWrapper();
    this.results.push({
      name: firstTask.name,
      result,
    });
    this.inProcess = false;
    this.checkIfStart();
  }

  make(params) {
    const {
      name,
      url,
      onRes,
      onRej,
      options,
    } = params;
    const { method, headers } = findOptions(options);
    const { results } = this;

    const requestWrapper = () =>
      fetch(url, {
        method,
        headers,
      }).then((response) => {
        if (!response.ok) {
          return onRej(response);
        }
        return response.json();
      }).then(response => onRes(response, results));

    this.addToQueue({
      name,
      requestWrapper,
    });

    return this;
  }

  static createRequestParams(name, url, onRes, onRej, options) {
    return {
      name,
      url,
      onRes,
      onRej,
      options,
    };
  }
}

export default Request;
