# JobLynk - Modern Job Search Platform

JobLynk is a comprehensive job search platform built with the MERN stack (MongoDB, Express.js, React, Node.js) that helps job seekers find opportunities and manage their job applications effectively. The platform includes advanced features like AI-powered resume analysis, ATS scoring, and intelligent job matching.

## 🌟 Features

### For Job Seekers
- **Smart Job Search**: Advanced filtering and search capabilities
- **Resume Builder**: Create professional resumes with modern templates
- **ATS Score Analysis**: Get your resume scored against ATS systems
- **AI Assistant**: Get real-time help with job search and career advice
- **Application Tracking**: Keep track of your job applications
- **Profile Management**: Maintain your professional profile

### For Recruiters
- **Job Posting**: Create and manage job listings
- **Applicant Management**: Review and manage applications
- **Company Profile**: Maintain company information
- **Analytics Dashboard**: Track job posting performance

## 🚀 Tech Stack

### Frontend
- React 18 with Vite
- Redux Toolkit for state management
- TailwindCSS for styling
- Framer Motion for animations
- Google's Generative AI for AI features
- React Router v6 for navigation
- Shadcn UI components
- Axios for API requests

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary for file storage
- PDF parsing and document processing
- Email notifications with Nodemailer

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd JobLynkPortal
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   # Create .env file based on .env.example
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env file based on .env.example
   npm run dev
   ```

## 🔧 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000/api/v1
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### Backend (.env)
```
PORT=8000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
```

## 📱 Responsive Design
- Mobile-first approach
- Responsive UI components
- Adaptive layouts for all screen sizes
- Touch-friendly interactions
- Progressive enhancement

## 🔐 Security Features
- JWT based authentication
- HTTP-only cookies
- Password hashing
- Input sanitization
- CORS protection
- Rate limiting

## 🎯 Key Components

### Frontend Structure
```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── redux/         # Redux store and slices
│   ├── styles/        # Global styles
│   └── lib/           # Third-party integrations
```

### Backend Structure
```
backend/
├── controllers/    # Route controllers
├── models/        # MongoDB schemas
├── routes/        # API routes
├── middleware/    # Custom middleware
├── utils/         # Utility functions
└── config/        # Configuration files
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team
- Frontend Development: [Your Team]
- Backend Development: [Your Team]
- UI/UX Design: [Your Team]

## 📞 Support
For support, email [your-email] or join our Slack channel. 