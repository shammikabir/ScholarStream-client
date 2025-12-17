# 🎓 ScholarStream – Scholarship Management Platform

ScholarStream is a full-stack MERN application that connects students with global scholarship opportunities. It provides a secure, role-based system for searching, applying, reviewing, and managing scholarships in a centralized platform.

---

## 🔗 Live & Repositories

- **Live Site:** https://your-live-site-link.com
- **Server:** https://github.com/your-username/scholarstream-server

---

## 🎯 Project Purpose

ScholarStream simplifies the scholarship application process by allowing students to discover and apply for scholarships easily, while enabling moderators and admins to efficiently manage applications, users, and platform data.

---

## 🚀 Core Features

### 🔐 Authentication & Security

- Firebase Authentication (Email/Password + Google)
- JWT-based API protection
- Role-based authorization (Student / Moderator / Admin)
- Reload-safe private routes

### 🏠 Public Pages

- Home page with banner, top scholarships & Framer Motion animation
- All Scholarships with **server-side search, filter, sort & pagination**
- Scholarship details with reviews
- Custom 404 page

### 💳 Payment System

- Stripe checkout integration
- Payment success & failure handling
- Retry payment from dashboard
- Application saved with paid/unpaid status

---

## 🧑‍💻 Dashboards (Role-Based)

### Student

- View & manage applications
- Pay application fees
- Receive moderator feedback
- Add & manage reviews

### Moderator

- Review applications
- Update status & provide feedback
- Reject applications
- Moderate reviews

### Admin

- Manage users & roles
- Add / update / delete scholarships
- View analytics (users, fees, scholarships)
- Charts for data visualization

---

## 🗂️ Database Collections (Mongodb Atlas)

- Users
- Scholarships
- Applications
- Reviews

---

## ⚙️ Technology Stack

**Frontend:** React, JavaScript, Tailwind CSS, Framer Motion  
**Backend:** Node.js, Express.js, MongoDB, JWT Token Verification
**Auth & Payment:** Firebase, Stripe  
**Tools:** TanStack Query, Axios, Recharts

---
