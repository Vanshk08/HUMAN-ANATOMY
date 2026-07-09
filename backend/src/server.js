import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`  Human Anatomy API Server running...`);
  console.log(`  Port: ${PORT}`);
  console.log(`  Environment: ${NODE_ENV}`);
  console.log(`  URL: http://localhost:${PORT}/api`);
  console.log(`=========================================`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
