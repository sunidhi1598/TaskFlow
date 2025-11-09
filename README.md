# TaskFlow - Task Management App

A full-stack MERN application for managing tasks with user authentication.

## 🚀 Live Demo

- **Frontend:** https://taskflowmernproject1.netlify.app/
- **Backend API:** https://taskflow-czdi.onrender.com/
- **GitHub:** https://github.com/sunidhi1598/TaskFlow

## ✨ Features

- User registration and login with JWT authentication
- Create, edit, and delete tasks
- Mark tasks as complete or pending
- Filter tasks by status (All, Completed, Pending)
- Responsive design with Tailwind CSS

## 🛠️ Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router, Axios  
**Backend:** Node.js, Express, MongoDB, JWT, bcrypt  
**Deployment:** Netlify (Frontend), Render (Backend)

## 📦 Installation

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Add your MONGO_URI and JWT_SECRET
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Add your VITE_API_URL
npm run dev
```

## 🌐 API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tasks (Protected)
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/status` - Toggle status

## 📁 Project Structure
```
taskflow-mern/
├── backend/          # Express API server
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
├── frontend/         # React application
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── utils/
│   └── ...
└── README.md
```

## 🔐 Environment Variables

**Backend (.env)**
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://taskflowmernproject.netlify.app
```

**Frontend (.env)**
```env
VITE_API_URL=https://taskflow-czdi.onrender.com/api
```

## 👤 Author

**Sunidhi**  
GitHub: [@sunidhi1598](https://github.com/sunidhi1598)

## 📄 License

MIT License - feel free to use this project for learning!

---


Built with ❤️ using MERN Stack
