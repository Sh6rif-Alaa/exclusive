# 🛍️ Exclusive - Full-Stack E-Commerce Platform

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Architecture Overview](#-architecture-overview)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Pages & Routes](#-pages--routes-overview)
- [Backend API](#-backend-api)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About The Project

**Exclusive** is a complete, production-ready full-stack e-commerce platform built with modern web technologies.

The project consists of two parts:
- **Frontend**: React 19 + TypeScript + Vite — a beautiful, responsive shopping experience
- **Backend**: Node.js + Express 5 + MongoDB + Redis — a secure, scalable REST API

Key highlights:

- 🎨 **Beautiful UI/UX** — Clean, modern design with smooth animations and dark/light theme support
- 📱 **Fully Responsive** — Works seamlessly on all devices (Mobile, Tablet, Desktop)
- ⚡ **Performance** — Optimized using Vite, Redis caching, and AWS S3 for media
- 🔒 **Security** — JWT auth, bcrypt hashing, OTP verification, rate limiting, and Helmet.js
- 📧 **Email System** — OTP-based email verification via Nodemailer with event-driven architecture
- 👑 **Admin Dashboard** — Complete management interface for products, orders, users, categories, and analytics
- ☁️ **Cloud Ready** — Deployed via Vercel (frontend & backend), with AWS S3 for file storage

---

## 🏗️ Architecture Overview

```
exclusive/
├── exclusive-frontend/        # React + Vite SPA
│   ├── src/
│   │   ├── api/               # Axios API calls (auth, user)
│   │   ├── components/        # Reusable UI components & guards
│   │   ├── context/           # ThemeContext (dark/light mode)
│   │   ├── hooks/             # Custom hooks (useCountdown, etc.)
│   │   ├── pages/
│   │   │   ├── public/        # Home, Shop, Cart, Wishlist, etc.
│   │   │   ├── auth/          # Login, SignUp, Verify, ResetPassword
│   │   │   ├── protected/     # Account, Orders, Checkout, etc.
│   │   │   └── admin/         # Admin Dashboard, Products, Users, etc.
│   │   ├── redux/             # Redux Toolkit slices & store
│   │   ├── routes/            # App routing with guards
│   │   └── schema/            # Zod validation schemas
│
└── exclusive-backend/         # Express + MongoDB REST API
    └── src/
        ├── DB/
        │   ├── models/        # Mongoose models (User, Product)
        │   └── db.service.ts  # Generic CRUD service
        ├── modules/
        │   ├── auth/          # SignUp, SignIn, Google OAuth, OTP, etc.
        │   └── users/         # Profile, password, soft delete
        └── common/
            ├── middleware/    # Auth, Authorization, Multer, Validation
            ├── services/      # Redis, S3, Token
            └── utils/         # Email, Hashing, Encryption, Error handling
```

### State Management (Frontend)
- **Redux Toolkit** slices: `authSlice`, `authFlowSlice`, `cartSlice`, `userSlice`, `wishlistSlice`
- **React Router DOM v7** for client-side routing with route guards (Guest, Protected, Admin)
- **Axios** for all HTTP requests

### Auth Flow (Backend)
1. User registers → OTP sent via email (Redis-backed, 5min TTL)
2. User verifies OTP → account confirmed
3. Login → JWT access token (1 day) + refresh token (1 year)
4. Google OAuth supported via `google-auth-library`
5. Logout supports single-device or all-devices (via Redis revoke keys)

---

## 📄 Pages & Routes Overview

### Main Pages
| Page | Route | Description |
|------|-------|-------------|
| 🏠 Home | `/` | Homepage with featured products, categories, and deals |
| 🛍️ Shop | `/shop` | Product listing with filters and sorting |
| 📦 Product Details | `/shop/product-details/:id` | Individual product page with reviews |
| 🛒 Shopping Cart | `/cart` | View and manage cart items |
| 💳 Checkout | `/checkout` | Complete purchase and payment (Protected) |
| ❤️ Wishlist | `/wishlist` | Saved favorite products |

### Account & Auth Pages
| Page | Route | Description |
|------|-------|-------------|
| 🔐 Login | `/login` | User login page (Guest only) |
| ✍️ Sign Up | `/register` | New user registration (Guest only) |
| 🔑 Forget Password | `/forget-password` | Password recovery (Guest only) |
| 🔢 OTP Verification | `/verify` | Enter verification code (Guest only) |
| 🔒 New Password | `/reset-password` | Create new password (Guest only) |
| 👤 My Account | `/user-account` | User profile management (Protected) |
| 📋 My Orders | `/orders` | Order history and status (Protected) |
| 📊 Order Details | `/order-details/:id` | Detailed order information (Protected) |
| 🚚 Track Order | `/track-order/:id` | Real-time order tracking (Protected) |
| ⭐ My Reviews | `/reviews` | Manage product reviews (Protected) |
| 💳 Payment Methods | `/payment-methods` | Saved payment cards (Protected) |
| 📍 Address Book | `/address-book` | Shipping addresses (Protected) |

### Admin Dashboard
| Page | Route | Description |
|------|-------|-------------|
| 🎛️ Dashboard | `/admin` | Main admin overview with statistics and charts |
| 📦 Products | `/admin/products` | Manage products (Add, Edit, Delete) |
| 📋 Orders | `/admin/orders` | Manage customer orders and update statuses |
| 👥 Users | `/admin/users` | Manage registered users and permissions |
| ⭐ Reviews | `/admin/reviews` | Monitor and moderate product reviews |
| 🏷️ Categories | `/admin/categories` | Manage product categories |
| 📊 Analytics | `/admin/analytics` | Detailed store performance analytics |
| ⚙️ Settings | `/admin/settings` | General store configuration and settings |

### Information Pages
| Page | Route | Description |
|------|-------|-------------|
| ℹ️ About Us | `/about-us` | Company information |
| 📧 Contact Us | `/contact-us` | Contact form and information |
| 🔒 Privacy Policy | `/privacy` | Privacy and data protection |
| 📜 Terms of Service | `/terms` | Terms and conditions |
| ❓ FAQ | `/faq` | Frequently asked questions |
| ⚠️ Error 404 | `*` | Custom error page for not found routes |

---

## 🔌 Backend API

Base URL: `/api/v1`

### Auth Endpoints (`/api/v1/auth`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/sign-up` | Register new user | Public |
| POST | `/sign-in` | Login with email & password | Public |
| POST | `/sign-up-gmail` | Login / Register via Google | Public |
| POST | `/verify-email` | Verify OTP code | Public |
| POST | `/forget-password` | Request password reset OTP | Public |
| POST | `/reset-password` | Reset password with OTP | Public |
| POST | `/resend-otp` | Re-send OTP | Public |
| POST | `/logout` | Logout (single or all devices) | 🔒 JWT |

### User Endpoints (`/api/v1/users`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/refresh-token` | Get new access token | 🔒 Refresh JWT |
| GET | `/profile` | Get my profile | 🔒 JWT |
| PATCH | `/profile` | Update profile info | 🔒 JWT |
| PATCH | `/password` | Change password | 🔒 JWT |
| DELETE | `/profile` | Soft-delete account | 🔒 JWT |

---

## 🛠️ Tech Stack

### Frontend
| Category | Technology |
|----------|-----------|
| UI Library | React 19 |
| Language | TypeScript |
| Build Tool | Vite 8 |
| State Management | Redux Toolkit + React Redux |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS v4 |
| Forms | React Hook Form + Zod |
| HTTP | Axios |
| Icons | Lucide React |
| Slider | Swiper |
| Charts | Recharts |
| Notifications | React Hot Toast |

### Backend
| Category | Technology |
|----------|-----------|
| Runtime | Node.js |
| Framework | Express 5 |
| Language | TypeScript |
| Database | MongoDB + Mongoose |
| Cache / Sessions | Redis |
| Auth | JWT (access + refresh) + Google OAuth |
| File Storage | AWS S3 |
| Email | Nodemailer |
| Security | Helmet, CORS, express-rate-limit, bcrypt |
| Validation | Zod |
| Deployment | Vercel + PM2 |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** (local or Atlas)
- **Redis** (local or cloud)
- **AWS S3** bucket (for file uploads)

---

## 📥 Installation

### 1. Clone the Project

```bash
git clone https://github.com/Sh6rif-Alaa/exclusive.git
cd exclusive
```

### 2. Setup Backend

```bash
cd exclusive-backend
npm install
cp .env.example .env
# Fill in .env values (see Environment Variables section)
npm run dev
```

### 3. Setup Frontend

```bash
cd exclusive-frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173/`  
The backend will run on the port defined in your `.env`

---

## 🔧 Environment Variables

### Backend (`.env`)

```env
PORT=3000
MONGO_URI=mongodb://...
REDIS_URL=redis://...

TOKEN_KEY=your_jwt_secret
REFRESH_TOKEN_KEY=your_refresh_secret

CLIENT_ID=your_google_oauth_client_id

AWS_REGION=us-east-1
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=your_s3_bucket

EMAIL_USER=your@email.com
EMAIL_PASS=your_email_password
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the Project**
2. **Create Feature Branch** (`git checkout -b feat/AmazingFeat`)
3. **Commit Changes** (`git commit -m 'Add some AmazingFeat'`)
4. **Push to Branch** (`git push origin feat/AmazingFeat`)
5. **Open Pull Request**

### Contribution Guidelines

- Follow existing code style (ESLint and TypeScript configurations)
- Write meaningful commit messages
- Update documentation if needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⭐ Show Your Support

If you found this project helpful, please consider:
- ⭐ Starring the repository
- 🔄 Sharing with others
- 🐛 Reporting bugs
- 💡 Suggesting improvements
