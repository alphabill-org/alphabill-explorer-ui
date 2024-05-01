import { IconProps } from "./types";

export const IconCaret = ({ className }: IconProps) => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="#08E8DE"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.46967 2.46967C0.762563 2.17678 1.23744 2.17678 1.53033 2.46967L5 5.93934L8.46967 2.46967C8.76256 2.17678 9.23744 2.17678 9.53033 2.46967C9.82322 2.76256 9.82322 3.23744 9.53033 3.53033L5.53033 7.53033C5.23744 7.82322 4.76256 7.82322 4.46967 7.53033L0.46967 3.53033C0.176777 3.23744 0.176777 2.76256 0.46967 2.46967Z"

      />
    </svg>
  );
};
