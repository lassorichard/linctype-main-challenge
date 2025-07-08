import React from "react";
import { LeaderboardEntry } from "../api/leaderboardApi";

type Props = {
  topScores: LeaderboardEntry[];
};

/**
 * TopScores component displays the top 5 scores from the leaderboard.
 *
 * How to use:
 * <TopScores topScores={topScores} />
 *
 * This component will render a list of the top 5 scores, showing the score, WPM, accuracy, and username for each entry.
 */
const TopScores: React.FC<Props> = ({ topScores }) => (
  <div style={{ marginTop: "24px" }}>
    <h3>🏆 Top 5 Scores:</h3>
    <ul style={{ listStyle: "none" }}>
      {topScores.map((entry, i) => (
        <li key={i}>
          <strong>#{i + 1}:</strong> {entry.score} pts — {entry.wpm} WPM — {Math.round(entry.accuracy * 100)}% ({entry.username})
        </li>
      ))}
    </ul>
  </div>
);

export default TopScores;