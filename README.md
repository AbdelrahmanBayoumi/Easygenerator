# Full Stack Authentication App

This is a **full-stack authentication module** built using **NestJS (backend)** and **React (frontend)**. It includes **user signup, login, protected routes, and authentication** using JWT.

---

## **📌 Features**
✅ User authentication (signup, login, JWT authentication)  
✅ Form validation (email, name, password rules)  
✅ Protected dashboard page (requires authentication)  
✅ Token-based authentication (stored in localStorage)  
✅ Full-stack best practices with TypeScript  
✅ UI with **React, React Hook Form, Zod, and Tailwind CSS**  
✅ Backend using **NestJS, MongoDB, JWT, and Bcrypt**  

---

## **🛠 Tech Stack**
### **Frontend (React)**
- React + TypeScript
- React Router
- React Hook Form & Zod (Validation)
- Axios (API requests)
- Tailwind CSS (UI styling)

### **Backend (NestJS)**
- NestJS + TypeScript
- MongoDB (Database)
- Mongoose (ORM)
- JWT (Authentication)
- Bcrypt (Password Hashing)

---

## **📂 Folder Structure**
```
project-root/           # Main project folder
│── frontend/           # React frontend
│── backend/            # NestJS backend
│── README.md           # Project documentation (this file)
│── .gitignore          # Git ignore unnecessary files
```

### **Frontend (`/frontend`)**
```
frontend/
│── src/
│   │── pages/          # Signup, Signin, Dashboard
│   │── components/     # UI elements
│   │── App.tsx        # Routes setup
│   │── index.tsx       # Entry point
│   │── index.css      # Global styles (Tailwind)
│── package.json       # Dependencies & scripts
│── tsconfig.json      # TypeScript config
```

### **Backend (`/backend`)**
```
backend/
│── src/
│   │── auth/           # Authentication module (Signup, Signin)
│   │── main.ts         # Entry point
│── package.json       # Dependencies & scripts
│── tsconfig.json      # TypeScript config
│── .env               # Environment variables (DB, JWT secret)
```

---

## **🚀 Setup & Installation**

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/AbdelrahmanBayoumi/Easygenerator.git
cd your-repo
```

---

## **🖥 Backend Setup (`/backend`)**

### **1️⃣ Install dependencies**
```sh
cd backend
npm install
```

### **2️⃣ Create a `.env` file in `/backend` and add:**
```env
MONGO_URI=mongodb://localhost:27017/authapp
JWT_SECRET=your_secret_key
JWT_EXPIRES=15m
```

### **3️⃣ Run the backend server**
```sh
npm run start:dev
```
**Backend will be running at:** `http://localhost:3000`

---

## **🌐 Frontend Setup (`/frontend`)**

### **1️⃣ Install dependencies**
```sh
cd frontend
npm install
```

### **2️⃣ Start the frontend**
```sh
npm start
```
**Frontend will be running at:** `http://localhost:5173` (Vite) or `http://localhost:3000` (CRA)

---

## **📡 API Endpoints**
### **Auth Routes (`/auth`)**
| Method | Endpoint      | Description     |
|--------|-------------|----------------|
| POST   | `/auth/signup` | Register user |
| POST   | `/auth/signin` | Login user    |
| GET   | `/auth/me` |  User data    |


---

## **📜 How to Use**
1. **Open** `http://localhost:5173` (Frontend)
2. **Signup** with a valid email, name, and password.
3. **Login** to receive a JWT token.
4. **Access Dashboard** (protected route).
5. **Logout** to clear the session.

---

## **✅ Best Practices Followed**
✔ Secure authentication with **JWT**  
✔ **Password hashing** using bcrypt  
✔ **API validation** for user inputs  
✔ **React Hook Form** + Zod validation  
✔ **Modular NestJS structure** for maintainability  
✔ **Environment variables** for secrets  
✔ **Tailwind CSS** for styling  

---

## **📌 To-Do (Optional Enhancements)**
🔹 Add forgot password functionality  
🔹 Setup unit tests for backend & frontend  

