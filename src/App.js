import "./App.css";
import { useState } from "react";
import { buttons } from "./buttons";
function App() {
  const [input, setInput] = useState("");

  const evaluate = () => {
    try {
      const output = eval(`() => ${input}`)();
      return output;
    } catch (err) {
      if (input === "") return "";
      else return "Invalid Input";
    }
  };
  const toggle = () => {
    setInput((prevInput) => {
      if (prevInput === "") return "";
      let lastIndex = Math.max(
        prevInput.lastIndexOf("+"),
        prevInput.lastIndexOf("-")
      );
      const newInput = prevInput.slice();
      if (lastIndex !== -1)
        return (
          newInput.substring(0, lastIndex) +
          (newInput[lastIndex] === "+" ? "-" : "+") +
          newInput.substring(lastIndex + 1)
        );
      else return prevInput;
    });
  };
  const erase = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };
  const appendCharacter = (character) =>
    setInput((prevInput) => prevInput + character);
  if (input === undefined) setInput("");
  return (
    <div className="container">
      <div className="output">{evaluate()}</div>
      <div className="input">{input}</div>
      <div className="buttons">
        <div className="button" onClick={() => setInput("")}>
          C
        </div>
        <div className="button" onClick={() => toggle()}>
          +/-
        </div>
        {buttons.map((buttonContent) => (
          <div
            key={buttonContent}
            onClick={() => appendCharacter(buttonContent)}
            className="button"
          >
            {buttonContent}
          </div>
        ))}
        <div className="button erase" onClick={() => erase()}>
          erase
        </div>
      </div>
    </div>
  );
}

export default App;
