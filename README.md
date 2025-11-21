# Next Music Search APP

A web application to search for music on iTunes using the iTunes Search API.

## Tech Stack

### Frontend
- **React**: UI library for building the interface.
- **Redux Toolkit**: State management for search results and query state.
- **TypeScript**: Static typing for better code quality and developer experience.
- **Material UI**: Component library for styled and accessible UI elements.
- **Styled Components**: For custom component styling.

### Backend
- **Node.js**: Runtime environment.
- **Express**: Web framework for handling API requests.
- **TypeScript**: Static typing for the server code.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd itunes-search-app
    ```

2.  **Install Server Dependencies:**
    ```bash
    cd server
    npm install
    ```

3.  **Install Client Dependencies:**
    ```bash
    cd ../client
    npm install
    ```

## Running the Application

1.  **Start the Backend Server:**
    From the `server` directory:
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:3000` (or the port specified in your environment).

2.  **Start the Frontend Development Server:**
    From the `client` directory:
    ```bash
    npm start
    ```
    The application will open in your browser at `http://localhost:3001` (or the next available port).

## Testing

To run the frontend unit tests:

```bash
cd client
npm test
```

## Features

-   **Search**: Search for music tracks, artists, and albums using the iTunes API.
-   **Music Only**: The search is automatically filtered to return only music results (handled by the backend).
-   **Clear Input**: Easily clear the search text with a single click.
-   **Reset**: Reset the search results and input field to their initial state.
-   **Pagination**: Load more results as you scroll or request them.
