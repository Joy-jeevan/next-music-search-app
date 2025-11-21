# Next Music Search App - Client

The frontend application for the Next Music Search App, built with React and TypeScript.

## Project Structure

-   **src/components**: Reusable UI components (SearchForm, ResultsList, ResultItem, etc.).
-   **src/store**: Redux store configuration and slices.
-   **src/styles**: Global styles and theme definitions.
-   **src/types**: TypeScript type definitions.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Environment Variables

-   `REACT_APP_API_URL`: The URL of the backend API (default: `http://localhost:3000`).
-   `PORT`: The port to run the development server on (default: `3001`).

## Key Dependencies

-   **React**: UI Library.
-   **Redux Toolkit**: State management using Thunk.
-   **Material UI**: Component library.
-   **Styled Components**: CSS-in-JS styling.
-   **Axios**: HTTP client.
