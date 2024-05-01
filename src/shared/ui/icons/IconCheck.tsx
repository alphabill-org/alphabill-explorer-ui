import { IconProps } from "./types";

export const IconCheck = ({ className }: IconProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#08E8DE"
      fill="none"
      className={className}
    >
      <path d="M2 8L6 12L14 4" stroke-width="1.5" stroke-linecap="round" />
    </svg>
  );
};
