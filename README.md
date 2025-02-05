# Employee Management Website

## Project Overview
This Employee Management website allows HR to manage employees' workflows, monitor payment history, and approve payments. Employees can record their work, view payment history, and interact with HR. The website is secure, easy to use, and designed to streamline employee management tasks in any organization.

### Screenshot
![Employee Management Screenshot](./path/to/screenshot.png)

## Technologies Used
- **Frontend:**
  - React JS
  - Tailwind CSS
  - TanStack Table (for table management)
  - React Query (for data fetching)
  - Firebase (for authentication)

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - JWT (for authentication and authorization)

## Core Features
- **Email & Password Authentication**: Secure login and registration system for employees and HR users.
- **Role-based Access Control**: Different roles (Employee, HR, Admin) with specific permissions.
- **Work Recording**: Employees can record their work hours and tasks.
- **Payment History**: Employees can view their salary history and payment details.
- **Employee Management**: HR can manage employee information and approve payments.
- **Salary Management**: Admin can modify salaries and approve payment requests.
- **Responsive Design**: Fully responsive layout that works across devices (desktop, tablet, and mobile).

## Dependencies
- **Frontend:**
  - react
  - react-dom
  - react-router-dom
  - react-query
  - tailwindcss
  - tanstack-table
  - react-datepicker

- **Backend:**
  - express
  - mongoose
  - jsonwebtoken
  - cors
  - dotenv
  - firebase-admin

## Steps to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/aburaihan98/mern-workify-client.git

MONGO_URI=your_mongodb_uri
FIREBASE_ADMIN_SDK=your_firebase_admin_sdk_key
JWT_SECRET=your_jwt_secret

npm install

npm run dev

### Explanation:

1. **Steps to Setup Backend and Frontend**: I've added the exact instructions for setting up both backend and frontend sections with `npm install` for dependencies and a `.env` file for sensitive data.
2. **Environment Variables**: It clearly instructs what to add to the `.env` file (MongoDB URI, Firebase Admin SDK credentials, and JWT secret).
3. **Development Server**: Instructions to start both the backend and frontend server are clear, ensuring they can easily run the application locally.

Make sure to replace placeholder values like `your-username`, `your_mongodb_uri`, `your_firebase_admin_sdk_key`, and `your_jwt_secret` with actual information for your project.


