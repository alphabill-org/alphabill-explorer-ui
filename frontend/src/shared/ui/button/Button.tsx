import { ButtonProps } from "./types"
//TODO

//Props: Shadow, Main, Active, Hover
//Colors (default - primamry)
export const Button = (
  { className, children, ...props } : ButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center transition duration-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}