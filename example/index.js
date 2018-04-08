const MyRequest = Request.default;
const request = new MyRequest();

const url = 'https://www.random.org/decimal-fractions/?num=1&dec=10&col=1&format=plain&rnd=new';

const onResolve = (result, prevResults) => {
  console.log('result', result);
  console.log('prevResults', prevResults);
  return result * 1000;
};

const onReject = (result, prevResults) => {
  console.log('result', result);
  console.log('prevResults', prevResults);
};

const request1Params = MyRequest.createRequestParams('first', url, onResolve, onReject);
const request2Params = MyRequest.createRequestParams('second', url, onResolve, onReject);
const request3Params = MyRequest.createRequestParams('third', url, onResolve, onReject);

const result = request.make(request1Params).make(request2Params).make(request3Params);
console.log('result', result);
