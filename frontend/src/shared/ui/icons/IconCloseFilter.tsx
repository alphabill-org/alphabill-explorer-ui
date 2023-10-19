import { IconProps } from "./types";

export const IconCloseFilter = ({ className }: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#ACA4E0"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2.25C6.5887 2.25 2.25 6.5887 2.25 12C2.25 17.4111 6.5887 21.75 12 21.75C17.411 21.75 21.75 17.4111 21.75 12C21.75 6.5887 17.4111 2.25 12 2.25ZM16.8751 15.51L15.5101 16.8749L12 13.3649L8.48995 16.8749L7.12491 15.51L10.635 12L7.12491 8.48995L8.48995 7.12514L12 10.635L15.51 7.12514L16.875 8.48995L13.365 12L16.8751 15.51Z"
      />
    </svg>
  );
};
