# 📚 Challenge 18: MERN Book Search Engine (GraphQL Edition)

## 🔍 Overview
This project is a full-stack MERN (MongoDB, Express, React, Node) application refactored from a RESTful API to a fully integrated **GraphQL API** using **Apollo Server**. Users can search for books via the Google Books API, create an account, log in, and save books to their personal list.

The application features modern UI interactions using **React**, persistent user authentication using **JWT**, and data management with **MongoDB Atlas**.

---

## 🚀 Live Demo
- 🌐 Frontend: [Live Site URL Here]
- 🔗 Backend GraphQL Endpoint: [https://your-backend.onrender.com/graphql](#)

---

## 🧩 Technologies Used
- MongoDB Atlas
- Express.js
- React (w/ Vite)
- Node.js
- Apollo Server (GraphQL)
- Mongoose
- JWT (jsonwebtoken)
- Bootstrap

---

## 🧠 User Story
```md
AS AN avid reader
I WANT to search for new books to read
SO THAT I can keep a list of books to purchase
```

---

## ✅ Features & Functionality
- 🔎 Search for books using the Google Books API
- 🔐 Sign up and log in securely
- ✅ Save or remove books from your personal list
- 📄 View your saved books on a dedicated profile page
- 📡 Communicate with backend entirely through GraphQL queries/mutations

---

## 📂 Project Structure
```bash
├── client/                  # React Frontend
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Main views (Search, SavedBooks)
│       ├── utils/           # Apollo queries, mutations, auth helpers
│       └── App.tsx          # ApolloProvider and Router setup
│
├── server/                  # Express Backend + Apollo Server
│   ├── schemas/             # typeDefs and resolvers
│   ├── models/              # Mongoose models (User, Book)
│   ├── services/            # JWT Auth service
│   └── server.ts            # Apollo + Express config
```

---

## ⚙️ Environment Variables
Create a `.env` file in the `server/` directory:
```env
MONGODB_URI=your-mongodb-uri
JWT_SECRET_KEY=your-secret-key
```

And a `.env` file in the `client/` directory:
```env
VITE_GRAPHQL_URI=https://your-backend.onrender.com/graphql
```

---

## 🔧 Installation
### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

---

## 🧪 GraphQL Example Queries
### 🔐 Login
```graphql
mutation {
  login(email: "test@example.com", password: "password") {
    token
    user {
      username
      email
    }
  }
}
```

### 📚 Save Book
```graphql
mutation {
  saveBook(bookData: {
    bookId: "12345"
    title: "Test Book"
    authors: ["Author Name"]
    description: "This is a test book."
    image: "https://image.url"
    link: "https://book.link"
  }) {
    username
    savedBooks {
      title
    }
  }
}
```

---

## 📸 Screenshot
_Add a screenshot of the app UI here_

---

## 👨‍💻 Author
- GitHub: [Amarrero0215](https://github.com/Amarrero0215)

---

## 📜 License
This project is licensed under the MIT License.

