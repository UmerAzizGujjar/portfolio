# 🚀 Dynamic Portfolio Website

<div align="center">

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?logo=express)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?logo=JSON%20web%20tokens)

A modern, full-stack portfolio website with an admin dashboard for dynamic content management.

**🌐 Live Demo:** [https://umeraziz-portfolio.vercel.app/](https://umeraziz-portfolio.vercel.app/)

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation)

</div>

---

## 📋 Table of Contents

- [About](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Security](#-security-features)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About The Project

A professional portfolio website built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring a powerful admin dashboard for real-time content management. This application eliminates the need for redeployment when updating portfolio content, making it perfect for professionals who frequently update their work showcase.

### Built For
- ✅ Professional Portfolio Websites
- ✅ Freelancers & Developers
- ✅ Creative Professionals
- ✅ Learning Full-Stack Development
- ✅ Production-Ready Applications

---

## ✨ Features

### 🔐 Admin Dashboard
- Secure JWT-based authentication
- Change password functionality
- Protected routes with authorization
- Real-time content updates without redeployment

### 👤 Bio & Profile Management
- ✏️ Edit personal information (name, title, bio)
- 📸 Upload and update profile image with preview
- 🖼️ Click to enlarge profile image in modal
- 🎓 Manage education details
- 💼 Add and update skills
- 🔗 Social media links (GitHub, LinkedIn, Email)
- 📄 Upload CV/Resume link

### 📂 Project Management
- ➕ Add new projects with detailed information
- 🖼️ Upload project images
- 🏷️ Tag projects with technologies
- ✏️ Edit existing projects
- 🗑️ Delete projects
- 🔍 Filter projects by technology
- 🔎 Search projects by title/description
- 📱 View project details in modal
- 🔗 Add live demo and GitHub repository links

### 💼 Work Experience
- ➕ Add work experience entries
- 📅 Track start and end dates
- ✏️ Edit and delete experience entries
- 📊 Display in timeline format
- 🔄 Show More/Less functionality

### 🎓 Certifications
- 📜 Add certifications with issuer details
- 📅 Track issue and expiry dates
- 🔗 Add credential links
- ✏️ Edit and delete certifications
- 🔄 Show More/Less functionality

### 📧 Contact Form
- 📨 Receive messages from visitors
- 📬 Email notifications for new messages
- 📋 View all messages in admin dashboard
- 🗑️ Delete messages
- ✅ Form validation

### 🎨 User Interface
- 🌓 Dark/Light mode toggle with smooth transitions
- 📱 Fully responsive design for all devices
- ✨ Modern gradient effects and animations
- 🎭 Smooth page transitions
- 🍞 Toast notifications for user feedback
- 🎯 Clean and professional design
- ⚡ Fast loading with optimized images

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **React Helmet** - SEO management
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Nodemailer** - Email notifications
- **CORS** - Cross-origin resource sharing

### Deployment
- **Vercel** - Frontend hosting
- **Railway** - Backend hosting
- **MongoDB Atlas** - Database hosting

---

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn
- Git

### Clone Repository
```bash
git clone https://github.com/UmerAzizGujjar/portfolio.git
cd portfolio
```

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in server directory:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password
NODE_ENV=development
PORT=5000
```

> ⚠️ **Important**: Never commit your `.env` file! It's already in `.gitignore` for your protection.

4. Run the setup script to create admin user:
```bash
node setup.js
```

5. Start the backend server:
```bash
npm start
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in client directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the React development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## ⚙️ Configuration

### Environment Variables

> ⚠️ **SECURITY WARNING**: Never commit your actual `.env` file or real credentials to GitHub! The values below are EXAMPLES ONLY. Replace them with your own secure credentials.

#### Backend (.env)
```env
# Database - Replace with your actual MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# JWT - Use a strong, random secret (minimum 32 characters)
JWT_SECRET=generate_your_own_secure_random_string_here_minimum_32_chars
JWT_EXPIRE=7d

# Email Configuration (Gmail) - Use your Gmail App Password
EMAIL_USER=your_actual_email@gmail.com
EMAIL_PASSWORD=your_16_digit_app_password

# Server
NODE_ENV=development
PORT=5000
```

> 💡 **Tip**: The `.env` file is already in `.gitignore` to prevent accidental commits. Always use `.env.example` for documentation.

#### Frontend (.env)
```env
# API URL
VITE_API_URL=http://localhost:5000/api
```

### Email Setup (Gmail)
1. Enable 2-Factor Authentication in your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use this app password in `EMAIL_PASSWORD`

---

## 🚀 Usage

### Getting Started

1. **Start Backend Server** (Terminal 1):
```bash
cd server
npm start
```

2. **Start Frontend** (Terminal 2):
```bash
cd client
npm run dev
```

3. **Open Browser**: Navigate to `http://localhost:5173`

### Admin Workflows

#### Initial Setup:
1. Navigate to `/login`
2. Login with default credentials:
   - Email: `admin@portfolio.com`
   - Password: `admin123`
3. **Important**: Change password immediately after first login

#### Managing Bio:
1. Access admin dashboard
2. Navigate to "Manage Bio" section
3. Update personal information
4. Upload profile image (max 5MB)
5. Add skills (comma-separated)
6. Update education details
7. Save changes

#### Managing Projects:
1. Click "Manage Projects" in dashboard
2. Add new project with:
   - Title and description
   - Project image
   - Technologies (comma-separated)
   - Live demo URL
   - GitHub repository URL
3. Edit or delete existing projects

#### Managing Experience:
1. Navigate to "Manage Experience" section
2. Add work experience entries
3. Specify job title, company, dates
4. Add description of responsibilities

#### Managing Certifications:
1. Go to "Manage Certifications"
2. Add certification details
3. Include issuer and dates
4. Add credential links

#### Viewing Messages:
1. Check "Manage Contacts" section
2. View all received messages
3. Delete messages after responding

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/login` | Admin login | Public |
| POST | `/api/auth/change-password` | Change password | Private |

### Bio Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/bio` | Get bio information | Public |
| PUT | `/api/bio` | Update bio | Private (Admin) |
| POST | `/api/bio/upload-image` | Upload profile image | Private (Admin) |

### Project Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/projects` | Get all projects | Public |
| GET | `/api/projects/:id` | Get single project | Public |
| POST | `/api/projects` | Create project | Private (Admin) |
| PUT | `/api/projects/:id` | Update project | Private (Admin) |
| DELETE | `/api/projects/:id` | Delete project | Private (Admin) |

### Contact Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/contact` | Send contact message | Public |
| GET | `/api/contact` | Get all messages | Private (Admin) |
| DELETE | `/api/contact/:id` | Delete message | Private (Admin) |

### Request Examples

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@portfolio.com",
  "password": "admin123"
}
```

#### Update Bio
```bash
PUT /api/bio
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "title": "Full Stack Developer",
  "bio": "Passionate developer with 5 years experience...",
  "skills": ["React", "Node.js", "MongoDB"],
  "email": "john@example.com",
  "github": "https://github.com/johndoe",
  "linkedin": "https://linkedin.com/in/johndoe",
  "cvLink": "https://example.com/cv.pdf"
}
```

#### Create Project
```bash
POST /api/projects
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "E-Commerce Platform",
  "description": "A full-stack e-commerce application...",
  "technologies": "React, Node.js, MongoDB, Stripe",
  "liveUrl": "https://example.com",
  "githubUrl": "https://github.com/user/project",
  "projectImage": <file>
}
```

#### Send Contact Message
```bash
POST /api/contact
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "message": "I'd like to discuss a project..."
}
```

---

## 🗄️ Database Schema

### User Collection
```javascript
{
  email: String (unique, required),
  password: String (hashed, required),
  role: String (default: 'admin'),
  createdAt: Date,
  updatedAt: Date
}
```

### Bio Collection
```javascript
{
  name: String (required),
  title: String (required),
  bio: String (required),
  skills: [String],
  email: String (required),
  github: String,
  linkedin: String,
  cvLink: String,
  imageUrl: String,
  education: {
    degree: String,
    institution: String,
    startDate: Date,
    endDate: Date,
    isCurrentlyPursuing: Boolean,
    currentSemester: String,
    description: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Project Collection
```javascript
{
  title: String (required),
  description: String (required),
  technologies: [String],
  imageUrl: String,
  liveUrl: String,
  githubUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Collection
```javascript
{
  name: String (required),
  email: String (required),
  message: String (required),
  createdAt: Date
}
```

---

## 📁 Project Structure

```
portfolio/
├── client/                          # Frontend React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   │   └── images/
│   │   ├── components/
│   │   │   ├── Certifications.jsx
│   │   │   ├── ChangePassword.jsx
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   ├── DarkModeToggle.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ManageBio.jsx
│   │   │   ├── ManageContacts.jsx
│   │   │   ├── ManageExperienceCertifications.jsx
│   │   │   ├── ManageProjects.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   └── WorkExperience.jsx
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Login.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                          # Backend Node.js application
│   ├── config/
│   │   ├── db.js
│   │   └── email.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bioController.js
│   │   ├── contactController.js
│   │   └── projectController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── upload.js
│   ├── models/
│   │   ├── Bio.js
│   │   ├── Contact.js
│   │   ├── Project.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bioRoutes.js
│   │   ├── contactRoutes.js
│   │   └── projectRoutes.js
│   ├── uploads/                     # Uploaded images
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── server.js
│   └── setup.js
├── .gitignore
└── README.md
```

---

## 🚢 Deployment

### Frontend Deployment (Vercel)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy on Vercel**:
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Configure project:
     - Framework Preset: Vite
     - Root Directory: `client`
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Add environment variable:
     - `VITE_API_URL`: Your Railway backend URL

3. **Deploy**: Click "Deploy" and wait for completion

### Backend Deployment (Railway)

1. **Push to GitHub** (if not already done)

2. **Deploy on Railway**:
   - Go to [Railway](https://railway.app)
   - Create new project
   - Deploy from GitHub repository
   - Select your repository
   - Configure:
     - Root Directory: Leave empty or set to `server`
     - Add environment variables:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_production_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password
NODE_ENV=production
PORT=5000
```

3. **Generate Domain**: Railway will provide a public URL

4. **Update CORS**: Add your Vercel URL to the CORS configuration in `server.js`

### Post-Deployment

1. Update frontend `.env` with Railway backend URL
2. Redeploy frontend on Vercel
3. Test all functionality
4. Change admin password
5. Add your projects and bio information

---

## 🔐 Security Features

- ✅ **Password Hashing**: bcryptjs with salt rounds
- ✅ **JWT Authentication**: Secure token-based auth
- ✅ **Protected Routes**: Middleware for authorization
- ✅ **File Upload Validation**: Type and size checks
- ✅ **Input Sanitization**: Mongoose schema validation
- ✅ **CORS Configuration**: Restricted origins
- ✅ **Environment Variables**: Sensitive data protection
- ✅ **Error Handling**: Custom error middleware
- ✅ **Password Change**: Secure password update

### Security Best Practices

1. **Never commit `.env` files**
2. **Use strong JWT secrets** (minimum 32 characters)
3. **Enable HTTPS** in production
4. **Change default passwords** immediately
5. **Use environment-specific secrets**
6. **Regular dependency updates**
7. **Implement rate limiting** (recommended for production)
8. **Monitor application logs**

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch:
```bash
git checkout -b feature/AmazingFeature
```

3. Commit your changes:
```bash
git commit -m 'Add some AmazingFeature'
```

4. Push to the branch:
```bash
git push origin feature/AmazingFeature
```

5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation if needed
- Add comments for complex logic

---

## 📝 License

This project is created for educational and professional portfolio purposes. Feel free to use it as a template for your own portfolio.

---

## 👨‍💻 Author

**Umer Aziz Gujjar**
- GitHub: [@UmerAzizGujjar](https://github.com/UmerAzizGujjar)
- Portfolio: [https://umeraziz-portfolio.vercel.app/](https://umeraziz-portfolio.vercel.app/)
- Repository: [https://github.com/UmerAzizGujjar/portfolio](https://github.com/UmerAzizGujjar/portfolio)

---

## 🙏 Acknowledgments

- MERN Stack Community
- React Documentation
- Tailwind CSS
- MongoDB Atlas
- Vercel & Railway for hosting
- All open-source contributors

---

## 📞 Support

For support, questions, or feature requests:
- Open an issue in the GitHub repository
- Contact via the portfolio website
- Email: Contact through the portfolio contact form

---

## 🔄 Changelog

### Version 1.0.0 (January 2026)
- ✅ Initial release
- ✅ Admin dashboard with authentication
- ✅ Bio and profile management
- ✅ Project management with image upload
- ✅ Work experience and certifications
- ✅ Contact form with email notifications
- ✅ Dark/light mode toggle
- ✅ Responsive design
- ✅ Deployed on Vercel and Railway

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ using MERN Stack + Tailwind CSS

</div>
