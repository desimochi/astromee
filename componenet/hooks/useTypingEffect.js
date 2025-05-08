
"use client";
import { useState, useEffect } from 'react';

export const useTypingEffect = (texts, typingSpeed = 120, pause = 400) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0); // current text index
  const [subIndex, setSubIndex] = useState(0); // current character
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index >= texts.length) return;

    if (!deleting && subIndex === texts[index].length) {
      setTimeout(() => setDeleting(true), pause);
      return;
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
      setDisplayedText(texts[index].substring(0, subIndex));
    }, deleting ? typingSpeed / 2 : typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, texts, typingSpeed, pause]);

  return displayedText;
};
