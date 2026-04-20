# 🛒 Shoply — Full Stack

A full-stack e-commerce application built with **React.js** (Frontend) · **Java Spring Boot** (Backend) · **MySQL / H2** (Database).

---

## 📑 Table of Contents

1. [Tech Stack](#-tech-stack)
2. [Project Structure](#-project-structure)
3. [Application Startup Pipeline](#-application-startup-pipeline)
4. [Request Data-Flow](#-request-data-flow)
5. [Step-by-Step File Execution](#-step-by-step-file-execution)
   - [Frontend Execution Order](#frontend-execution-order)
   - [Backend Execution Order](#backend-execution-order)
6. [Authentication Flow (JWT)](#-authentication-flow-jwt)
7. [Key Data Flows by Feature](#-key-data-flows-by-feature)
8. [Database Schema Overview](#-database-schema-overview)
9. [API Reference](#-api-reference)
10. [Setup & Running Locally](#-setup--running-locally)
11. [Environment Configuration](#-environment-configuration)

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js 18, React Router v6, Context API, Axios, CSS3 |
| Backend | Java 17, Spring Boot 3.2, Spring Security, Spring Data JPA |
| Auth | JWT (jjwt 0.11.5), BCrypt password hashing |
| Database | MySQL 8 (production) · H2 in-memory (development/testing) |
| Build tools | Maven (backend) · npm (frontend) |
| Dev extras | Lombok, Spring DevTools, H2 Console |

---

## 🗂️ Project Structure

```
shoply/
│
├── frontend/                          ← React.js SPA
│   ├── public/
│   │   └── index.html                 ← HTML shell; React mounts here
│   ├── src/
│   │   ├── index.js                   ← Entry point — creates React root
│   │   ├── App.js                     ← Route definitions + global providers
│   │   ├── App.css / index.css        ← Global styles
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.js         ← Auth state (user, token, login/logout)
│   │   │   └── CartContext.js         ← Cart state (items, totals, CRUD)
│   │   │
│   │   ├── utils/
│   │   │   └── api.js                 ← Axios instance + JWT interceptor + all API calls
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.js / .css       ← Top navigation bar
│   │   │   ├── Footer.js / .css       ← Site footer
│   │   │   └── ProductCard.js / .css  ← Reusable product card
│   │   │
│   │   └── pages/
│   │       ├── HomePage.js / .css     ← Product listing + category filter
│   │       ├── ProductPage.js / .css  ← Product detail + Add to Cart
│   │       ├── SearchPage.js / .css   ← Search results
│   │       ├── CartPage.js / .css     ← Cart review + quantity update
│   │       ├── CheckoutPage.js / .css ← Shipping form + order placement
│   │       ├── OrdersPage.js / .css   ← Order history
│   │       ├── LoginPage.js           ← Login form
│   │       ├── RegisterPage.js        ← Registration form
│   │       └── AuthPages.css          ← Shared auth page styles
│   │
│   └── package.json
│
└── backend/                           ← Spring Boot REST API
    ├── pom.xml                        ← Maven dependencies
    └── src/main/
        ├── java/com/amazon/
        │   ├── ShoplyApplication.java        ← Main entry point (@SpringBootApplication)
        │   │
        │   ├── config/
        │   │   ├── SecurityConfig.java       ← Filter chain, CORS, route permissions
        │   │   ├── JwtAuthFilter.java        ← Per-request JWT validation filter
        │   │   └── JwtUtil.java              ← Token generation & validation helpers
        │   │
        │   ├── controller/
        │   │   ├── AuthController.java       ← POST /api/auth/register|login
        │   │   ├── ProductController.java    ← GET|POST|PUT|DELETE /api/products/**
        │   │   ├── CartController.java       ← GET|POST|DELETE /api/cart/**
        │   │   └── OrderController.java      ← GET|POST /api/orders/**
        │   │
        │   ├── service/
        │   │   ├── AuthService.java          ← UserDetailsService, register, login
        │   │   ├── ProductService.java       ← Product CRUD, search, filter
        │   │   ├── CartService.java          ← Cart management per user
        │   │   └── OrderService.java         ← Order creation, status, history
        │   │
        │   ├── repository/
        │   │   ├── UserRepository.java       ← JPA: users table
        │   │   ├── ProductRepository.java    ← JPA: products table
        │   │   ├── CartItemRepository.java   ← JPA: cart_items table
        │   │   ├── OrderRepository.java      ← JPA: orders table
        │   │   ├── OrderItemRepository.java  ← JPA: order_items table
        │   │   └── ReviewRepository.java     ← JPA: reviews table
        │   │
        │   └── model/
        │       ├── User.java                 ← Entity: users (id, name, email, password, role)
        │       ├── Product.java              ← Entity: products
        │       ├── CartItem.java             ← Entity: cart_items (user → product)
        │       ├── Order.java                ← Entity: orders (user, items, shipping, status)
        │       ├── OrderItem.java            ← Entity: order_items (order → product)
        │       └── Review.java               ← Entity: reviews
        │
        └── resources/
            ├── application.properties        ← DB, JPA, JWT, logging config
            └── data.sql                      ← Seed data (12 sample products)
```

---

## ⚡ Application Startup Pipeline

### Backend startup sequence

```
mvn spring-boot:run
       │
       ▼
ShoplyApplication.main()                ← @SpringBootApplication scans all beans
       │
       ├─► application.properties loaded ← DB URL, JWT secret, JPA settings
       │
       ├─► Hibernate DDL (create-drop)   ← Tables auto-created from @Entity classes
       │
       ├─► data.sql executed             ← 12 seed products inserted into DB
       │
       ├─► SecurityConfig bean created
       │      └─ JwtAuthFilter registered before UsernamePasswordAuthenticationFilter
       │      └─ CORS allowed for http://localhost:3000
       │      └─ Public routes: /api/auth/**, /api/products/**, /h2-console/**
       │      └─ Protected routes: /api/cart/**, /api/orders/**
       │
       └─► Embedded Tomcat starts on port 8080
```

### Frontend startup sequence

```
npm start
    │
    ▼
public/index.html loaded by browser     ← bare <div id="root"> shell
    │
    ▼
src/index.js                            ← ReactDOM.createRoot('#root').render(...)
    │
    ▼
src/App.js                              ← Wraps everything in context providers
    │
    ├─► <AuthProvider>                  ← Reads token/user from localStorage on mount
    │       └─► <CartProvider>          ← Reads cart array from localStorage on mount
    │               └─► <Router>        ← BrowserRouter initialises routing
    │                       ├─► <Navbar />   ← Always rendered (reads AuthContext + CartContext)
    │                       ├─► <Routes>     ← Matches URL → renders correct Page component
    │                       └─► <Footer />   ← Always rendered
    │
    └─► Page component renders, calls API functions from utils/api.js
```

---

## 🔄 Request Data-Flow

```
Browser (React SPA)
        │
        │  1. User action (click, form submit, page load)
        ▼
  Page Component          e.g. HomePage, ProductPage, CheckoutPage
        │
        │  2. Calls an exported function from utils/api.js
        ▼
  utils/api.js            Axios instance (baseURL = http://localhost:8080/api)
        │                 ↳ Request interceptor auto-attaches JWT from localStorage
        │
        │  3. HTTP request over network (JSON)
        ▼
─────────────────────── BACKEND ───────────────────────────────────
        │
        │  4. Spring Security filter chain
        ▼
  JwtAuthFilter           Reads Authorization: Bearer <token> header
        │                 Validates JWT → sets SecurityContext (user + role)
        │
        │  5. Route matched to @RestController method
        ▼
  Controller Layer        AuthController / ProductController / CartController / OrderController
        │                 Validates input, delegates to service
        │
        │  6. Business logic
        ▼
  Service Layer           AuthService / ProductService / CartService / OrderService
        │                 Applies rules, builds entities, calls repository
        │
        │  7. Database query via JPA
        ▼
  Repository Layer        Spring Data JPA interfaces → Hibernate → SQL
        │
        ▼
  Database                H2 (dev) or MySQL (prod)
        │
        │  8. Entity returned, serialised to JSON
        ▼
  Service → Controller → HTTP 200 JSON response
        │
─────────────────────── FRONTEND ──────────────────────────────────
        │
        │  9. Axios promise resolves
        ▼
  Page Component          Updates local state (useState / useContext)
        │
        ▼
  React re-renders        Updated UI shown to user
```

---

## 📂 Step-by-Step File Execution

### Frontend Execution Order

| Step | File | What happens |
|------|------|--------------|
| 1 | `public/index.html` | Browser loads the HTML shell; the `<div id="root">` is the only mount point |
| 2 | `src/index.js` | `ReactDOM.createRoot` attaches React to `#root`; renders `<App>` inside `<React.StrictMode>` |
| 3 | `src/App.js` | Defines the provider tree and all `<Route>` mappings; `AuthProvider` and `CartProvider` are instantiated here |
| 4 | `src/context/AuthContext.js` | On mount, reads `token` + `user` from `localStorage`; exposes `login()`, `logout()`, `isLoggedIn` to all children via `useAuth()` |
| 5 | `src/context/CartContext.js` | On mount, reads `cart` array from `localStorage`; exposes `addToCart()`, `removeFromCart()`, `updateQuantity()`, `cartCount`, `cartTotal` via `useCart()` |
| 6 | `src/components/Navbar.js` | Rendered on every page; reads `AuthContext` (show login/logout) and `CartContext` (show item count) |
| 7 | **Matching page component** | Rendered inside `<Routes>` based on URL path (see table below) |
| 8 | `src/utils/api.js` | Any page that needs data calls an exported function here; the Axios interceptor attaches the JWT before the request leaves the browser |
| 9 | `src/components/Footer.js` | Rendered on every page below the main content |

**Route → Page mapping**

| URL Path | Page Component | Primary API calls |
|----------|----------------|-------------------|
| `/` | `HomePage.js` | `getProducts()`, `getProductsByCategory()` |
| `/product/:id` | `ProductPage.js` | `getProduct(id)` |
| `/search` | `SearchPage.js` | `searchProducts(q)` |
| `/cart` | `CartPage.js` | `getCart()`, `removeCartItem()` |
| `/checkout` | `CheckoutPage.js` | `placeOrder()` |
| `/orders` | `OrdersPage.js` | `getOrders()` |
| `/login` | `LoginPage.js` | `loginUser()` |
| `/register` | `RegisterPage.js` | `registerUser()` |

---

### Backend Execution Order

| Step | File | What happens |
|------|------|--------------|
| 1 | `ShoplyApplication.java` | `SpringApplication.run()` bootstraps the IoC container, triggers component scan |
| 2 | `application.properties` | Loaded by Spring Environment; configures datasource, JPA, JWT secret, logging |
| 3 | **Hibernate DDL** | `spring.jpa.hibernate.ddl-auto=create-drop` — tables created from `@Entity` models on startup |
| 4 | `data.sql` | Spring executes seed SQL after schema creation; 12 products are inserted |
| 5 | `SecurityConfig.java` | `SecurityFilterChain` bean constructed; CORS rules and route access rules registered |
| 6 | `JwtAuthFilter.java` | Added before `UsernamePasswordAuthenticationFilter`; runs on every incoming request |
| 7 | **Request arrives → Filter chain** | `JwtAuthFilter.doFilterInternal()` — extracts Bearer token, calls `JwtUtil.extractEmail()`, loads `UserDetails`, validates token, sets `SecurityContextHolder` |
| 8 | **Controller method invoked** | Spring MVC routes to the correct `@RestController` method based on HTTP method + path |
| 9 | **Service method called** | Controller delegates to a `@Service`; business logic runs (validation, entity construction) |
| 10 | **Repository query executed** | `@Repository` interface method → Hibernate generates SQL → result returned |
| 11 | **Response serialised** | Jackson converts the return value to JSON; `ResponseEntity` sets HTTP status code |

---

## 🔐 Authentication Flow (JWT)

```
┌─────────────┐         POST /api/auth/login          ┌──────────────────┐
│   Browser   │ ─────── { email, password } ────────► │  AuthController  │
│             │                                        │                  │
│             │                                        │  AuthService     │
│             │                                        │  ├─ authenticates│
│             │                                        │  ├─ loads User   │
│             │                                        │  └─ generateToken│
│             │ ◄──── { token, user } ─────────────── │  JwtUtil         │
│             │                                        └──────────────────┘
│ localStorage│
│  token ✓   │
│  user  ✓   │
└─────────────┘

Every subsequent request:
┌─────────────┐   Authorization: Bearer <JWT>    ┌──────────────────────┐
│  api.js     │ ──────────────────────────────► │  JwtAuthFilter       │
│ interceptor │                                  │  ├─ extract email    │
│             │                                  │  ├─ load UserDetails │
│             │                                  │  ├─ validate token   │
│             │                                  │  └─ set SecurityCtx  │
└─────────────┘                                  └──────────────────────┘
                                                          │
                                                          ▼
                                                  Controller proceeds
                                                  (user identity known)
```

**Token storage:** JWT is stored in `localStorage` under the key `token`. The Axios request interceptor in `api.js` reads it on every call and injects it as an `Authorization: Bearer` header automatically.

---

## 🗺️ Key Data Flows by Feature

### 1 — Browse Products (unauthenticated)

```
HomePage mounts
  → getProducts() [api.js]
    → GET /api/products
      → ProductController.getAllProducts()
        → ProductService.getAllProducts()
          → ProductRepository.findAll()
            → DB SELECT * FROM products
          ← List<Product>
        ← List<Product>
      ← HTTP 200 JSON array
    ← Axios resolves
  ← useState(products) updated → ProductCard grid re-renders
```

### 2 — Add to Cart

```
User clicks "Add to Cart" on ProductPage
  → CartContext.addToCart(product, qty)
    → setCartItems(updated array)          ← in-memory state update
    → localStorage.setItem('cart', ...)    ← persisted across page refreshes
  → Navbar CartContext.cartCount re-renders (badge updated)
```

> **Note:** Cart state is managed client-side in `CartContext`. The backend `/api/cart` endpoints exist for server-side persistence; the current frontend primarily uses `CartContext`.

### 3 — Checkout / Place Order

```
CheckoutPage form submitted
  → placeOrder({ items, shippingAddress, paymentMethod }) [api.js]
    → POST /api/orders  (JWT in header)
      → JwtAuthFilter validates token → user identity resolved
      → OrderController.placeOrder()
        → OrderService.createOrder()
          → CartItemRepository / ProductRepository lookups
          → Order entity built (OrderItems, total, shipping fields)
          → OrderRepository.save(order)
            → DB INSERT INTO orders + order_items
          ← saved Order
        ← saved Order
      ← HTTP 200 JSON
    ← Axios resolves
  → CartContext.clearCart()              ← cart emptied
  → Navigate to /orders
```

### 4 — Search

```
User types in search bar → SearchPage navigated with ?q=<query>
  → searchProducts(q) [api.js]
    → GET /api/products/search?q=<query>
      → ProductController.search()
        → ProductService.searchProducts()
          → ProductRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase()
            ← List<Product>
      ← HTTP 200 JSON
    ← Axios resolves
  → useState(results) updated → product grid re-renders
```

---

## 🗄️ Database Schema Overview

```
users
  id | name | email (unique) | password (bcrypt) | role (USER|ADMIN) | created_at

products
  id | name | description | price | original_price | category | brand
   | image_url | stock | rating | is_prime

cart_items
  id | user_id (FK → users) | product_id (FK → products) | quantity

orders
  id | user_id (FK → users) | total | status | payment_method
   | shipping_name | shipping_phone | shipping_line1 | shipping_line2
   | shipping_city | shipping_state | shipping_pincode
   | created_at | updated_at

order_items
  id | order_id (FK → orders) | product_id (FK → products) | quantity | price

reviews
  id | user_id (FK → users) | product_id (FK → products) | rating | comment | created_at
```

**Entity relationships:**
- `User` 1 ──< `Order` (one user, many orders)
- `Order` 1 ──< `OrderItem` (one order, many line items)
- `User` 1 ──< `CartItem` (one user, many cart items)
- `Product` 1 ──< `CartItem` / `OrderItem` / `Review`

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | ❌ Public | Register; returns `{ token, user }` |
| `POST` | `/api/auth/login` | ❌ Public | Login; returns `{ token, user }` |

### Products

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/products` | ❌ Public | All products |
| `GET` | `/api/products/{id}` | ❌ Public | Single product |
| `GET` | `/api/products/search?q=` | ❌ Public | Full-text search |
| `GET` | `/api/products/category/{cat}` | ❌ Public | Filter by category |
| `GET` | `/api/products/prime` | ❌ Public | Prime-eligible products |
| `GET` | `/api/products/categories` | ❌ Public | All category names |
| `GET` | `/api/products/filter?maxPrice=` | ❌ Public | Filter by max price |
| `POST` | `/api/products` | 🔒 ADMIN | Create product |
| `PUT` | `/api/products/{id}` | 🔒 ADMIN | Update product |
| `DELETE` | `/api/products/{id}` | 🔒 ADMIN | Delete product |

### Cart

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/cart` | 🔒 USER | Get cart items |
| `POST` | `/api/cart/add` | 🔒 USER | Add item to cart |
| `DELETE` | `/api/cart/{id}` | 🔒 USER | Remove cart item |

### Orders

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/orders` | 🔒 USER | Place order |
| `GET` | `/api/orders` | 🔒 USER | Get order history |
| `GET` | `/api/orders/{id}` | 🔒 USER | Get single order |

---

## ⚙️ Setup & Running Locally

### Prerequisites

| Tool | Minimum version |
|------|----------------|
| Java | 17 |
| Maven | 3.8 |
| Node.js | 18 |
| npm | 9 |
| MySQL | 8 *(optional — H2 used by default)* |

### 1. Clone the repository

```bash
git clone https://github.com/soham29640/Shoply.git
cd Shoply
```

### 2. Start the backend

```bash
cd backend

# (Optional) Switch to MySQL — edit application.properties first
# See "Environment Configuration" section below

mvn spring-boot:run
```

Backend starts at **http://localhost:8080**  
H2 console (dev mode) available at **http://localhost:8080/h2-console**

### 3. Start the frontend

```bash
cd frontend
npm install
npm start
```

Frontend starts at **http://localhost:3000**

---

## 🌐 Environment Configuration

### `backend/src/main/resources/application.properties`

```properties
# ── Development (default) ──────────────────────────────
spring.datasource.url=jdbc:h2:mem:shoply
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop   # schema recreated on every restart

# ── Production (MySQL) — uncomment & fill in ──────────
# spring.datasource.url=jdbc:mysql://localhost:3306/shoply?useSSL=false&serverTimezone=UTC
# spring.datasource.username=root
# spring.datasource.password=your_password
# spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
# spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
# spring.jpa.hibernate.ddl-auto=update      # keeps existing data

# ── JWT ────────────────────────────────────────────────
app.jwt.secret=<replace-with-a-long-random-string>
app.jwt.expiration=86400000                  # 24 hours in ms
```

### `frontend/.env` *(create if needed)*

```env
REACT_APP_API_URL=http://localhost:8080/api
```

The frontend falls back to `http://localhost:8080/api` when this variable is not set (see `src/utils/api.js`).
