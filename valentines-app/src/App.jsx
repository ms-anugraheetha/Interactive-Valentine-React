import { useState, useRef, useEffect } from "react";
import Valentine from "./components/Valentine";
import LoveNotes from "./components/LoveNotes";
import Surprise from "./components/Surprise";

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [scrollUnlocked, setScrollUnlocked] = useState(false);

  const lettersRef = useRef(null);
  const scrollYRef = useRef(0);

  // 🔒 HARD SCROLL LOCK (until NEXT)
  useEffect(() => {
    const preventScroll = (e) => e.preventDefault();

    if (!scrollUnlocked) {
      scrollYRef.current = window.scrollY;

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";

      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);

      window.scrollTo(0, scrollYRef.current);
    }

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [scrollUnlocked]);

  const handleYes = () => {
    setAccepted(true);
  };

  const handleNext = () => {
    setScrollUnlocked(true); // 🔓 unlock scroll ONLY here

    setTimeout(() => {
      lettersRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };

  return (
    <>
      <Valentine onYes={handleYes} onNext={handleNext} />

      {accepted && (
        <>
          <div ref={lettersRef}>
            <LoveNotes />
          </div>
          <Surprise />
        </>
      )}
    </>
  );
}
