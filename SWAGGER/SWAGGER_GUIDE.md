# Exampire Backend - Swagger API Documentation

## Overview

This project now includes comprehensive Swagger/OpenAPI 3.0 documentation for all API endpoints. The documentation provides an interactive interface to explore, test, and understand the API.

## Accessing the Documentation

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser and navigate to:**
   ```
   http://localhost:9000/api-docs
   ```

## Features Included

### 🔐 **Authentication**
- JWT Bearer token authentication
- Cookie-based authentication
- Interactive "Authorize" button in Swagger UI
- Complete auth flow documentation (signup, login, logout, password reset, email verification)

### 📚 **API Endpoints Documented**

#### **Authentication (`/api/auth`)**
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/checkauth` - Check authentication status
- `POST /auth/verifyemail` - Verify user email
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password/{token}` - Reset password with token

#### **Exams (`/api/exams`)**
- `GET /api/exams` - Get all exams (with filtering, sorting, pagination)
- `POST /api/exams` - Create new exam
- `GET /api/exams/streams` - Get all available streams
- `GET /api/exams/years` - Get all available years
- `GET /api/exams/{id}` - Get exam by ID
- `GET /api/exams/stats/streams-years/{stream}/{year}` - Get exams by stream and year

#### **Papers (`/api/papers`)**
- `GET /api/papers` - Get all papers (with advanced filtering)
- `POST /api/papers` - Upload paper metadata
- Complete filtering by exam, year, stream, subject, difficulty, etc.

#### **File Upload (`/api/upload`)**
- `POST /api/upload/logo` - Upload exam logo
- `POST /api/upload/paper` - Upload paper PDF

### 📋 **Data Models**

Complete schema definitions for:
- **User** - User account information
- **UserRegistration** - User signup data
- **UserLogin** - User login credentials
- **Exam** - Exam details and metadata
- **ExamInput** - Exam creation data
- **Paper** - Paper information and metadata
- **PaperInput** - Paper upload data

## How to Use

### 1. **Authentication Testing**
   - Click the "Authorize" button in Swagger UI
   - Choose either Bearer token or Cookie authentication
   - Test signup/login endpoints to get authentication tokens

### 2. **Testing Endpoints**
   - Expand any endpoint to see detailed information
   - Click "Try it out" to test the endpoint
   - Fill in required parameters
   - Click "Execute" to send the request
   - View the response in real-time

### 3. **Understanding Parameters**
   - All query parameters for filtering and pagination are documented
   - Request body schemas show exact data structure needed
   - Response schemas show what to expect back

### 4. **Error Handling**
   - Common HTTP status codes are documented
   - Error response formats are specified
   - Authentication errors are clearly explained

## Customization

The Swagger configuration is located in `server.js`. You can modify:

- **API Information**: Title, description, version, contact details
- **Servers**: Add production URLs when deploying
- **Security Schemes**: Modify authentication methods
- **Themes**: Customize the UI appearance

## Development Notes

- Documentation is auto-generated from JSDoc comments in route files
- Schema definitions are in model files
- The documentation updates automatically when you modify the comments
- No impact on existing functionality - everything works exactly as before

## Production Deployment

When deploying to production:

1. Update the server URL in `swaggerOptions.servers`
2. Consider adding authentication to the `/api-docs` endpoint if needed
3. The documentation will be available at `your-domain.com/api-docs`

## Troubleshooting

If you encounter issues:

1. **Documentation not loading**: Check that all route files are in the `./routes/` directory
2. **Missing endpoints**: Ensure JSDoc comments are properly formatted
3. **Schema errors**: Verify model file imports and schema definitions

## Benefits

- ✅ **Interactive Testing**: Test all endpoints directly from the browser
- ✅ **Complete Documentation**: Every parameter, response, and error is documented
- ✅ **Team Collaboration**: Share consistent API documentation with frontend developers
- ✅ **No Code Changes**: Existing functionality remains unchanged
- ✅ **Professional Presentation**: Clean, organized API documentation
- ✅ **Authentication Support**: Built-in JWT and cookie auth testing

The Swagger integration enhances your development workflow without affecting your existing codebase!