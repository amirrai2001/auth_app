'use client';

import React from 'react';

const DocumentationPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Role-Based Management Admin Panel Documentation</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Overview</h2>
        <p className="mb-2">
          This project is a full-stack application built as an admin panel with role-based functionalities. The application supports three roles:
        </p>
        <ul className="list-disc list-inside mb-2">
          <li><strong>Admin:</strong> Can manage users, products, and view all orders.</li>
          <li><strong>Manager:</strong> Can view team orders and manage team members.</li>
          <li><strong>Employee:</strong> Can place orders and add items to a cart.</li>
        </ul>
        <p>
          The backend is built with Node.js, Express, and MongoDB (via Mongoose), and uses JWT for authentication. The frontend is built with Next.js (using the App Router) in TypeScript, React Context for state management, and PrimeReact for UI components.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Backend Architecture</h2>
        <p className="mb-2">
          <strong>Folder Structure:</strong>
        </p>
        <pre className="bg-gray-100 p-4 rounded mb-2">
{`backend/
├── public/
│   └── uploads/            # Uploaded images are stored here
├── config/
│   └── multer.js           # Multer configuration for file uploads
├── controllers/
│   ├── auth.controller.js  # Handles authentication (login, register, logout)
│   ├── user.controller.js  # CRUD operations for users
│   ├── product.controller.js  # CRUD for products (create, update, get all)
│   └── order.controller.js  # Order creation and status management
├── middleware/
│   ├── auth.middleware.js  # JWT authentication and role-based access control
│   └── ...                 # Other middleware
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── product.routes.js
│   ├── order.routes.js
│   └── upload.js           # Handles image uploads via Multer
└── server.js               # Entry point: connects to MongoDB and starts the server
`}
        </pre>
        <p className="mb-2">
          <strong>Key Features:</strong>
        </p>
        <ul className="list-disc list-inside">
          <li><strong>Authentication:</strong> Uses JWT stored in HttpOnly cookies. Authentication middleware extracts the token from headers or cookies.</li>
          <li><strong>Role-Based Access Control:</strong> Custom middleware (e.g., <code>restrictTo</code>) ensures that only users with the correct roles can access certain routes.</li>
          <li><strong>File Upload:</strong> Uses Multer to handle image uploads which are stored in <code>public/uploads</code>.</li>
          <li><strong>Data Models:</strong> Mongoose models for Users, Products, and Orders with necessary relationships (e.g., manager and team members).</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Frontend Architecture</h2>
        <p className="mb-2">
          The frontend is built using Next.js (App Router) with TypeScript and uses React Context to manage global authentication state.
        </p>
        <p className="mb-2">
          <strong>Folder Structure:</strong>
        </p>
        <pre className="bg-gray-100 p-4 rounded mb-2">
{`app/
├── layout.tsx                 # Global layout wrapping the app with AuthProvider
├── documentation/
│   └── page.tsx               # This documentation page
├── products/
│   ├── page.tsx               # Lists all products with role-based actions
│   └── edit/
│       └── [id]/page.tsx      # Edit product page
├── orders/
│   └── page.tsx               # Lists orders based on user role (admin: all, manager: team, employee: my-orders)
├── member/
│   ├── add/page.tsx           # Add new user (admin only)
│   ├── list/page.tsx          # List users
│   └── edit/[id]/page.tsx     # Edit user details
└── ...                        # Other pages and components
`}
        </pre>
        <p className="mb-2">
          <strong>Key Features:</strong>
        </p>
        <ul className="list-disc list-inside">
          <li><strong>Role-Based Routing:</strong> Using a custom <code>RestrictWrapper</code> component, routes or sections of pages are only accessible to users with specific roles.</li>
          <li><strong>UI Components:</strong> PrimeReact DataTable, Dropdown, Toast, and other components provide a clean and responsive interface.</li>
          <li><strong>Image Handling:</strong> Product images are uploaded via a dedicated API and displayed using Next.js <code>Image</code> component.</li>
          <li><strong>Notifications:</strong> Toasts are used to provide immediate feedback for actions such as adding to cart, order creation, and user updates.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Usage and Navigation</h2>
        <p className="mb-2">
          The application is designed to dynamically render navigation menus based on the logged-in user's role. For instance:
        </p>
        <ul className="list-disc list-inside mb-2">
          <li><strong>Admin:</strong> Can view all orders, manage users, and edit products.</li>
          <li><strong>Manager:</strong> Sees team orders and can manage team members.</li>
          <li><strong>Employee:</strong> Can place orders (add to cart) and view their own orders.</li>
        </ul>
        <p>
          A global logout button clears the authentication cookie and redirects the user to the login page.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Project Setup</h2>
        <ol className="list-decimal list-inside mb-2">
          <li>Clone the repository.</li>
          <li>Install backend dependencies: <code>npm install</code> in the backend folder.</li>
          <li>Create a <code>.env</code> file in the backend with variables like <code>MONGO_URI</code>, <code>JWT_SECRET</code>, and <code>PORT</code>.</li>
          <li>Run the backend server: <code>node src/server.js</code> or <code>npm run dev</code>.</li>
          <li>Install frontend dependencies: <code>npm install</code> in the Next.js app folder.</li>
          <li>Run the frontend: <code>npm run dev</code>.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Conclusion</h2>
        <p>
          This project demonstrates a full-stack approach to building a role-based management admin panel. It integrates secure authentication, dynamic routing based on user roles, responsive UI components, and file uploads for product images. The code is modular, and despite some compromises due to time constraints, the structure is scalable and maintainable.
        </p>
      </section>
    </div>
  );
};

export default DocumentationPage;
