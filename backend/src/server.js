import app from './app.js';
import config from './config/index.js';
import connectDB from './config/db.js';

// Connect to MongoDB
connectDB();

// Start server
const server = app.listen(config.port, () => {
  console.log(`
========================================
  🚀 Server running in ${config.nodeEnv} mode
  📡 Port: ${config.port}
  🔗 URL: http://localhost:${config.port}
========================================
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});
