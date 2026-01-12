# 🚀 Modern Portfolio Website

A professional full-stack portfolio website built with the MERN stack, featuring a powerful admin dashboard for dynamic content management and a stunning, recruiter-friendly UI.

## ✨ Features

### 🎨 Frontend
- **Responsive Design** - Fully responsive across all devices
- **Dark Mode** - Seamless light/dark theme switching
- **Modern UI** - Premium gradient designs with smooth animations
- **Interactive Components** - Animated cards, hover effects, and transitions
- **Show More/Less** - Pagination for projects, experience, and certifications
- **Search & Filter** - Advanced project filtering by technology
- **Contact Form** - Integrated email functionality

### 🔐 Admin Dashboard
- **JWT Authentication** - Secure login system
- **Content Management** - Full CRUD operations for:
  - Projects (with image upload)
  - Skills & Proficiency levels
  - Work Experience
  - Education
  - Certifications
  - Bio & Social Links
- **File Uploads** - Direct image upload for projects and profile
- **Custom Toast Notifications** - Beautiful success/error messages
- **Password Management** - Change password functionality

### 🛠️ Technical Features
- **RESTful API** - Clean and organized backend architecture
- **MongoDB Database** - Efficient data storage
- **File Upload** - Multer integration for image handling
- **Email Service** - Nodemailer for contact form submissions
- **Token-Based Auth** - Secure JWT implementation
- **Error Handling** - Comprehensive error middleware

## 🎯 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Helmet** - SEO optimization

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Multer** - File upload handling
- **Nodemailer** - Email service
- **bcryptjs** - Password hashing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Clone Repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

```

### Server Setup
```bash
cd server
npm install

# Create .env file with the following variables:
# PORT=5000
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key
# EMAIL_USER=your_email@gmail.com
# EMAIL_PASS=your_email_app_password
# ADMIN_EMAIL=admin_notification_email@gmail.com

# Run the initial setup (creates admin user)
node setup.js

# Start the server
npm start
```

### Client Setup
```bash
cd client
npm install
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 🔑 Default Admin Credentials

After running `node setup.js`, use these credentials to login:
- **Email**: admin@example.com
- **Password**: admin123

⚠️ **Important**: Change these credentials immediately after first login!

## 📂 Project Structure

```
portfolio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── WorkExperience.jsx
│   │   │   ├── Certifications.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   ├── ManageProjects.jsx
│   │   │   ├── ManageBio.jsx
│   │   │   ├── ManageContacts.jsx
│   │   │   ├── ManageExperienceCertifications.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── CustomToast.jsx
│   │   │   └── DarkModeToggle.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── context/       # React context
│   │   │   └── ThemeContext.jsx
│   │   ├── utils/         # Utility functions
│   │   │   └── api.js
│   │   └── assets/        # Images and static files
│   └── public/
├── server/                # Express backend
│   ├── config/           # Configuration files
│   │   ├── db.js
│   │   └── email.js
│   ├── controllers/      # Route controllers
│   │   ├── authController.js
│   │   ├── bioController.js
│   │   ├── projectController.js
│   │   └── contactController.js
│   ├── middleware/       # Custom middleware
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── upload.js
│   ├── models/           # Mongoose models
│   │   ├── User.js
│   │   ├── Bio.js
│   │   ├── Project.js
│   │   └── Contact.js
│   ├── routes/           # API routes
│   │   ├── authRoutes.js
│   │   ├── bioRoutes.js
│   │   ├── projectRoutes.js
│   │   └── contactRoutes.js
│   ├── uploads/          # Uploaded files
│   └── server.js         # Entry point
└── README.md
```

## 🔧 Environment Variables

### Server (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_super_secret_jwt_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
ADMIN_EMAIL=admin@example.com
```

### Client (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📸 Screenshots

### Home Page
- Hero section with animated profile
- Skills showcase with proficiency indicators
- Featured projects with search/filter
- Work experience timeline
- Certifications gallery

### Admin Dashboard
- Projects management with image upload
- Bio and social links editor
- Skills and proficiency management
- Experience and education editor
- Password change functionality

## 🚀 Deployment

### Backend (Railway/Render/Heroku)
1. Set environment variables
2. Update MongoDB URI to production database
3. Deploy from GitHub repository

### Frontend (Vercel/Netlify)
1. Build command: `npm run build`
2. Output directory: `dist`
3. Set `VITE_API_URL` to production backend URL

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/change-password` - Change password

### Bio
- `GET /api/bio` - Get bio data
- `PUT /api/bio` - Update bio (Protected)

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (Protected)
- `PUT /api/projects/:id` - Update project (Protected)
- `DELETE /api/projects/:id` - Delete project (Protected)

### Contact
- `POST /api/contact` - Submit contact form

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- React community for amazing tools
- Tailwind CSS for beautiful styling
- MongoDB for robust database
- All open-source contributors

---

⭐ Star this repo if you find it helpful!

## 📝 Default Configuration

**Default Skills:**
- MERN Stack
- REST APIs
- MongoDB
- SQL
- JavaScript
- Python
- Java
- Git & GitHub

**Contact:**
- Email: umerazizgujjar009@gmail.com

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Ensure PORT 5000 is not in use
- Verify all environment variables are set

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check proxy configuration in `vite.config.js`
- Verify CORS is enabled in backend

### Can't login to admin
- Ensure admin account is created
- Check JWT_SECRET matches in backend
- Clear browser localStorage and try again

## 📄 License

This project is open-source and available for personal and educational use.

## 👨‍💻 Author

**Umer Aziz**
- Email: umerazizgujjar009@gmail.com
- GitHub: [Your GitHub Profile]
- LinkedIn: [Your LinkedIn Profile]

---

Built with ❤️ using MERN Stack
