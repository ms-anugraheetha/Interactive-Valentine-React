import { useState, useRef } from "react";

export default function Valentine({ onYes, onNext, fadeOut}) {
  const [accepted, setAccepted] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [noPos, setNoPos] = useState({ top: "0px", left: "0px" });

  const yesAudioRef = useRef(null);
  const noAudioRef = useRef(null);

  // NO button runs away + sound
  const moveNo = () => {
    if (noAudioRef.current) {
      noAudioRef.current.currentTime = 0;
      noAudioRef.current.play();
    }

    setNoPos({
      top: `${Math.random() * 240 - 120}px`,
      left: `${Math.random() * 240 - 120}px`
    });
  };

  // YES clicked
  const handleYes = () => {
    setAccepted(true);
    onYes();

    if (yesAudioRef.current) {
      yesAudioRef.current.volume = 0.6;
      yesAudioRef.current.loop = true; // 🔁 loop until NEXT
      yesAudioRef.current.play();
    }

    setConfetti(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100
      }))
    );
  };

  // NEXT clicked → stop music + scroll
  const handleNext = () => {
    if (yesAudioRef.current) {
      yesAudioRef.current.pause();
      yesAudioRef.current.currentTime = 0;
      yesAudioRef.current.loop = false;
    }

    onNext();
  };

  return (
    <section className="valentine-wrapper">
      <div className={`valentine-card ${fadeOut ? "fade-out" : ""}`}>

        <h2 className="valentine-title">
          Will you be my Valentine? 💝
        </h2>

        {!accepted ? (
          <>
            <div className="photo-pill">
              <img src="/before.jpeg" alt="Before Valentine" />
            </div>
            
            <div className="buttons">
              <button className="choice-btn" onClick={handleYes}>
                YES 💖
              </button>

              <button
                className="choice-btn"
                onMouseEnter={moveNo}
                onMouseLeave={() => {
                  if (noAudioRef.current) {
                    noAudioRef.current.pause();
                    noAudioRef.current.currentTime = 0;
                  }
                }}
                onTouchStart={moveNo}
                style={{ position: "relative", ...noPos }}
              >
                NO 😈
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="photo-pill">
              <img src="/after.jpeg" alt="After Valentine" />
            </div>

            <p className="yes-text">
              I love you so much 🥹❤️
            </p>

            <button
              className="choice-btn"
              style={{ marginTop: "20px" }}
              onClick={handleNext}
            >
              Next
            </button>

            <div className="confetti">
              {confetti.map((c) => (
                <span
                  key={c.id}
                  className="confetti-heart"
                  style={{ left: `${c.left}%` }}
                >
                  ❤️
                </span>
              ))}
            </div>
          </>
        )}

        {/* YES music */}
        <audio ref={yesAudioRef}>
          <source src="/music.mp3" type="audio/mpeg" />
        </audio>

        {/* NO sound */}
        <audio ref={noAudioRef}>
          <source src="/no.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </section>
  );
}
