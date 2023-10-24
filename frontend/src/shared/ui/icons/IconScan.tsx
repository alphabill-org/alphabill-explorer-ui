import { IconProps } from "./types";

export const IconScan = ({ className }: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#08E8DE"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.00002 4H4.00004L4 9.00002M20 9.00002V4.00004L15 4M15 20.0001H20L20 15M4 15L4 20L9.00002 20.0001"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
