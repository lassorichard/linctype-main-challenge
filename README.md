# Getting Started with LINCtype

Quick start:
Install dependencies: npm install
Start the server: npm start
Start the DB server: npm run json-server
Build on production: npm run build

## Approach

The core objective of this project was to create an engaging and responsive typing test that evaluates users in real time and encourages improvement through scoring and leaderboards. Here’s a brief overview of the technical approach:

- **Component Composition:** The app was divided into composable, reusable components (`TypingInput`, `ScoreBoard`, `LiveFeedback`, `TopScores`) to improve readability and maintainability.
- **Custom Hook (`useTypingTest`)**: A dedicated hook manages the typing state, score logic, and interactions with the leaderboard API.
- **Live Feedback UI**: Characters typed are visually styled with accuracy colors (green/red) and an underline indicator for the next expected character.
- **Score Calculation**: The app calculates WPM, accuracy, and a final score using a defined formula:
  `Score = (WPM * Words Typed * Accuracy) - Deletes`
- **Leaderboard Integration**: Scores are stored in a `json-server` mock API (via `db.json`) and displayed in the UI. The user is prompted for their name after completing the test.

## Pending Items

While the core functionality was achieved, a couple of items remain incomplete due to time constraints:

- **Unit Testing**: A test suite was scaffolded, but due to version conflicts with test dependencies, tests could not be finalized. Resolving these would allow validation of input handling, score logic, and rendering behaviors.
- **Extended API Integration**: Additional leaderboard features (e.g., pagination, filtering) could be added in future iterations.

These items remain open as opportunities to further demonstrate my skills in test coverage and integration handling.

---

## Available Scripts

In the project directory, you can run several commands: `npm start`, `npm run json-server`, `npm test`, `npm run build`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run json-server`

Runs the JSON Server pseudo-db which can be found in the db.json file. JSON Server supports standard CRUD operations. To learn more about json-server, see its [npm page](https://www.npmjs.com/package/json-server) for more information.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.