L&P GreenField FarmsSure, Brad. Here's a complete, professional, and visually organized `README.md` file tailored for your **L\&P Greenfield Farms MERN Stack Web App**.

---

````markdown
# 🌾 L&P Greenfield Farms - MERN Stack Web App

A full-stack agricultural marketplace and farming tips platform built with the **MERN stack (MongoDB, Express.js, React, Node.js)**. This platform aims to connect **admins**, **farmers**, and **customers** in a seamless ecosystem that promotes agricultural knowledge, transparency, and commerce.

---

## 🚀 Project Goals

- Empower **farmers** to showcase and sell their products.
- Provide **customers** with a rich browsing and purchasing experience.
- Allow **admins** to post farming tips and manage marketplace ads.
- Enable real-time **chat**, personalized dashboards, and farming guidance.
- Bridge gaps between producers and consumers in the agricultural sector using modern tech.

---

## 🛠️ Tech Stack

| Tech        | Usage                         |
|-------------|-------------------------------|
| React       | Frontend UI                   |
| Tailwind CSS / Shadcn | Styling & UI components    |
| React Router | Page navigation and routing  |
| Node.js     | Backend runtime               |
| Express.js  | API & server                  |
| MongoDB     | Database                      |
| Mongoose    | MongoDB ODM                   |
| JWT & Cookies | Authentication               |
| Axios       | HTTP client                   |

---

## 📦 Features

✅ Role-based login and dashboards  
✅ JWT + Cookie-based Authentication  
✅ Admin-only content and controls  
✅ Farmer product listings & stats  
✅ Customer service browsing and cart  
✅ Chat System with typing indicators  
✅ Farming tips (admin → farmers)  
✅ Hot deals (admin → customers)  
✅ Profile settings and avatar logic  
✅ Clean UI with collapsible sidebar  
✅ Responsive on all screens  

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/greenfield-farms.git
cd greenfield-farms
````

---

### 2. Backend Setup (`/server`)

```bash
cd server
npm install
```

#### 🔑 Create a `.env` file inside `/server` and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Then run:

```bash
npm run dev
```

---

### 3. Frontend Setup (`/client` or root depending on your structure)

```bash
cd client
npm install
npm run dev
```

Make sure the frontend uses `http://localhost:5000` as the base API URL.

---

## 👥 User Roles

| Role     | Access to Features                                  |
| -------- | --------------------------------------------------- |
| Admin    | Manage tips, post hot deals, monitor all activities |
| Farmer   | Access farming tips, post services/products, stats  |
| Customer | View & buy services/products, access hot deals      |

---

## 🔑 Authentication Flow

* Signup/Login via `/api/auth/signup` or `/login`
* Upon login, the backend returns a **JWT token** in a cookie.
* Frontend reads the token and decodes user role → redirects to:

  * `/admin/dashboard`
  * `/farmer/dashboard`
  * `/customer/dashboard`

---

## 📂 Folder Structure Overview

```
greenfield-farms/
├── client/               # React frontend
│   ├── pages/            # All pages by role (dashboards, services, etc)
│   ├── components/       # Sidebar, Navbar, UI elements
│   └── App.jsx           # Main routing logic
├── server/               # Express backend
│   ├── models/           # Mongoose schemas
│   ├── controllers/      # Auth, Admin, etc.
│   ├── routes/           # Route files (auth, admin, etc)
│   └── middleware/       # Auth middleware, role protection
└── README.md             # This file
```

---

## 🧪 Testing Accounts (Optional)

> You can create dummy test users or pre-seed the DB for local testing:

* **Admin**

  * Email: `admin@greenfield.com`
  * Password: `admin123`
* **Farmer**

  * Email: `farmer@greenfield.com`
  * Password: `farmer123`
* **Customer**

  * Email: `customer@greenfield.com`
  * Password: `customer123`

---

## 📮 Contact

For suggestions, bugs, or feedback:
 +254721998079 phone number
---

## 🌱 License

MIT License © 2025 L\&P Greenfield Farms

