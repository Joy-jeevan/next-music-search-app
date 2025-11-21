# Next Music Search App - Server

The backend server for the Next Music Search App, built with Node.js, Express, and TypeScript.

## API Endpoints

### `GET /api/search`

Searches for music content on iTunes.

**Query Parameters:**

-   `term` (required): The search term (e.g., "Beatles").
-   `limit` (optional): The number of results to return (default: 10).
-   `offset` (optional): The offset for pagination (default: 0).

**Response:**

Returns a JSON object containing:
-   `resultCount`: The number of results returned.
-   `results`: An array of music tracks, artists, or albums.

## Setup and Running

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start Development Server:**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:3000`.

## Environment Variables

-   `PORT`: The port to run the server on (default: `3000`).
