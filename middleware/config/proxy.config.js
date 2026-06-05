require('dotenv').config();

module.exports = {
    auth: process.env.AUTH_SERVICE || 'http://localhost:8081',
    communication: process.env.COMMUNICATION_SERVICE || 'http://localhost:8082',
    administration: process.env.ADMINISTRATION_SERVICE || 'http://localhost:8083',
    formation: process.env.FORMATION_SERVICE || 'http://localhost:8084',
    etudiant: process.env.ETUDIANT_SERVICE || 'http://localhost:8085'
};