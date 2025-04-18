// Importing the built-in HTTP module to create a server
const http = require("http");

// Importing the Express app from another file (usually 'app.js' or 'app/index.js')
const app = require("./app");

// Function to make sure the port is valid (number or named pipe)
const normalizePort = (val) => {
  const port = parseInt(val, 10); // Convert the value to an integer

  if (isNaN(port)) {
    // If it's not a number, return as it is (maybe it's a named pipe)
    return val;
  }
  if (port >= 0) {
    // If it's a valid port number, return it
    return port;
  }
  return false; // Otherwise, return false
};

// Get the port from environment variables or use 3000 as default
const port = normalizePort(process.env.PORT || "3000");

// Tell Express which port to listen on
app.set("port", port);

// Handle errors that might happen when starting the server
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    // If the error isn't related to 'listen', throw it
    throw error;
  }

  // Get the server's address info
  const address = server.address();
  // Determine if it's a pipe or a port
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;

  // Switch between different error cases
  switch (error.code) {
    case "EACCES":
      // Permission error (need admin rights)
      console.error(bind + " requires elevated privileges.");
      process.exit(1); // Exit the app with error
      break;
    case "EADDRINUSE":
      // Port already in use
      console.error(bind + " is already in use.");
      process.exit(1); // Exit the app with error
      break;
    default:
      // Other errors → re-throw
      throw error;
  }
};

// Create an HTTP server with the Express app
const server = http.createServer(app);

// Attach the error handler to the server
server.on("error", errorHandler);

// When the server is up and listening, log the port or pipe it's using
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind); // Log it
});

// Start the server and listen on the chosen port
server.listen(port);
