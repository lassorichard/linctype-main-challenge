import React from "react";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

/**
 * TypingInput component allows the user to type text.
 *
 * How to use:
 * <TypingInput value={typedText} onChange={setTypedText} />
 *
 * This component is used to capture user input during the typing test.
 */
const TypingInput: React.FC<Props> = ({ value, onChange }) => (
  <input
    type="text"
    autoFocus
    value={value}
    onChange={(e) => onChange(e.target.value)}
    name="typing"
  />
);

export default TypingInput;