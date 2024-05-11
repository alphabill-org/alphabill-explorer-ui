import { NavLink } from "react-router-dom"
import { DropdownProps } from "./types"

const Dropdown = ({items, className} : DropdownProps) => {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <NavLink key={index} to={item.link}>
          {item.label}
        </NavLink>
      ))}
    </div>
  )
}

export default Dropdown