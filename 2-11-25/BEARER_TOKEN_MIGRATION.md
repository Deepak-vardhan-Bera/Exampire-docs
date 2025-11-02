# Bearer Token Authentication Migration

## Summary of Changes

The Exampire backend has been successfully migrated from cookie-based authentication to Bearer token authentication, optimized for mobile app usage.

## Changes Made

### 1. Token Generation (`utils/generateTokenAndSetCookie.js`)
- ✅ Added new `generateToken()` function that only returns the JWT token
- ✅ Kept `generateTokenAndSetCookie()` for backward compatibility
- ✅ Token expiration remains 7 days

### 2. JWT Middleware (`middleware/verifyJWT.js`)
- ✅ **Prioritizes Bearer token headers** over cookies
- ✅ Maintains backward compatibility with cookie authentication
- ✅ Token extraction order:
  1. **Authorization: Bearer <token>** (Primary for mobile)
  2. Cookie token (Fallback for web)

### 3. Authentication Controller (`controllers/auth.controller.js`)
- ✅ **Login response now includes `token` field** in JSON
- ✅ **Signup response now includes `token` field** in JSON
- ✅ Logout no longer clears cookies (client-side token removal)
- ✅ Delete account no longer clears cookies

### 4. API Documentation (`routes/auth.route.js`)
- ✅ Updated Swagger documentation to reflect Bearer token responses
- ✅ Removed cookie-specific documentation from login/signup
- ✅ Updated security schemes to prioritize Bearer tokens

### 5. Server Configuration (`server.js`)
- ✅ Updated Swagger security schemes to prioritize Bearer authentication
- ✅ Maintained cookie parser for backward compatibility

## Mobile App Integration

### Authentication Flow

#### 1. Login/Signup
```javascript
// Mobile app login request
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const data = await response.json();
if (data.success) {
  // Store token in secure storage
  await SecureStore.setItemAsync('authToken', data.token);
  console.log('User:', data.user);
}
```

#### 2. Making Authenticated Requests
```javascript
// Get stored token
const token = await SecureStore.getItemAsync('authToken');

// Make authenticated request
const response = await fetch('/api/papers', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
});
```

#### 3. Token Storage Recommendations
- **React Native**: Use `@react-native-async-storage/async-storage` or `expo-secure-store`
- **Flutter**: Use `flutter_secure_storage` package
- **Native iOS**: Use Keychain Services
- **Native Android**: Use EncryptedSharedPreferences

#### 4. Logout Implementation
```javascript
// Client-side logout (no server request needed)
const logout = async () => {
  await SecureStore.deleteItemAsync('authToken');
  // Navigate to login screen
};

// Optional: Call server logout endpoint
const serverLogout = async () => {
  const token = await SecureStore.getItemAsync('authToken');
  await fetch('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  await SecureStore.deleteItemAsync('authToken');
};
```

## Token Management

### Token Expiration
- **Validity**: 7 days from generation
- **Auto-refresh**: Not implemented (consider adding for production)
- **Manual refresh**: Re-login required after expiration

### Security Best Practices
1. **Store tokens securely** in device keychain/secure storage
2. **Clear tokens on app uninstall** or logout
3. **Validate token expiration** before making requests
4. **Handle 401 responses** by redirecting to login

## API Endpoints Affected

All protected endpoints now prioritize Bearer token authentication:

### Authentication Endpoints
- `POST /api/auth/login` - Returns token in response body
- `POST /api/auth/signup` - Returns token in response body
- `POST /api/auth/logout` - No longer clears server-side cookies
- `GET /api/auth/checkauth` - Validates Bearer token

### Protected Endpoints (Require Bearer Token)
- All `/api/papers/*` endpoints with authentication
- All `/api/collections/*` endpoints
- All `/api/bookmarks/*` endpoints
- All `/api/analytics/*` endpoints
- All `/api/notifications/*` endpoints

## Backward Compatibility

- ✅ Web applications using cookies will continue to work
- ✅ Cookie authentication is maintained as fallback
- ✅ No breaking changes for existing web clients
- ✅ Mobile apps get optimized Bearer token flow

## Testing

### Test Bearer Token Authentication
```bash
# Login and get token
curl -X POST http://localhost:9000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Use token for authenticated request
curl -X GET http://localhost:9000/api/auth/checkauth \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Verify Cookie Fallback Still Works
```bash
# Login with cookies enabled
curl -X POST http://localhost:9000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"test@example.com","password":"password123"}'

# Use cookies for authenticated request
curl -X GET http://localhost:9000/api/auth/checkauth \
  -b cookies.txt
```

## Next Steps

1. **Update your mobile app** to use Bearer token authentication
2. **Test thoroughly** with both mobile and web clients
3. **Consider implementing token refresh** for better UX
4. **Monitor authentication flows** in production
5. **Update API documentation** if you have external developers

## Migration Checklist

- [x] Updated token generation utility
- [x] Modified JWT middleware to prioritize Bearer tokens  
- [x] Updated auth controller responses
- [x] Modified logout functionality
- [x] Updated Swagger documentation
- [x] Maintained backward compatibility
- [ ] Update mobile app implementation
- [ ] Test authentication flows
- [ ] Deploy changes to production