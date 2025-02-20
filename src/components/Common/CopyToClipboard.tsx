import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';

import CopyIcon from '../../assets/copy-icon.svg?react';

interface ICopyToClipboardProps {
  text: string;
  displayText?: string;
}

export const CopyToClipboard: React.FC<ICopyToClipboardProps> = ({
  text,
  displayText,
}) => {
  const [tooltipText, setTooltipText] = useState(text);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setTooltipText('Copied!');
      setTimeout(() => setTooltipText(text), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setTooltipText('Failed to copy');
    }
  };

  return (
    <>
      <div className="inline-flex items-center cursor-pointer hover:text-[var(--color-secondary)]">
        <span
          onClick={handleCopy}
          className="relative pr-2"
          data-tooltip-id={`tooltip-${text}`}
          data-tooltip-content={tooltipText}
        >
          {displayText || text}
        </span>
        <CopyIcon className="w-5 h-5" onClick={handleCopy} />
      </div>
      <Tooltip id={`tooltip-${text}`} place="top" className="!text-xs" />
    </>
  );
};
