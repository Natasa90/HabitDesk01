import { useState } from "react";

export const usePorchForm = () => {
  const [text, setText] = useState<string>("");
  const [source, setSource] = useState<string>("");

  const resetForm = () => {
    setText("");
    setSource("");
  };

  return {
    text,
    setText,
    source,
    setSource,
    resetForm,
  };
};