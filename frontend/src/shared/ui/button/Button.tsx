import { ButtonProps } from "./types"
//TODO

//Props: Shadow, Main, Active, Hover
//Colors (default - primamry)
export const Button = (
  { className, 
    hasShadow = false, 
    bgColor = "bg-sky-400", 
    hoverColor = "bg-purple-700", 
    inactiveColor = "bg-purple-400",
    isRounded = false, 
    children, ...props } : ButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center ${className} ${isRounded && "rounded-full"} ${bgColor} ${hasShadow && "shadow-button"} transition hover:${hoverColor} duration-500 disabled:bg-${inactiveColor}`}
      {...props}
    >
      {children}
    </button>
  )
}