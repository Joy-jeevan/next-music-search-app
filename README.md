# next-music-search

## Overview
next-music-search is a full-stack application built with React for the client-side and Node.js for the server-side. This project allows users to search for music tracks and view the results in a user-friendly interface.

## Project Structure
The project is organized into two main directories: `client` and `server`.

### Client
The client-side application is built using React and TypeScript. It includes the following key files:
- **package.json**: Configuration file for the client-side application, listing dependencies and scripts.
- **tsconfig.json**: TypeScript configuration for the client-side application.
- **public/index.html**: The main HTML file that serves the React application.
- **src/App.tsx**: The main component of the React application.
- **src/index.tsx**: The entry point for the React application.

### Server
The server-side application is built using Node.js and TypeScript. It includes the following key files:
- **package.json**: Configuration file for the server-side application, listing dependencies and scripts.
- **tsconfig.json**: TypeScript configuration for the server-side application.
- **src/index.ts**: The entry point for the server application, setting up the Express server.
- **src/routes/api.ts**: Defines API routes for searching music tracks.
- **src/types/index.ts**: TypeScript types and interfaces used in the server-side application.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd next-music-search
   ```

2. Install dependencies for the client:
   ```
   cd client
   npm install
   ```

3. Install dependencies for the server:
   ```
   cd ../server
   npm install
   ```

### Running the Application
1. Start the server:
   ```
   cd server
   npm start
   ```

2. Start the client:
   ```
   cd client
   npm start
   ```

The client application will be available at `http://localhost:3001` and the server will be running on `http://localhost:3000`.

## Usage
- Use the search bar to input music track queries.
- View the list of tracks returned from the search.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License
This project is licensed under the MIT License.