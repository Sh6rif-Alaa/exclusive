# 🛍️ Exclusive - Modern E-Commerce Frontend

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Architecture & State](#-architecture--state)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Backend Integration](#-backend-integration)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About The Project

**Exclusive** is a complete, production-ready e-commerce platform frontend built with modern web technologies: React, TypeScript, and Vite. 

Currently, this project operates as a **Standalone Frontend**. There is no backend connected yet. It is fully pre-configured and architected so that integrating a real backend API in the future will be seamless.

Key features and focuses of this frontend include:

- 🎨 **Beautiful UI/UX** - Clean, modern design with smooth animations
- 📱 **Fully Responsive** - Works seamlessly on all devices (Mobile, Tablet, Desktop)
- ⚡ **Performance** - Optimized for fast loading and smooth interactions using Vite and React 19
- 🔧 **Maintainable** - Clean, well-organized code structure using TypeScript
- 🔒 **Form Validation** - Robust form handling with React Hook Form and Zod

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

## 🏗️ Architecture & State

Even though there is no backend yet, the application is structured as a real-world production app:

- **State Management**: Handled via **Redux Toolkit**. 
- **Routing**: Client-side routing is managed via **React Router DOM**.
- **API Readiness**: Uses **Axios** for HTTP requests, currently primed to connect to your future API endpoints.
- **Styling**: Uses **Tailwind CSS v4** for utility-first styling.

---

## 🛠️ Tech Stack

### Core
- **React 19** - UI Library
- **TypeScript** - Static Typing
- **Vite** - Build Tool & Dev Server

### State & Routing
- **Redux Toolkit** - State Management
- **React Redux** - React bindings for Redux
- **React Router DOM** - Application Routing

### Styling & UI Components
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Swiper** - Modern touch slider
- **React Simple Star Rating** - Rating component
- **React Hot Toast** - Notifications

### Forms & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher recommended)
- **npm** (comes with Node.js)

Verify installation:
```bash
node -v
npm -v
```

---

## 📥 Installation

### 1. Clone the Project

```bash
git clone https://github.com/Sh6rif-Alaa/exclusive.git
cd exclusive
```

### 2. Install Dependencies

Navigate to the project directory and install required packages:

```bash
npm install
```

### 3. Run Development Server

Start the Vite development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/` (or another port if 5173 is in use).

---

## 🔌 Backend Integration

This application is strictly a **frontend** at this moment. 
To connect this to a backend API:
1. Setup your base URL in the Axios instance (typically in a `src/api` or `src/services` folder).
2. Create environment variables (e.g., `.env.local`) for `VITE_API_BASE_URL`.
3. Replace the mock data/Redux initial states with API fetching logic (e.g., using Redux Thunks or RTK Query).

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
