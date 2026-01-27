## Table of Contents

* [About the Project](#about-the-project)
* [Tech Stack](#tech-stack)
* [Prerequisites](#prerequisites)
* [Using Tailwind CSS](#using-tailwind-css)
* [Generating CSS Locally](#generating-css-locally)

---

## About the Project

**Exclusive** is a modern E-Commerce web application that demonstrates a fully responsive UI built with HTML, CSS, Tailwind, and JavaScript.
The project structure allows easy scalability for full-stack integration.

---

## Tech Stack

* **HTML5 / CSS3**
* **Tailwind CSS**
* **JavaScript**
* **Node.js / npm** (for building Tailwind)

---

## Prerequisites

Before running this project locally, make sure you have the following installed:

* **Node.js** (LTS version)
* **npm** (comes bundled with Node.js)

Download Node.js from the official website:
👉 [https://nodejs.org/en/download](https://nodejs.org/en/download)

Verify installation:

```bash
node -v
npm -v
```

---

## Using Tailwind CSS

This project uses **Tailwind CSS** for fast, utility-first styling.
All custom styles are written in the source `style.css` file and compiled into the `output.css` file for production.

---

## Generating CSS Locally

The final `output.css` is generated from the source `style.css` using the Tailwind CLI.

**First, install the project dependencies (First Time Only)**

```bash
npm install
```

**Option 1: Short Command (Recommended)**

```bash
npm run start:tail
```

**Option 2: Full Command**

```bash
npx @tailwindcss/cli -i ./assets/css/style.css -o ./assets/css/output.css --watch
```