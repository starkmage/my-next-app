// worker.js
self.onmessage = function (e) {
  const result = e.data * 2; // 简单运算
  self.postMessage(result);
};
