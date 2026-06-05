const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const communicationRoutes = require('./routes/communicationRoutes');
const administrationRoutes = require('./routes/administrationRoutes');
const formationRoutes = require('./routes/formationRoutes');
const etudiantRoutes = require('./routes/etudiantRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/communication', communicationRoutes);
app.use('/api/administration', administrationRoutes);
app.use('/api/formations', formationRoutes);
app.use('/api/etudiants', etudiantRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        services: {
            auth: process.env.AUTH_SERVICE,
            communication: process.env.COMMUNICATION_SERVICE,
            administration: process.env.ADMINISTRATION_SERVICE,
            formation: process.env.FORMATION_SERVICE,
            etudiant: process.env.ETUDIANT_SERVICE
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Middleware running on port ${PORT}`);
});