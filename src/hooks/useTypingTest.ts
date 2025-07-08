import { useEffect, useState } from "react";
import { getLeaderboard, postScore, LeaderboardEntry } from "../api/leaderboardApi";

/**
 * useTypingTest is a custom hook that manages the state and logic for a typing test.
 *
 * How to use:
 * const { enteredText, onInputChange } = useTypingTest("The quick brown fox jumps over the lazy dog.");
 *
 * This hook provides the current entered text and a function to handle input changes.
 */
export const useTypingTest = (typeTest: string) => {
  const [enteredText, setEnteredText] = useState("");
  const [fullInput, setFullInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [wpm, setWpm] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [deletes, setDeletes] = useState(0);
  const [topScores, setTopScores] = useState<LeaderboardEntry[]>([]);
  const [username, setUsername] = useState("Anonymous");

  // Split the type test into words for easier management
  const words = typeTest.split(" ");

  // Update the username in the leaderboard
  const updateUsername = (name: string) => {
    setUsername(name);
  };

  // Reset the test state
  const reset = () => {
    setEnteredText("");
    setFullInput("");
    setCurrentIndex(0);
    setCorrectCount(0);
    setStarted(false);
    setStartTime(null);
    setWpm(null);
    setAccuracy(null);
    setScore(null);
    setDeletes(0);
  };

  // Calculate words per minute based on characters typed and time elapsed
  const calcWPM = (charsTyped: number, millis: number): number =>
    Math.floor(charsTyped / 5 / (millis / 60000));

  // Calculate accuracy based on the number of correct characters typed
  const getAccuracy = (): number => {
    let correct = 0;
    let total = 0;

    for (let i = 0; i < fullInput.length && i < typeTest.length; i++) {
      const userChar = fullInput[i];
      const expectedChar = typeTest[i];

      if (userChar !== " ") {
        total++;
        if (userChar === expectedChar) correct++;
      }
    }

    return total > 0 ? (correct / total) * 100 : 0;
  };

  // Handle input changes
  const onInputChange = (value: string) => {
    const prefix = currentIndex > 0 ? words.slice(0, currentIndex).join(" ") + " " : "";
    const combinedInput = prefix + value;
    setFullInput(combinedInput);

    // Check if the input has started
    if (!started && value.trim().length === 1) {
      setStarted(true);
      setStartTime(new Date());
    }

    // Check if the input is correct
    if (value.endsWith(" ")) {
      const trimmed = value.trim();

      // If the current word matches the expected word
      if (trimmed === words[currentIndex]) {
        setCorrectCount((prev) => prev + 1);
      }

      // Check for deletions
      if (value.length < enteredText.length) {
        setDeletes((prev) => prev + 1);
      }

      // Update the entered text and current index
      setCurrentIndex((prev) => prev + 1);
      setEnteredText("");
    } else {
      // If the input is not complete, update the entered text
      setEnteredText(value);
    }
  };

  // Effect to handle the end of the typing test
  useEffect(() => {
    if (currentIndex >= words.length && started && startTime) {
      const timeMillis = new Date().getTime() - startTime.getTime();
      const wpmResult = calcWPM(typeTest.length, timeMillis);
      const acc = getAccuracy();
      const finalScore = (wpmResult * correctCount * (acc / 100)) - deletes;

      const name = prompt("Great job! What's your name?")?.trim();
      const finalUsername = name && name !== "" ? name : "Anonymous";

      const newEntry: LeaderboardEntry = {
        username: finalUsername,
        score: Number(finalScore.toFixed(2)),
        accuracy: Number((acc / 100).toFixed(2)),
        firstStrikeAccuracy: 1.0,
        wpm: Number(wpmResult.toFixed(2)),
        words: correctCount,
      };

      // Post the score to the leaderboard
      postScore(newEntry).then(() => {
        getLeaderboard()
          .then((data) => {
            const top5 = data.sort((a, b) => b.score - a.score).slice(0, 5);
            setTopScores(top5);
          });
      });

      setWpm(wpmResult);
      setAccuracy(Math.round(acc));
      setScore(Math.round(finalScore));
    }

  }, [currentIndex, started, startTime]);

  // Effect to load the top scores from the leaderboard
  useEffect(() => {
    const loadScores = async () => {
      const data = await getLeaderboard();
      const top5 = data.sort((a, b) => b.score - a.score).slice(0, 5);
      setTopScores(top5);
    };
    loadScores();
  }, [score]);

  return {
    enteredText,
    fullInput,
    currentIndex,
    correctCount,
    started,
    wpm,
    accuracy,
    score,
    topScores,
    onInputChange,
    reset,
    updateUsername,
  };
};