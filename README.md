# Premium Kids Toys Ecommerce Web Application

A full-stack MERN ecommerce application built for a kids' toys store, developed as part of a technical assignment for **Aurus IT Solutions**. The project covers the complete customer journey — browsing, cart, wishlist, checkout, and payment — along with authentication and order management.

**Live Demo:** https://premium-kids-toys-ecommerce-hheq.vercel.app
**Backend API:** https://premium-kids-toys-ecommerce-1.onrender.com

---

## Tech Stack

**Frontend**
- React.js (Vite)
- React Router
- Redux Toolkit
- Axios
- Tailwind CSS
- React Hot Toast (notifications)
- Lucide React (icons)

**Backend**
- Node.js / Express
- MongoDB (Mongoose)
- JWT Authentication (httpOnly cookies)
- Bcrypt.js (password hashing)
- Razorpay Payment Gateway

**Deployment**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Features

### Authentication
- User registration & login with hashed passwords (bcrypt)
- JWT stored in httpOnly, secure, cross-site cookies (`SameSite=None`)
- Persistent login via profile auto-fetch on app load
- Protected routes and auth-aware redirects

### Shopping Experience
- Modern, responsive landing page
- Product listing with categories, search & filters
- Product details page
- Shopping cart (Redux-managed)
- Wishlist (add/remove favorite items)

### Checkout & Payments
- Multi-step checkout flow with shipping address collection
- Razorpay integration for secure payments (order creation + signature verification)
- Stock validation at order time
- Order history & tracking

### User Account
- Profile management (view/update name, email)
- Role-based fields (`user` / `admin`) driving access to the admin panel

### Admin Panel
- Dashboard overview
- Product management (add/edit/list)
- Order management

### Engineering Practices
- Reusable, composable React components (`Button`, `Loader`, etc.)
- Centralized Axios instance with response interceptors (global error toasts, 401 redirect handling)
- Form validation on both client and server
- Loading states/skeletons for async operations
- Fully responsive design (mobile, tablet, desktop)
- CORS configured for cross-origin cookie-based auth (Vercel ↔ Render)

---

## Project Structure

```
kids-toys-ecommerce/
├── client/                       # React frontend (Vite)
│   ├── public/                   # Static assets (favicon, icons)
│   ├── src/
│   │   ├── api/                  # Axios instance (axios.js)
│   │   ├── app/                  # Redux store (store.js)
│   │   ├── assets/                # Images
│   │   ├── components/
│   │   │   ├── admin/             # Admin dashboard components
│   │   │   ├── common/            # Reusable UI components (Button, Loader, etc.)
│   │   │   ├── home/               # Landing page components
│   │   │   ├── layout/             # Header/Footer/layout wrappers
│   │   │   └── product/            # Product-related components
│   │   ├── features/               # Redux slices & thunks
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── cart/
│   │   │   ├── order/
│   │   │   ├── product/
│   │   │   └── shipping/
│   │   ├── hooks/                  # Custom hooks (useDebounce, etc.)
│   │   ├── layouts/                # MainLayout wrapper
│   │   ├── pages/
│   │   │   ├── admin/               # Admin Dashboard, Orders, Products, Edit
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Payment.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   └── Wishlist.jsx
│   │   ├── routes/                  # AppRoutes.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vercel.json
│   └── vite.config.js
└── server/                          # Express backend
    ├── config/
    │   └── db.js                     # MongoDB connection
    ├── controllers/
    │   ├── authController.js
    │   ├── orderController.js
    │   └── productController.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── errorMiddleware.js
    ├── models/
    │   ├── Order.js
    │   ├── Product.js
    │   └── User.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── orderRoutes.js
    │   └── productRoutes.js
    ├── seed.js
    └── server.js
```

---

## Environment Variables

**Server (`server/.env`)**
```
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
CLIENT_URL=<frontend_deployed_url>
RAZORPAY_KEY_ID=<your_razorpay_key_id>
RAZORPAY_KEY_SECRET=<your_razorpay_key_secret>
```

**Client (`client/.env`)**
```
VITE_API_URL=<backend_deployed_url>/api
VITE_RAZORPAY_KEY_ID=<your_razorpay_key_id>
```

---

## Getting Started Locally

```bash
# Clone the repository
git clone <repo-url>
cd kids-toys-ecommerce

# Backend setup
cd server
npm install
npm run dev

# Frontend setup (in a new terminal)
cd client
npm install
npm run dev
```

The client runs on `http://localhost:5173` and the server on `http://localhost:5000`.

---

## Notes

- Payment gateway is integrated in **Razorpay test mode**. Full KYC/activation is pending on the Razorpay account, so UPI is currently disabled in checkout (Cards, Netbanking, and Wallet are fully functional and tested).

---

## Author

**Saurabh Singh**
MERN Stack Developer