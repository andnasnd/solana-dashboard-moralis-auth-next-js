import React, { useRef, useEffect, useState } from "react"

export default function ClipboardCopy({ copyText }) {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <input value={copyText} readOnly size={copyText.length - 2} /> {''}
      {/* Bind our handler function to the onClick button property */}
      <button onClick={handleCopyClick}>
        <span>{isCopied ? '✅' : '📋'}</span>
      </button>
    </>
  );
}