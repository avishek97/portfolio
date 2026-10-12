import { useState, useEffect } from "react";

export default function Response({ text, isLoading }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return;

    setDisplayedText(""); // reset when new text arrives
    let i = -1;

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 30); // speed in ms per character

    return () => clearInterval(interval);
  }, [text]);

  return (
    <section className="response">
      <div className="response-details">
        {isLoading ? (
          <div className="dots"></div> // loader
        ) : (
          <p>{displayedText}</p> // typewriter response
        )}
      </div>
    </section>
  );
}
