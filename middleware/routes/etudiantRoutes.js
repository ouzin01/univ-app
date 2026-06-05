const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('../config/proxy.config');

const router = express.Router();

router.use('/', createProxyMiddleware({
    target: config.etudiant,
    changeOrigin: true,
    pathRewrite: { '^/api/etudiants': '/api/etudiants' }
}));

module.exports = router;