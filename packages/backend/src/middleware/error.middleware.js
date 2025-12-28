// packages/backend/src/middleware/error.middleware.js

// Optional: simple custom error class (use if you want typed errors)
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // for logging/monitoring if needed
    Error.captureStackTrace(this, this.constructor);
  }
}

// Global error handling middleware
// Must have 4 params: (err, req, res, next)
export const errorHandler = (err, req, res, next) => {
  // Fallbacks
  const statusCode = err.statusCode || 500;
  const message =
    err.message || "Something went wrong. Please try again later.";

  // Basic logging (for now just console, later use a logger service)
  console.error("Error handler:", {
    message: err.message,
    stack: err.stack,
    statusCode
  });

  // Avoid leaking internal details in production
  const response = {
    success: false,
    message
  };

  // Optionally expose extra info in development
  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

