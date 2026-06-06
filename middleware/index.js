const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

// Proxy direct sans router
app.use('/api/auth', createProxyMiddleware({
    target: 'http://localhost:8081',
    changeOrigin: true,
    logger: console
}));

app.use('/api/communication', createProxyMiddleware({
    target: 'http://localhost:8082',
    changeOrigin: true,
    logger: console
}));

app.use('/api/administration', createProxyMiddleware({
    target: 'http://localhost:8083',
    changeOrigin: true,
    logger: console
}));

app.use('/api/formations', createProxyMiddleware({
    target: 'http://localhost:8084',
    changeOrigin: true,
    logger: console
}));

app.use('/api/etudiants', createProxyMiddleware({
    target: 'http://localhost:8085',
    changeOrigin: true,
    logger: console
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Middleware running on port ${PORT}`);
});