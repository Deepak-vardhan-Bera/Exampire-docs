# Exampire API Postman Collection

This directory contains comprehensive Postman collection and environment files for testing the Exampire backend API, which has been **optimized for Bearer token authentication** suitable for mobile applications.

## 🔄 Recent Updates - Bearer Token Migration

The API has been **migrated from cookie-based to Bearer token authentication** for better mobile app compatibility:
- ✅ **JWT Middleware Updated**: Now prioritizes Bearer tokens over cookies  
- ✅ **Auth Controller Enhanced**: Returns tokens in response body for mobile apps
- ✅ **Mobile-First Design**: Explicit token management for better control
- ✅ **Backward Compatible**: Still supports cookie authentication for web clients
- ✅ **Postman Collection Updated**: Complete Bearer token integration

## Files Included

### 1. Collection File
- **`Exampire_API_Collection.json`** - Complete API collection with 100+ endpoints using Bearer token auth

### 2. Environment Files  
- **`Exampire_Environment.json`** - Comprehensive environment with all variables
- **`Exampire_Development_Environment.json`** - Legacy development environment
- **`Exampire_Production_Environment.json`** - Legacy production environment

## 📁 Collection Overview - Complete API Coverage

The updated Postman collection now includes **8 comprehensive API sections** with 100+ endpoints:

### 🔐 Authentication (8 endpoints)
- **User Signup** - Register + auto-store JWT token 
- **User Login** - Authenticate + auto-store JWT token
- **Check Auth Status** - Verify Bearer token authentication
- **Get Profile** - Fetch current user profile
- **Update Profile** - Update user information  
- **Change Password** - Update password
- **Delete Account** - Permanent account deletion
- **User Logout** - Client-side token management

### 📚 Exams Management (12 endpoints)
- **CRUD Operations** - Create, read, update, delete exams
- **Advanced Filtering** - By subject, difficulty, type, year
- **Exam Analytics** - Statistics and performance data
- **Bulk Operations** - Mass exam management
- **Stream Management** - Academic stream operations
- **Year Management** - Exam year operations

### � Papers Management (20+ endpoints)  
- **Complete Lifecycle** - Upload, manage, analyze papers
- **Smart Search** - Advanced filtering and search capabilities
- **Analytics Integration** - View counts, favorites, statistics
- **Metadata Management** - Comprehensive paper information
- **Bulk Operations** - Mass paper operations
- **Performance Tracking** - Paper engagement metrics

### 📁 Collections Management (9 endpoints)
- **Personal Collections** - Create and manage paper collections
- **Collection Sharing** - Collaborative features
- **Advanced Organization** - Categorization and tagging
- **Collection Analytics** - Usage statistics
- **Bulk Operations** - Mass collection management

### � Bookmarks Management (8 endpoints)
- **Page-Level Bookmarking** - Precise page references
- **Highlight System** - Text highlighting with coordinates
- **Note-Taking** - Comprehensive annotation system
- **Tag Organization** - Flexible tagging system
- **Advanced Search** - Filter bookmarks by multiple criteria

### 📊 Analytics & Progress (5 endpoints)
- **Dashboard Analytics** - Comprehensive overview
- **User Activity Tracking** - Detailed activity logs
- **Performance Analytics** - Subject and exam-wise performance
- **Study Progress** - Learning progress monitoring
- **Activity Logging** - Detailed user interaction tracking

### 🔔 Notifications Management (6 endpoints)
- **Real-time Notifications** - Instant notification system
- **Read/Unread Management** - Notification state management
- **Bulk Operations** - Mass notification operations
- **Notification Preferences** - User preference management
- **Priority System** - Notification priority handling

### � Upload Services (4 endpoints)
- **Multi-format Support** - Papers, images, documents
- **Cloudinary Integration** - Cloud storage management
- **Batch Uploads** - Multiple file handling
- **File Management** - Upload, delete, organize files

## Environment Variables

### Development Environment Variables
```
base_url: http://localhost:9000
api_docs_url: {{base_url}}/api-docs
test_email: testuser@example.com
test_name: Test User
test_password: testpassword123
admin_email: admin@exampire.com
admin_password: adminpassword123
jwt_token: (auto-populated after login)
user_id: (auto-populated after login)
exam_id: (auto-populated after creating exam)
paper_id: (auto-populated after uploading paper)
exam_logo_url: (auto-populated after logo upload)
paper_url: (auto-populated after paper upload)
```

### Production Environment Variables
Similar to development but with production URLs and secure credentials.

## Setup Instructions

### 1. Import Collection
1. Open Postman
2. Click "Import" button
3. Select `Exampire_API_Collection.json`
4. The collection will be imported with all folders and requests

### 2. Import Environment
1. Click "Import" button again
2. Select the appropriate environment file:
   - `Exampire_Development_Environment.json` for local development
   - `Exampire_Production_Environment.json` for production testing
3. Select the imported environment from the dropdown

### 3. Setup Environment Variables
1. Edit the environment and update:
   - `base_url` - Your API server URL
   - `test_email` and `test_password` - Valid test credentials
   - `admin_email` and `admin_password` - Admin credentials

## Usage Workflow

### 1. Bearer Token Authentication Flow
```
1. User Signup → Get JWT token + verification code from email
2. Verify Email → Confirm email address  
3. User Login → Get JWT token (auto-saved to jwt_token variable)
4. All Protected Requests → Use Authorization: Bearer {{jwt_token}} header
5. Logout → Clear token from client (optional server notification)
```

### 1a. Quick Bearer Token Testing
```
1. Quick Login & Token Setup → Fast authentication with validation tests
2. Test Bearer Token Validation → Verify token works for protected endpoints
3. Clear Token & Test Unauthorized → Confirm security works without token
```

### 2. Exam Management Flow
```
1. Upload Exam Logo → Get logo URL
2. Create Exam → Use logo URL, get exam_id
3. Get/Update Exams → Use exam_id for operations
```

### 3. Paper Management Flow
```
1. Upload Exam Paper → Get paper URL
2. Upload Paper Metadata → Use paper URL and exam_id
3. Get/Update Papers → Use paper_id for operations
```

## Authentication

The Exampire API uses **Bearer Token Authentication** optimized for mobile applications. The collection automatically:
- Stores JWT token from login/signup responses 
- Uses Bearer token in Authorization headers for all authenticated requests
- Extracts and stores relevant IDs from responses
- Provides backward compatibility with cookie-based authentication

### Bearer Token Authentication (Primary Method)

**Login/Signup Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

**Request Header:**
```
Authorization: Bearer {{jwt_token}}
```

### Token Management
- **Token Storage**: Automatically stored in `jwt_token` environment variable
- **Token Expiration**: 7 days from generation
- **Token Refresh**: Manual re-login required (consider implementing auto-refresh for production)
- **Logout**: Client-side token removal (no server-side invalidation needed)

### Authentication Flow
1. **Login/Signup** → Receive token in response body
2. **Store Token** → Auto-saved to `{{jwt_token}}` environment variable  
3. **Authenticated Requests** → Include `Authorization: Bearer {{jwt_token}}` header
4. **Logout** → Clear token from environment (optional server call)

## Query Parameters

Many GET endpoints support query parameters for:
- **Pagination**: `page`, `limit`
- **Filtering**: `search`, `examName`, `stream`, `year`, `subject`, `difficulty`
- **Sorting**: `sortBy`, `sortOrder`

Example:
```
GET /api/papers?page=1&limit=10&examName=JEE&stream=Engineering&year=2024&sortBy=createdAt&sortOrder=desc
```

## Response Formats

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "pagination": { ... } // For paginated endpoints
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": { ... }
}
```

## File Upload Format

For file upload endpoints:
- Use `form-data` in request body
- Set appropriate field names: `logo` for exam logos, `paper` for exam papers
- Supported formats:
  - **Logos**: JPG, JPEG, PNG, SVG (max 300x300px)
  - **Papers**: PDF, JPG, JPEG, PNG

## Testing Tips

1. **Order of Execution**: Follow the authentication flow first
2. **Environment Selection**: Ensure correct environment is selected
3. **File Paths**: Update file paths in upload requests
4. **Variable Updates**: Some variables are auto-populated by test scripts
5. **Error Handling**: Check response status and error messages

## API Documentation

Access interactive API documentation at: `{{base_url}}/api-docs`

## Support

For issues or questions:
- Check the API documentation
- Verify environment variables are set correctly
- Ensure the backend server is running
- Check network connectivity and CORS settings

---

**Note**: This collection is designed to work with the Exampire Backend API. Ensure the backend server is running and accessible before using the collection.