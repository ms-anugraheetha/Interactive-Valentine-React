import { useState, useRef } from "react";

const notes = [
  "You make me feel safe in ways I never knew I needed.",
  "You believe in me even when I doubt myself.",
  "You turn ordinary days into something special.",
  "Loving you feels easy, warm, and right."
];

export default function LoveNotes() {
  const [openIndex, setOpenIndex] = useState(null);
  const paperAudioRef = useRef(null);

  const toggleNote = (index) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : null);

    if (isOpening && paperAudioRef.current) {
      paperAudioRef.current.currentTime = 0;
      paperAudioRef.current.volume = 0.3;
      paperAudioRef.current.play();
    }
  };

  return (
    <section>
      <h2>Little Love Letters 💕</h2>

      <div className="notes-grid">
        {notes.map((note, i) => {
          const isOpen = openIndex === i;

          return (
            <div
              key={i}
              className={`envelope ${isOpen ? "open" : ""}`}
              onClick={() => toggleNote(i)}
            >
              <div className="envelope-flap" />

              <div className="letter">
                <p>{note}</p>
              </div>

              <div className="envelope-back" />
              <div className="envelope-left" />
              <div className="envelope-right" />

              {!isOpen && (
                <span className="tap-text">Tap to open</span>
              )}
            </div>
          );
        })}
      </div>

      <audio ref={paperAudioRef}>
        <source src="/paper.wav" type="audio/mpeg" />
      </audio>
    </section>
  );
}
