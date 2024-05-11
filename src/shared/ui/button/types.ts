import { ButtonHTMLAttributes } from "react"

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    isRounded?: boolean;
    hasShadow?: boolean;
    bgColor?: string;
    hoverColor?: string;
    inactiveColor?: string;
}