import React from "react";

type Props = {
  expectedText: string;
  typedText: string;
};

/**
 * LiveFeedback component provides real-time feedback on the user's typing accuracy.
 *
 * How to use:
 * <LiveFeedback expectedText="The quick brown fox jumps over the lazy dog." typedText="The quick brown fox jumps over the lazy doo." />
 *
 * This component will highlight the characters in the expected text based on the user's input:
 * - Correct characters will be green.
 * - Incorrect characters will be red.
 * - Characters that are typed but not yet expected will be underlined in blue.
 * - Characters that are expected but not yet typed will remain unstyled.
 */
const LiveFeedback: React.FC<Props> = ({ expectedText, typedText }) => {
  return (
    <div>
      {expectedText.split("").map((char, index) => {
        const typedChar = typedText[index];

        let style: React.CSSProperties = {
          whiteSpace: "pre-wrap",
        };

        if (typedChar === undefined) {
          if (index === typedText.length) {
            style.textDecoration = "underline";
            style.textDecorationColor = "#10ADE2";
          }
        } else if (typedChar === char) {
          style.color = "#93C43F";
        } else {
          style.color = "#F25151";
        }

        return (
          <span key={index} style={style}>
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default LiveFeedback;
