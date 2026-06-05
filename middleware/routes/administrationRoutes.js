const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('../config/proxy.config');

const router = express.Router();

router.use('/', createProxyMiddleware({
    target: config.administration,
    changeOrigin: true,
    pathRewrite: { '^/api/administration': '/api/administration' }
}));

module.exports = router;