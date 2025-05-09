# 🎓 StudentOps – Student Dashboard

A responsive and modern student management dashboard built with React and Firebase.  
Easily manage students, filter by course, and securely add new students — all in one place.

---

## 🚀 Features

- 📋 **View & Filter Students** – Instantly filter students by course using mock API
- 🔐 **Secure Authentication** – Firebase login system to protect actions like adding students
- ➕ **Add Students** – Submit student data via a validated form
- 📱 **Responsive UI** – Mobile-friendly and adaptable design for all screen sizes

---

## 🛠 Tech Stack

| Frontend      | Backend / Auth     | API            | Styling           |
|---------------|--------------------|----------------|-------------------|
| React.js      | Firebase Auth      | Axios (Mock)   | CSS (Responsive)  |

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/student-dashboard.git
cd student-dashboard
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Configuration

* Create a new project at [Firebase Console](https://console.firebase.google.com/)
* Enable **Email/Password Authentication**
* Create a `.env` file in the root directory and add your Firebase config:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
```

### 4. Run the Development Server

```bash
npm start
```

---

## 📁 Project Structure

```markdown

📦 Student Dashboard
├── 📁 public
│   └── robots.txt
├── 📁 src
│   ├── 📁 components (ProtectedRoute, layout/)
│   ├── 📁 contexts (AuthContext)
│   ├── 📁 hooks (custom hooks like use-mobile)
│   ├── 📁 lib (firebase config, utils)
│   ├── 📁 pages (Dashboard, StudentList, AddStudent, Login)
│   ├── 📁 services (Firebase + Mock API)
│   ├── App.tsx
│   └── main.tsx
├── .env
├── index.html
├── package.json
├── tailwind.config.ts
└── vite.config.ts

```


## 📸 Screenshots

> ![image](https://github.com/user-attachments/assets/2dbe8a23-1044-4798-8dfa-7ce08b475b2f)

---

## 🧑‍💻 Author

**Tanishi Rai** – [@tanishirai](https://github.com/tanishirai)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙌 Acknowledgements

* Firebase
* Axios
* React Community
* Open Source Inspiration

---
