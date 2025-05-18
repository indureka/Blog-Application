# MERN Blog Application

A multi-user blogging platform built using the MERN stack (MongoDB, Express.js, React, Node.js). Users can register, log in, and create, edit, or delete their own blogs. All authenticated users can view and filter all blogs.

---

## 🚀 Features

- User registration and login (JWT authentication)
- Create, read, update, and delete your own blogs
- View all blogs from all users
- Filter blogs by category and author
- Responsive and user-friendly interface

---

## 🛠️ Getting Started

### 1. **Clone the Repository**

git clone <your-repo-url>
cd blog-app

### 2. **Backend Setup**

cd server
npm install

- Create a `.env` file in the `server` directory:
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


### 3. **Frontend Setup**

cd ../client
npm install


### 4. **Run the Application**

From the root directory:

npm install
npm run dev

- This will start both the backend (Express server) and frontend (React app) concurrently.
- The React app will be available at `http://localhost:5173` (or similar).
- The backend API will run at `http://localhost:5000`.

---

## 🧭 Usage

1. **Sign Up:** Register a new account.
2. **Login:** Log in with your credentials.
3. **Create Blog:** Add a new blog post.
4. **View Blogs:** Browse all blogs. Use filters for category or author.
5. **Edit/Delete:** Edit or delete your own blogs from "My Blogs".

---

## 📦 Tech Stack

- **Frontend:** React, React Router, Tailwind CSS (or your chosen CSS framework)
- **Backend:** Node.js, Express.js, MongoDB Atlas
- **Authentication:** JWT, bcryptjs

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is for educational purposes.

---