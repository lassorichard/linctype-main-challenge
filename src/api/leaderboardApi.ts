export type LeaderboardEntry = {
  id?: number;
  username: string;
  score: number;
  accuracy: number;
  firstStrikeAccuracy: number;
  wpm: number;
  words: number;
};

const API_URL = "http://localhost:3001/leaderboard";

/**
 * getLeaderboard fetches the leaderboard entries from the API.
 *
 * How to use:
 * ```typescript
 * import { getLeaderboard, postScore, LeaderboardEntry } from './leaderboardApi';
 * const leaderboard = await getLeaderboard();
 * const newEntry: LeaderboardEntry = {
 *   username: 'Player1',
 *   score: 100,
 *   accuracy: 95,
 *   firstStrikeAccuracy: 90,
 *   wpm: 80,
 *   words: 50,
 * };
 * await postScore(newEntry);
 * ```
 */
export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch leaderboard");
  return res.json();
};

export const postScore = async (entry: LeaderboardEntry): Promise<void> => {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });
};