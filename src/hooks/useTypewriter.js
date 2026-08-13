import { useEffect, useState } from "react";

export function useTypewriter(examples, opts = {}) {
  const { typeSpeed = 55, deleteSpeed = 28, holdMs = 1400, pauseMs = 350 } = opts;
  const [text, setText] = useState("");

  useEffect(() => {
    let ei = 0;
    let ci = 0;
    let deleting = false;
    let timeout;

    const tick = () => {
      const full = examples[ei];
      if (!deleting) {
        ci++;
        setText(full.slice(0, ci));
        if (ci === full.length) {
          deleting = true;
          timeout = setTimeout(tick, holdMs);
          return;
        }
        timeout = setTimeout(tick, typeSpeed);
      } else {
        ci--;
        setText(full.slice(0, ci));
        if (ci === 0) {
          deleting = false;
          ei = (ei + 1) % examples.length;
          timeout = setTimeout(tick, pauseMs);
          return;
        }
        timeout = setTimeout(tick, deleteSpeed);
      }
    };

    timeout = setTimeout(tick, 700);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return text;
}
