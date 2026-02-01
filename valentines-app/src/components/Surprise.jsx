import { useState, useRef } from "react";

export default function Surprise() {
  const [step, setStep] = useState(0);
  const ref = useRef(null);

  const next = () => {
    setStep(step + 1);
    setTimeout(() => {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 300);
  };

  return (
    <section ref={ref}>
      {step === 0 && (
        <button className="surprise-btn" onClick={next}>
          Ready for the last surprise 💌
        </button>
      )}

      {step === 1 && (
        <>
          <p className="surprise-step">
            Loving you has been my favorite feeling.
          </p>
          <button className="surprise-btn" onClick={next}>
            One more thing…
          </button>
        </>
      )}

      {step === 2 && (
        <div className="final-surprise">
          <h1>I Choose You ❤️</h1>
          <div className="heart">💖</div>
          <p>
            Not just today. Not just on Valentine’s Day.
            <br />
            But every single day.
            <br /><br />
            Always you. Forever us.
          </p>
        </div>
      )}
    </section>
  );
}
