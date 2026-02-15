# 🎓 Online Learning Platform

A modern **Online Learning Platform** built with **React (v19)**, **Vite**, and **Tailwind CSS**, designed for learners and instructors to create, manage, and enroll in online courses.  
It includes features like user authentication (Firebase), course management, enrollment tracking, ratings, reviews, and progress visualization — all wrapped in a sleek, responsive UI.

---

## Features

### Frontend

- **React 19 + Vite** — fast, modern, and lightweight.
- **Tailwind CSS + DaisyUI** — fully responsive UI with customizable themes.
- **Framer Motion** — smooth animations and transitions.
- **Lucide React & React Icons** — clean and consistent iconography.
- **Recharts** — interactive data visualization (student progress, stats).
- **AOS (Animate on Scroll)** — modern scroll-based animations.
- **React Toastify** — user-friendly toast notifications.
- **SweetAlert2** — elegant alerts and confirmation dialogs.

### Backend / API Integration

- **Axios** — for making API requests.
- **Firebase Authentication** — secure login, signup, and user management.
- **MongoDB (via Express server)** — course and user data storage (optional integration).

---

## Project Structure

online-learning-platform/
├── public/
├── src/
│ ├── assets/ # Images and icons
│ ├── components/ # Reusable UI components
│ ├── context/ # Context providers (Auth, Axios, etc.)
│ ├── pages/ # Page components (Courses, Dashboard, etc.)
│ ├── App.jsx # Root component with routing
│ ├── main.jsx # Entry point
│ └── index.css # TailwindCSS and global styles
├── .eslintrc.json # ESLint config
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md

---

## Tech Stack

| Category             | Technologies Used                                 |
| -------------------- | ------------------------------------------------- |
| **Frontend**         | React 19, React Router 7, Tailwind CSS 4, DaisyUI |
| **Animations**       | Framer Motion, AOS                                |
| **State Management** | React Context API                                 |
| **API & Data**       | Axios, Firebase                                   |
| **Charts**           | Recharts                                          |
| **UI Enhancements**  | SweetAlert2, React Toastify                       |
| **Build Tool**       | Vite                                              |
| **Linting**          | ESLint 9                                          |

