"use client";
import { useTypingEffect } from "./hooks/useTypingEffect";
const TypingHeader = () => {
  const texts = ['Person Name', 'Car No.', 'Business Name', 'Project Name'];
  const typedText = useTypingEffect(texts); // Use the hook

  return (
    <h2 className="text-xl font-semibold mb-4 text-yellow-700">
      Enter {typedText}
      <span className="animate-pulse">|</span> {/* Blinking cursor effect */}
    </h2>
  );
};

export default TypingHeader;