# Employee Management Website
Employee Management Website with authentication, roles (Employee, HR, Admin), and workflows. The dashboard allows HR to monitor employee tasks, salaries, and payment history. Employees can add tasks, track hours, and view their salary history. Admins can manage users, assign HR roles, and approve payments. The project uses JWT for role-based access, integrates a payment gateway, and ensures responsiveness across devices.

### Screenshot

# ![EquiSports Screenshot](https://i.postimg.cc/3Nj9DnfZ/Screenshot-55.png)

## Live link
https://workify-3061a.web.app

## Core Features

- **Email & Password Authentication**: Secure login and registration system for employees and HR users.
- **Role-based Access Control**: Different roles (Employee, HR, Admin) with specific permissions.
- **Work Recording**: Employees can record their work hours and tasks.
- **Payment History**: Employees can view their salary history and payment details.
- **Employee Management**: HR can manage employee information and approve payments.
- **Salary Management**: Admin can modify salaries and approve payment requests.
- **Responsive Design**: Fully responsive layout that works across devices (desktop, tablet, and mobile).

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

## **How to Run the Project Locally**

### Prerequisites

- Node.js
- MongoDB instance
- Firebase credentials (for authentication)

## Steps to Run Locally

### 1. Clone this repository -

git clone https://github.com/aburaihan98/mern-workify-client.git

### 2. Go to the cloned project directory

cd mern-workify-client

### 3. Just run this command to install node dependencies

npm install

### 4. Just run this command

npm run dev

