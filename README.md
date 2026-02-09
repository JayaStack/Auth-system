# MERN Authentication & Authorization System

A production-ready, interview-defensible authentication and authorization system built with MongoDB, Express, React, and Node.js. This project demonstrates secure password handling, JWT tokens, email verification, role-based access control, and best practices for building scalable applications.

## 📋 Features

### Backend

- ✅ User registration with email validation
- ✅ Secure login with JWT tokens
- ✅ HTTP-only cookie refresh tokens
- ✅ Email verification system
- ✅ Password reset functionality
- ✅ Role-based access control (RBAC)
- ✅ Admin user management
- ✅ Bcrypt password hashing
- ✅ Protected routes middleware
- ✅ CORS and security headers

### Frontend

- ✅ Authentication context with React hooks
- ✅ Protected and admin routes
- ✅ Form validation
- ✅ Auto token refresh with axios interceptors
- ✅ Loading states and error handling
- ✅ Responsive UI with CSS Grid
- ✅ Role-based UI rendering

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Set Up Directories

Run this command to create the project structure:

```bash
# On Windows (run setup-directories.bat)
setup-directories.bat

# Or use Node.js
node setup.js
```

This creates:

```
Project/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

### Step 2: Organize Files

After running setup.js or the bat file, organize the files from the root:

**Backend files to move:**

```
backend-package.json → backend/package.json
backend-server.js → backend/server.js
backend-user-model.js → backend/models/User.js
backend-auth-controller.js → backend/controllers/authController.js
backend-auth-middleware.js → backend/middlewares/auth.js
backend-auth-routes.js → backend/routes/authRoutes.js
backend-admin-routes.js → backend/routes/adminRoutes.js
backend-email-utils.js → backend/utils/email.js
backend-db-config.js → backend/config/database.js
backend-.env.example → backend/.env
```

**Frontend files to move:**

```
frontend-package.json → frontend/package.json
frontend-app.js → frontend/src/App.js
frontend-auth-context.js → frontend/src/context/AuthContext.js
frontend-api-service.js → frontend/src/services/api.js
frontend-protected-routes.js → frontend/src/components/ProtectedRoutes.js
frontend-login-page.js → frontend/src/pages/Login.js
frontend-register-page.js → frontend/src/pages/Register.js
frontend-dashboard-page.js → frontend/src/pages/Dashboard.js
frontend-admin-page.js → frontend/src/pages/AdminDashboard.js
frontend-forgot-password-page.js → frontend/src/pages/ForgotPassword.js
frontend-reset-password-page.js → frontend/src/pages/ResetPassword.js
frontend-verify-email-page.js → frontend/src/pages/VerifyEmail.js
frontend-app-styles.css → frontend/src/App.css
frontend-auth-styles.css → frontend/src/styles/auth.css
frontend-dashboard-styles.css → frontend/src/styles/dashboard.css
frontend-admin-styles.css → frontend/src/styles/admin.css
```

Create additional files:

- `frontend/public/index.html` (see below)
- `frontend/src/index.js` (see below)

### Step 3: Backend Setup

1. **Install dependencies:**

   ```bash
   cd backend
   npm install
   ```

2. **Create `.env` file:**

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/mern-auth
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_this_in_production
   JWT_EXPIRY=15m
   REFRESH_TOKEN_EXPIRY=7d
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password_from_gmail
   CLIENT_URL=http://localhost:3000
   NODE_ENV=development
   ```

3. **Email Configuration (Gmail):**
   - Enable 2-factor authentication on Gmail
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy the generated password into EMAIL_PASS

4. **Start MongoDB:**

   ```bash
   # If using local MongoDB
   mongod

   # Or use MongoDB Atlas cloud database
   ```

5. **Start the backend:**
   ```bash
   npm run dev
   ```
   Backend should run on `http://localhost:5000`

### Step 4: Frontend Setup

1. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   ```

2. **Create `.env` file:**

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Create `public/index.html`:**

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>MERN Authentication System</title>
     </head>
     <body>
       <div id="root"></div>
     </body>
   </html>
   ```

4. **Create `src/index.js`:**

   ```jsx
   import React from "react";
   import ReactDOM from "react-dom/client";
   import App from "./App";
   import "./App.css";

   const root = ReactDOM.createRoot(document.getElementById("root"));
   root.render(
     <React.StrictMode>
       <App />
     </React.StrictMode>,
   );
   ```

5. **Start the frontend:**
   ```bash
   npm start
   ```
   Frontend should run on `http://localhost:3000`

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh-token` - Refresh access token
- `GET /api/auth/profile` - Get user profile (protected)
- `GET /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password

### Admin

- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/users/:id` - Get user by ID (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)
- `PATCH /api/admin/users/:id/role` - Update user role (admin only)

## 🔐 Security Features

1. **Password Hashing**: Bcrypt with salt rounds of 10
2. **JWT Tokens**: Access tokens (15m) + Refresh tokens (7d)
3. **HTTP-Only Cookies**: Refresh tokens stored securely
4. **CORS**: Configured to accept requests only from CLIENT_URL
5. **Email Verification**: Required before login
6. **Password Reset**: Time-limited tokens (1 hour)
7. **Role-Based Access**: Admin-only routes protected
8. **Environment Variables**: Secrets never hardcoded
9. **Input Validation**: Email, password length checks
10. **Unique Constraints**: Email uniqueness enforced at DB level

## 🧪 Testing the System

1. **Register:**
   - Go to http://localhost:3000/register
   - Fill in details and submit
   - Check email for verification link

2. **Email Verification:**
   - Click the verification link in email
   - Redirect to login page

3. **Login:**
   - Enter email and password
   - Access token stored in memory, refresh token in cookie
   - Redirect to dashboard

4. **Dashboard:**
   - View user profile
   - Admin users see admin panel link

5. **Admin Panel:**
   - View all users
   - Change user roles
   - Delete users

6. **Password Reset:**
   - Click "Forgot Password" on login page
   - Enter email
   - Check email for reset link
   - Set new password

## 📁 Project Structure Explained

### Backend

```
backend/
├── config/database.js        # MongoDB connection
├── controllers/
│   └── authController.js     # Auth logic (register, login, etc.)
├── middlewares/
│   └── auth.js               # JWT verification, error handling
├── models/
│   └── User.js               # User schema and methods
├── routes/
│   ├── authRoutes.js         # Auth endpoints
│   └── adminRoutes.js        # Admin endpoints
├── utils/
│   └── email.js              # Email sending utilities
├── server.js                 # Express app setup
├── package.json
└── .env                      # Environment variables
```

### Frontend

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── ProtectedRoutes.js
│   ├── context/
│   │   └── AuthContext.js    # Auth state management
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   │   ├── AdminDashboard.js
│   │   ├── ForgotPassword.js
│   │   ├── ResetPassword.js
│   │   └── VerifyEmail.js
│   ├── services/
│   │   └── api.js            # Axios with interceptors
│   ├── styles/
│   │   ├── auth.css
│   │   ├── dashboard.css
│   │   └── admin.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## 🔄 Authentication Flow

```
1. User Registration
   ↓
2. Email Verification (link sent)
   ↓
3. User Login
   → Access Token (memory) + Refresh Token (HTTP-only cookie)
   ↓
4. Protected Route Access
   → Attach access token to requests
   → If expired, use refresh token to get new access token
   ↓
5. Dashboard Access
   ↓
6. Logout
   → Clear tokens
```

## 💡 Key Concepts Implemented

### JWT Strategy

- **Access Token**: Short-lived (15 min), used for API requests
- **Refresh Token**: Long-lived (7 days), used to get new access token
- **Storage**: Access token in memory (safe), refresh token in HTTP-only cookie

### Context API

- Global auth state management
- User data, tokens, loading, error states
- Methods: register, login, logout, forgotPassword, resetPassword, verifyEmail

### Protected Routes

- `PrivateRoute`: Redirects to /login if not authenticated
- `AdminRoute`: Redirects to /dashboard if not admin
- `PublicRoute`: Redirects to /dashboard if already authenticated

### Email Service

- Uses Nodemailer with Gmail
- HTML templates for verification and password reset
- Includes links with security tokens

## 🚨 Common Issues & Solutions

**Issue: MongoDB connection fails**

- Ensure MongoDB is running (mongod)
- Check MONGO_URI in .env matches your setup
- For Atlas, whitelist your IP

**Issue: Emails not sending**

- Enable 2FA on Gmail
- Generate app password correctly
- Use 16-character app password
- Check EMAIL_USER and EMAIL_PASS in .env

**Issue: CORS errors**

- Ensure CLIENT_URL in backend .env matches frontend URL
- Check credentials: true in axios config

**Issue: Token refresh fails**

- Ensure refresh token cookie is being set
- Check browser cookie settings (HttpOnly enabled)
- Verify REFRESH_TOKEN_EXPIRY format (e.g., "7d")

## 📦 Dependencies

### Backend

- express: Web framework
- mongoose: MongoDB ODM
- jsonwebtoken: JWT handling
- bcryptjs: Password hashing
- nodemailer: Email sending
- cors: Cross-origin requests
- dotenv: Environment variables
- cookie-parser: Parse cookies

### Frontend

- react: UI library
- react-router-dom: Routing
- axios: HTTP client
- react-scripts: Build tooling

## 🔧 Customization

### Change JWT Expiry

Edit `backend/.env`:

```env
JWT_EXPIRY=30m          # Access token duration
REFRESH_TOKEN_EXPIRY=14d # Refresh token duration
```

### Add New Admin User

In MongoDB, manually update a user:

```javascript
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } });
```

### Customize Email Templates

Edit `backend/utils/email.js` HTML templates

### Change UI Colors

Edit CSS files in `frontend/src/styles/`

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author Notes

This is a production-ready authentication system suitable for:

- Portfolio projects
- Interview demonstrations
- Starting point for larger applications
- Teaching authentication concepts

The code follows best practices for:

- Security (password hashing, JWT, environment variables)
- Code organization (MVC pattern)
- Error handling (try-catch, validation)
- User experience (loading states, error messages)

## 🤝 Support

For issues or questions:

1. Check the Common Issues section
2. Review the code comments
3. Verify environment variables
4. Check MongoDB/Gmail configurations

---

**Happy coding!** 🚀
