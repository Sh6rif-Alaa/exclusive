# 🛍️ Exclusive - Modern E-Commerce Platform

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Pages Overview](#-pages-overview)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About The Project

**Exclusive** is a complete, production-ready e-commerce platform featuring a modern, clean interface built entirely with vanilla HTML, CSS (Tailwind), and JavaScript. This project demonstrates best practices in frontend development with a focus on:

- 🎨 **Beautiful UI/UX** - Clean, modern design with smooth animations
- 📱 **Fully Responsive** - Works seamlessly on all devices (Mobile, Tablet, Desktop)
- 🌙 **Dark Mode** - Complete dark mode support throughout the application
- ♿ **Accessible** - WCAG compliant with proper ARIA labels and semantic HTML
- ⚡ **Performance** - Optimized for fast loading and smooth interactions
- 🔧 **Maintainable** - Clean, well-organized code structure

---

## 📄 Pages Overview

### Main Pages (6)
| Page | File | Description |
|------|------|-------------|
| 🏠 Home | `index.html` | Homepage with featured products, categories, and deals |
| 🛍️ Shop | `shop.html` | Product listing with filters and sorting |
| 📦 Product Details | `product_details.html` | Individual product page with reviews |
| 🛒 Shopping Cart | `cart.html` | View and manage cart items |
| 💳 Checkout | `checkout.html` | Complete purchase and payment |
| ❤️ Wishlist | `wishlist.html` | Saved favorite products |

### Account Pages (9)
| Page | File | Description |
|------|------|-------------|
| 🔐 Login | `login.html` | User login page |
| ✍️ Sign Up | `signUp.html` | New user registration |
| 👤 My Account | `userAccount.html` | User profile management |
| 📋 My Orders | `orders.html` | Order history and status |
| 📊 Order Details | `order-details.html` | Detailed order information |
| 🚚 Track Order | `track-order.html` | Real-time order tracking |
| ⭐ My Reviews | `reviews.html` | Manage product reviews |
| 💳 Payment Methods | `payment-methods.html` | Saved payment cards |
| 📍 Address Book | `address-book.html` | Shipping addresses |

### Information Pages (6)
| Page | File | Description |
|------|------|-------------|
| ℹ️ About Us | `aboutUs.html` | Company information |
| 📧 Contact Us | `contactUs.html` | Contact form and information |
| 🔒 Privacy Policy | `privacy.html` | Privacy and data protection |
| 📜 Terms of Service | `terms.html` | Terms and conditions |
| ❓ FAQ | `faq.html` | Frequently asked questions |
| ⚠️ Error 404 | `error.html` | Custom error page |

**Total: 21 Pages** - Complete e-commerce experience

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling features
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **JavaScript (ES6+)** - Vanilla JavaScript for interactivity
- **Font Awesome 7** - Icon library

### Build Tools
- **npm** - Package manager
- **Tailwind CLI** - CSS compilation

### Fonts
- **Inter** - Primary font for UI elements
- **Poppins** - Secondary font for headings
- Loaded via Google Fonts CDN

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v24.13.1 LTS or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

Verify installation:
```bash
node -v
npm -v
```

---

## 📥 Installation

### 1. Clone the Project

**Clone Repository** (if using Git)
```bash
git clone https://github.com/Sh6rif-Alaa/exclusive.git
cd exclusive
```

### 2. Install Dependencies

Navigate to the project directory and install required packages:

```bash
npm install
```

This will install:
- Tailwind CSS CLI
- Any other dependencies listed in `package.json`

### 3. Generate CSS (First Time)

Compile Tailwind CSS:

```bash
npm run start:tail
```

Or use the full command:

```bash
npx tailwindcss -i ./assets/css/style.css -o ./assets/css/output.css --watch
```

for tailwind css -minify

```bash
npm run build
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the Project**
2. **Create Feature Branch** (`git checkout -b feat/AmazingFeat`)
3. **Commit Changes** (`git commit -m 'Add some AmazingFeat'`)
4. **Push to Branch** (`git push origin feat/AmazingFeat)
5. **Open Pull Request**

### Contribution Guidelines

- Follow existing code style
- Write meaningful commit messages
- Test on multiple browsers
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

---

**Made with ❤️ by React Group 2**

[⬆ Back to Top](#-exclusive---modern-e-commerce-platform)