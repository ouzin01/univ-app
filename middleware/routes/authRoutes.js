const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('../config/proxy.config');

const router = express.Router();

router.use('/', createProxyMiddleware({
    target: config.auth,
    changeOrigin: true,
    pathRewrite: { '^/api/auth': '/api/auth' }
}));

module.exports = router;