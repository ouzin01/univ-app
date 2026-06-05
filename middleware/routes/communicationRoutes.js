const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('../config/proxy.config');

const router = express.Router();

router.use('/', createProxyMiddleware({
    target: config.communication,
    changeOrigin: true,
    pathRewrite: { '^/api/communication': '/api/communication' }
}));

module.exports = router;