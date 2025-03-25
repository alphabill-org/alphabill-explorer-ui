import { ReactElement } from 'react';

interface ISwitchProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Switch({
  label,
  checked,
  onChange,
}: ISwitchProps): ReactElement {
  const handleToggle = (): void => {
    onChange(!checked);
  };

  return (
    <label className="relative mb-4 inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={handleToggle}
      />
      <div
        className="
          w-11 h-6
          bg-secondary-accent
          rounded-full
          peer
          dark:bg-gray-700
          peer-checked:bg-accent
          after:content-['']
          after:absolute
          after:top-0.5
          after:left-[2px]
          after:bg-white
          after:border-gray-300
          after:border
          after:rounded-full
          after:h-5
          after:w-5
          after:transition-all
          dark:border-gray-600
          peer-checked:after:translate-x-full
          peer-checked:after:border-white
        "
      />
      {label && <span className="ml-3 text-sm">{label}</span>}
    </label>
  );
}
