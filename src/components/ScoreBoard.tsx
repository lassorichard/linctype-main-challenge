import React from "react";

type Props = {
  wpm: number;
  accuracy: number;
  score: number;
  correctCount: number;
};

/**
 * ScoreBoard component displays the typing test results.
 *
 * How to use:
 * <ScoreBoard wpm={75} accuracy={95} score={1000} correctCount={15} />
 *
 * This component will announce the WPM, accuracy, and score after the test is completed.
 */
const ScoreBoard: React.FC<Props> = ({ wpm, accuracy, score, correctCount }) => (
  <div aria-live="polite">
    <h2>You typed {correctCount} words at {wpm} WPM.</h2>
    <h2>Accuracy: {accuracy}%</h2>
    <h2>Score: {score}</h2>
  </div>
);

export default ScoreBoard;