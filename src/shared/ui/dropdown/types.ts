export type DropdownItem = {
  label: string,
  link: string,
}

export type DropdownProps = {
  items: DropdownItem[],
  className: string,
}