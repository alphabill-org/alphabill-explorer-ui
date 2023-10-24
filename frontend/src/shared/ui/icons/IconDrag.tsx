import { IconProps } from "./types";

export const IconDrag = ({ className }: IconProps) => {
  return (
    <svg
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      stroke="#D8DEFF"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5.8 2.33333H7V1H5.8V2.33333ZM1 2.33333H2.2V1H1V2.33333ZM5.8 7.66667H7V6.33333H5.8V7.66667ZM1 7.66667H2.2V6.33333H1V7.66667ZM5.8 13H7V11.6667H5.8V13ZM1 13H2.2V11.6667H1V13Z"
        stroke-width="1.5"
      />
    </svg>
  );
};
