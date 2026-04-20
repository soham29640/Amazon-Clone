# 🛒 Amazon Clone - Full Stack

A full-stack Amazon clone built with **React.js** (Frontend) + **Java Spring Boot** (Backend) + **MySQL** (Database).

## 🗂️ Project Structure

```
amazon-clone/
├── frontend/          → React.js app (HTML, CSS, JS, React)
│   ├── src/
│   │   ├── components/   → Navbar, ProductCard, Cart, etc.
│   │   ├── pages/        → Home, Product, Cart, Checkout, Login
│   │   ├── context/      → CartContext, AuthContext
│   │   └── utils/        → api.js (Axios config)
│   ├── public/
│   └── package.json
│
└── backend/           → Java Spring Boot REST API
    └── src/main/
        ├── java/com/amazon/
        │   ├── controller/   → REST Controllers
        │   ├── service/      → Business Logic
        │   ├── repository/   → JPA Repositories
        │   ├── model/        → Entity Classes
        │   └── config/       → Security, CORS Config
        └── resources/
            └── application.properties
```

## 🚀 Tech Stack

### Frontend
- React.js 18 + React Router v6
- Context API (Cart + Auth state)
- Axios (HTTP client)
- CSS3 (custom, no framework)

### Backend
- Java 17 + Spring Boot 3
- Spring Security + JWT Auth
- Spring Data JPA + Hibernate
- MySQL Database
- Maven

## ⚙️ Setup Instructions

### Backend
1. Install Java 17+ and Maven
2. Create MySQL database: `CREATE DATABASE amazon_clone;`
3. Update `backend/src/main/resources/application.properties` with your DB credentials
4. Run: `cd backend && mvn spring-boot:run`
5. API runs at: `http://localhost:8080`

### Frontend
1. Install Node.js 18+
2. Run: `cd frontend && npm install`
3. Run: `npm start`
4. App runs at: `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login + get JWT |
| GET | /api/products | Get all products |
| GET | /api/products/{id} | Get product by ID |
| GET | /api/products/search?q= | Search products |
| GET | /api/products/category/{cat} | Filter by category |
| POST | /api/cart/add | Add to cart |
| GET | /api/cart | Get cart items |
| DELETE | /api/cart/{id} | Remove from cart |
| POST | /api/orders | Place order |
| GET | /api/orders | Get user orders |
