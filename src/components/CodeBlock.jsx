import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ code }) => {
  const [buttonText, setButtonText] = useState("Copy");

  const handleCopy = () => {
    setButtonText("Copied");
    setTimeout(() => setButtonText("Copy"), 2000); // Reset text after 2 seconds
  };

  return (
    <div style={{ position: "relative" }}>
      <CopyToClipboard text={code} onCopy={handleCopy}>
        <button style={{ position: "absolute", top: 15, right: 15 }} className="text-white">
          {buttonText}
        </button>
      </CopyToClipboard>
      <SyntaxHighlighter language="python" style={darcula}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
