import React from "react";
import TypingInput from "./components/TypingInput";
import ScoreBoard from "./components/ScoreBoard";
import TopScores from "./components/TopScores";
import LiveFeedback from "./components/LiveFeedback";
import { useTypingTest } from "./hooks/useTypingTest";
import "./App.css";

/**
 * App component is the main entry point for the typing test application.
 *
 * How to use:
 * <App />
 *
 * This component initializes the typing test with a predefined sentence and manages the state of the test.
 */
const App: React.FC = () => {
  const typeTest = "This is the sentence to type";
  const {
    enteredText,
    fullInput,
    correctCount,
    started,
    wpm,
    accuracy,
    score,
    topScores,
    onInputChange,
    reset,
  } = useTypingTest(typeTest);

  return (
    <div className="App">
      <h1>Test Your Typing Speed, Scrub!</h1>
      {wpm !== null && accuracy !== null && score !== null && (
        <ScoreBoard
          wpm={wpm}
          accuracy={accuracy}
          score={score}
          correctCount={correctCount}
        />
      )}
      <h3>{wpm !== null ? "Try again!" : "Type the following:"}</h3>
      <h6>
        <LiveFeedback expectedText={typeTest} typedText={fullInput} />
      </h6>
      {wpm === null && (
        <TypingInput value={enteredText} onChange={onInputChange} />
      )}
      <div style={{ marginTop: "16px" }}>
        {wpm === null && started && <button onClick={reset}>Cancel</button>}
        {wpm !== null && <button onClick={reset}>Restart</button>}
      </div>
      {topScores.length > 0 && wpm !== null && <TopScores topScores={topScores} />}
    </div>
  );
};

export default App;
