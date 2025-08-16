
# Multivendor Marketplace

A **modern multivendor e-commerce platform** built with **Next.js, TailwindCSS, Node.js, Socket.IO, and Stripe Connect**.  
This project provides a scalable and modular architecture where multiple shops can sell products, users can browse and order seamlessly, and the platform ensures **secure payments, real-time communication, and robust role-based access control**.

---

## Features

### Core Features

- **Role-Based Access Control (RBAC)**

  - **Super Admin** → Manages shops, approves/rejects vendors, monitors the system.
  - **Shop Owners** → Manage products, events, and communicate with users.
  - **Users** → Browse, filter, and order products; manage their profile and orders.

- **Shops Management**

  - Shop creation and approval workflow (by Admin).
  - Individual dashboards for each shop.

- **Products CRUD**

  - Create, update, and manage products.
  - Filtering and search for better user experience.

- **Events**
  - Shops can create events (e.g., sales, wholesale offers).
  - Users can view event-driven promotions.

---

### Payment with **Stripe Connect**

- Vendor payouts handled securely via **Stripe Connect**.
- Marketplace commissions managed automatically.
- Integrated with **order lifecycle** for real-world e-commerce workflows.


---

### Real-Time Communication with **Socket.IO**

- **Shop ↔ User Messaging System**.
- Enables faster order clarifications, support, and negotiations.
- Secure channels ensuring only relevant parties communicate.

---

### User Features

- Order history & tracking.
- Profile management (update info, change password).
- Event participation and product browsing.

---

## Tech Stack

### Frontend

- **Next.js** – Server-side rendering & routing.
- **TailwindCSS** – Modern utility-first styling.

### Backend

- **Node.js + Express** – REST API for core business logic.
- **Socket.IO** – Real-time communication.
- **Stripe Connect** – Secure vendor payments & commissions.

### Database

- MongodDB.

