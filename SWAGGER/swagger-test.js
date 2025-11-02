import swaggerJSDoc from 'swagger-jsdoc';

// Swagger Configuration (same as in server.js)
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Exampire Backend API',
      version: '1.0.0',
      description: 'API documentation for Exampire - Exam Management System',
      contact: {
        name: 'Exampire Team',
        email: 'contact@exampire.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:9000/api',
        description: 'Development server',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Authorization header using the Bearer scheme'
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
          description: 'JWT token stored in cookie'
        }
      }
    },
    security: [{
      bearerAuth: []
    }, {
      cookieAuth: []
    }]
  },
  apis: ['./routes/*.js', './models/*.js'],
};

try {
  // Generate Swagger specs
  const swaggerSpecs = swaggerJSDoc(swaggerOptions);
  console.log('✅ Swagger configuration is valid!');
  console.log('📄 Generated API endpoints:');
  
  if (swaggerSpecs.paths) {
    Object.keys(swaggerSpecs.paths).forEach(path => {
      console.log(`   ${path}`);
    });
  }
  
  console.log('\n📊 Generated schemas:');
  if (swaggerSpecs.components && swaggerSpecs.components.schemas) {
    Object.keys(swaggerSpecs.components.schemas).forEach(schema => {
      console.log(`   ${schema}`);
    });
  }
  
} catch (error) {
  console.error('❌ Swagger configuration error:', error.message);
}