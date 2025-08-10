# URL Shortener - Working Version

A fully functional URL shortening application built with React frontend and Node.js/Express backend. This project includes user authentication, URL shortening, click tracking, and a beautiful modern UI.

## ✨ Features

- ✅ **User Authentication** - Sign up, login, and logout functionality
- ✅ **URL Shortening** - Create short, memorable links from long URLs
- ✅ **Click Tracking** - Monitor how many times your links are clicked
- ✅ **URL Management** - View, copy, and delete your shortened URLs
- ✅ **Responsive Design** - Works perfectly on desktop and mobile devices
- ✅ **Modern UI** - Beautiful gradient design with smooth animations
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **MongoDB Support** - Persistent data storage with fallback to in-memory storage
- ✅ **Copy to Clipboard** - One-click copying of shortened URLs

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database (with in-memory fallback)
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **shortid** - URL code generation
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - User interface library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Modern styling with gradients and animations

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (optional - app works without it using in-memory storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd URL_Shortener_Working
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables** (optional)
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/url-shortener
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   BASE_URL=http://localhost:5000
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```
   
   The frontend will run on `http://localhost:3000`

3. **Open your browser**
   
   Navigate to `http://localhost:3000` to use the application

## 📖 Usage

### For Users

1. **Sign Up** - Create a new account with your name, email, and password
2. **Login** - Access your account with your credentials
3. **Create Short URLs** - Enter a long URL and optionally add a title and description
4. **Manage URLs** - View all your shortened URLs, copy them, or delete them
5. **Track Clicks** - See how many times each URL has been clicked

### For Developers

The application includes comprehensive API endpoints:

#### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

#### URL Endpoints
- `POST /api/urls` - Create a shortened URL (requires auth)
- `GET /api/urls/user` - Get all URLs for logged-in user (requires auth)
- `DELETE /api/urls/:id` - Delete a URL (requires auth)
- `GET /:urlCode` - Redirect to original URL (public)

#### Health Check
- `GET /health` - Check API status and MongoDB connection

## 🔧 Configuration

### MongoDB Setup (Optional)

The application works perfectly without MongoDB using in-memory storage. However, if you want persistent data:

1. **Install MongoDB** locally or use MongoDB Atlas
2. **Set the MONGO_URI** in your `.env` file
3. **Restart the server**

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/url-shortener` |
| `JWT_SECRET` | Secret key for JWT tokens | `fallback-secret` |
| `NODE_ENV` | Environment mode | `development` |
| `BASE_URL` | Base URL for short links | `http://localhost:5000` |

## 📁 Project Structure

```
URL_Shortener_Working/
├── backend/
│   ├── config/
│   │   ├── db.js              # Database connection
│   │   └── memoryStorage.js   # In-memory storage fallback
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── urlController.js   # URL management logic
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT authentication middleware
│   ├── models/
│   │   ├── User.js           # User model
│   │   └── Url.js            # URL model
│   ├── routes/
│   │   ├── authRoutes.js     # Authentication routes
│   │   └── urlRoutes.js      # URL routes
│   ├── server.js             # Main server file
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js   # Main dashboard
│   │   │   ├── LandingPage.js # Home page
│   │   │   ├── Login.js       # Login form
│   │   │   ├── Profile.js     # User profile
│   │   │   └── Signup.js      # Registration form
│   │   ├── context/
│   │   │   └── AuthContext.js # Authentication context
│   │   ├── App.js             # Main app component
│   │   ├── index.js           # App entry point
│   │   └── index.css          # Global styles
│   └── package.json
└── README.md
```

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Change the PORT in the `.env` file
   - Or kill the process using the port

2. **MongoDB Connection Error**
   - The app will automatically use in-memory storage
   - Check MongoDB installation if you want persistent data

3. **CORS Issues**
   - The backend is configured to allow all origins in development
   - Check browser console for specific errors

4. **JWT Token Issues**
   - Make sure JWT_SECRET is set in the `.env` file
   - Clear browser localStorage if needed

### Development Tips

- Use MongoDB Compass for database visualization
- Check browser console and server logs for debugging
- Use Postman or similar tools to test API endpoints
- The app works without MongoDB - perfect for testing!

## 🔒 Security Notes

- Change the JWT_SECRET in production
- Use HTTPS in production
- Implement rate limiting for production use
- Add input validation and sanitization
- Use environment variables for sensitive data

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions, please open an issue on the repository.

---

**Happy URL Shortening! 🎉** 