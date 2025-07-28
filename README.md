# E-Commerce File Store

**PDShop** is a full-stack open-source file-based e-commerce fully responsive platform built with **MongoDB**, **Node.js**, **Next.js v15**, and **Tailwind CSS**.  
It supports digital sales of graphic files, applications, and ebooks with a built-in admin panel accessible only to authorized admins.

---

## 🌐 Live Site

🔗 [www.pdshop.ir](https://www.pdshop.ir)

---

## ⚙️ Tech Stack

- **Frontend**: Next.js 15, React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Auth**: JWT (token-based authentication)
- **Payments**: Simulated payment gateway

---

## 🚀 Features

- Digital store for selling files (graphics, apps, books)
- Token-based user authentication with JWT
- Admin-only access to dashboard via `/dashboard` route
- Simulated payment system with download access
- Fully responsive UI with Tailwind CSS
- Role-based access for admin and users
- Ajax search
  
---

## 📁 Project Structure


```
file-shop/
├── Client/                 # Frontend (Next.js)
│   ├── app/               # App router pages and routes
│   ├── components/        # Reusable UI components
│   ├── context/           # React context providers
│   ├── public/            # Static assets
│   ├── styles/            # Tailwind & global styles
│   ├── .env.local         # Environment variables
│   └── next.config.mjs    # Next.js config
│
├── Server/                 # Backend (Node.js + Express)
│   ├── controllers/       # Request handlers
│   ├── middlewares/       # Auth and validation middleware
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Express routes
│   ├── .env               # Server environment variables
│   └── server.js          # Entry point for backend server
```

---

## 🛠 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/BehnoodAmini/file-shop.git
cd file-shop
````

### 2. Install Dependencies

Install server dependencies:

```bash
cd Server
npm install
```

Install client dependencies:

```bash
cd ../Client
npm install
```

### 3. Setup Environment Variables

**Server/.env**

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**Client/.env.local**

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Run the Project Locally

Start the backend:

```bash
cd Server
npm run start
```

Start the frontend:

```bash
cd ../Client
npm run dev
```

Frontend will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🔒 Admin Access

Only users with admin role can access the dashboard:

```
/dashboard
```

Role is validated on the backend using JWT.

---
