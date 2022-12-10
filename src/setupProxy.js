const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/vnpay',{
      target: 'https://api-booking-baber.up.railway.app/api',
      changeOrigin: true,
    })
  );
};