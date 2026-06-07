# 🎓 UNCHK — Application Web de Gestion Universitaire

> **Université Numérique Cheikh Hamidou Kane**  
> Master Ingénierie Logicielle P8 — Année universitaire 2025-2026  
> Étudiant : **Ousseynou NDOYE**

---

## 📋 Description

Application web modulaire pour la gestion administrative et pédagogique de l'UNCHK. Elle couvre 5 modules fonctionnels : Communication, Administration, Insertion, Formations et Étudiants.

**Architecture 3 couches :**
- 🎨 **Frontend** : Angular 21 + Angular Material
- 🔀 **Middleware** : Node.js + Express (API Gateway)
- ⚙️ **Backend** : Spring Boot 3.5 (5 microservices) + PostgreSQL

---

## ✅ Prérequis

Assurez-vous d'avoir installé les outils suivants avant de démarrer :

| Outil | Version minimale | Vérification |
|-------|-----------------|--------------|
| Java (OpenJDK Temurin) | >= 21 | `java -version` |
| Maven | >= 3.9 | `mvn -version` |
| Node.js | >= 18 | `node -version` |
| npm | >= 9 | `npm -version` |
| Angular CLI | >= 17 | `ng version` |
| PostgreSQL | >= 14 | `psql --version` |
| Git | >= 2 | `git --version` |

---

## 🗄️ Configuration de la base de données

### 1. Créer les 5 bases de données PostgreSQL

Ouvrez pgAdmin ou psql et exécutez :

```sql
CREATE DATABASE univapp_auth;
CREATE DATABASE univapp_communication;
CREATE DATABASE univapp_administration;
CREATE DATABASE univapp_formation;
CREATE DATABASE univapp_etudiant;
```

### 2. Configurer les identifiants

Dans chaque fichier `backend/[service]/src/main/resources/application.yml`, vérifiez :

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/univapp_[service]
    username: postgres
    password: VOTRE_MOT_DE_PASSE
```

> ⚠️ Remplacez `VOTRE_MOT_DE_PASSE` par votre mot de passe PostgreSQL local.

---

## 🚀 Démarrage de l'application

L'application nécessite **7 terminaux** ouverts simultanément.

### Terminal 1 — Auth Service (port 8081)

```bash
cd backend/auth-service
mvn spring-boot:run
```

### Terminal 2 — Communication Service (port 8082)

```bash
cd backend/communication-service
mvn spring-boot:run
```

### Terminal 3 — Administration Service (port 8083)

```bash
cd backend/administration-service
mvn spring-boot:run
```

### Terminal 4 — Formation Service (port 8084)

```bash
cd backend/formation-service
mvn spring-boot:run
```

### Terminal 5 — Étudiant Service (port 8085)

```bash
cd backend/etudiant-service
mvn spring-boot:run
```

### Terminal 6 — Middleware Express (port 3000)

```bash
cd middleware
npm install
npm run dev
```

### Terminal 7 — Frontend Angular

```bash
cd frontend/univ-app-frontend
npm install
ng serve --proxy-config proxy.conf.json
```

---

## 🌐 Accès à l'application

| Service | URL |
|---------|-----|
| **Application** | http://localhost:4200 |
| **Health check Middleware** | http://localhost:3000/health |
| **Auth API** | http://localhost:8081/api/auth |
| **Communication API** | http://localhost:8082/api/communication |
| **Administration API** | http://localhost:8083/api/administration |
| **Formation API** | http://localhost:8084/api/formations |
| **Étudiant API** | http://localhost:8085/api/etudiants |

---

## 🔐 Connexion

| Champ | Valeur |
|-------|--------|
| **Username** | `admin` |
| **Password** | `admin123` |
| **Rôle** | ADMIN |

> Pour créer d'autres comptes, utilisez l'endpoint `POST /api/auth/register`

---

## 📁 Structure du projet

```
univ-app/
├── backend/
│   ├── auth-service/          # Authentification JWT (port 8081)
│   ├── communication-service/ # Comptes rendus, circulaires (port 8082)
│   ├── administration-service/# Courriers, budget, RH (port 8083)
│   ├── formation-service/     # Formations, EDT (port 8084)
│   └── etudiant-service/      # Dossiers étudiants (port 8085)
├── middleware/                 # API Gateway Express (port 3000)
├── frontend/
│   └── univ-app-frontend/     # Application Angular
└── docs/                      # Documentation
```

---

## 🧩 Modules fonctionnels

| Module | Description |
|--------|-------------|
| 🔔 **Communication** | Comptes rendus, circulaires, archives, notifications |
| 🏛️ **Administration** | Courriers, notes de service, budget, RH |
| 💼 **Insertion** | Suivi étudiants, statistiques, partenaires |
| 📚 **Formations** | Fiches formations, emploi du temps, formateurs, réunions |
| 🎓 **Étudiants** | Dossiers complets, diplômes, autres formations |

---

## 🛠️ Technologies

**Frontend**
- Angular 21, Angular Material 21, Chart.js, TypeScript, SCSS

**Middleware**
- Node.js 24, Express, http-proxy-middleware

**Backend**
- Spring Boot 3.5, Java 21, Spring Security, JWT, JPA/Hibernate, PostgreSQL

---

## 📝 Livrables

- ✅ Code source versionné (Git)
- ✅ Rapport technique
- ✅ Spécifications fonctionnelles
- ✅ Schéma de base de données
- ✅ Démo fonctionnelle

---

## 👤 Auteur

**Ousseynou NDOYE**  
Master Ingénierie Logicielle P8  
Université Numérique Cheikh Hamidou Kane  
Juin 2026
