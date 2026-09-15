# RentNest - Rental Marketplace Frontend

RentNest is a modern rental marketplace web application where tenants can browse properties, submit rental requests, make payments, and manage their rental history. Landlords can manage their properties and rental requests through a dedicated dashboard.

This project is the frontend implementation of **Assignment 5**, built with Next.js and TypeScript and connected to the RentNest backend API.

---

## 🚀 Live Demo

**Frontend:**  
(https://rentnest-app-theta.vercel.app/)

**Backend API:**  
https://project-a4-taupe.vercel.app/api

---

## 📦 Repository

**Frontend Repository:**  
Add your GitHub repository URL here.

---

## 🛠️ Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- TanStack Query
- Axios
- React Hot Toast
- JWT Authentication
- Stripe Checkout
- Next.js App Router

---

## ✨ Features

### 👤 Public Features

- Browse available rental properties
- Search properties by location
- Filter properties by:
  - Price range
  - Property type
  - Amenities
- View detailed property information
- View landlord information
- Responsive property listing UI
- Loading and error states

---

### 🏠 Tenant Features

- Tenant registration
- Tenant login
- JWT-based authentication
- Browse properties
- View property details
- Submit rental requests
- Specify move-in date
- Add a message with rental requests
- View rental request history
- View request status:
  - Pending
  - Approved
  - Rejected
- Pay rent for approved rental requests
- Stripe payment integration
- Payment history
- Payment success page
- Payment cancellation page
- Tenant dashboard

---

### 🏢 Landlord Features

- Landlord dashboard
- View landlord statistics
- View owned properties
- Create new properties
- Edit existing properties
- Delete properties
- Change property availability
- View incoming rental requests
- Approve rental requests
- Reject rental requests
- Toast notifications for actions

---

### 👨‍💼 Admin Features

- Admin dashboard
- User management
- User search
- User status management
- Ban/unban functionality

---

## 🔐 Authentication

The application uses JWT-based authentication.

After successful login, the frontend stores the authentication information and uses the access token when making protected API requests.

Protected functionality includes:

- Tenant rental requests
- Tenant payment creation
- Landlord property management
- Landlord rental request management
- Admin functionality

---

## 💳 Payment

RentNest uses Stripe Checkout for rent payments.

The payment flow is:

```text
Tenant Dashboard
       ↓
Approved Rental Request
       ↓
Pay Rent
       ↓
Backend creates Stripe Checkout Session
       ↓
Stripe Checkout
       ↓
Payment Success / Cancel
