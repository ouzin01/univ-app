const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('../config/proxy.config');

const router = express.Router();

router.use('/', createProxyMiddleware({
    target: config.formation,
    changeOrigin: true,
    pathRewrite: { '^/api/formations': '/api/formations' }
}));

module.exports = router;