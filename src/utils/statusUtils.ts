import ErrorIcon from '../assets/error-ico.svg?react';
import SuccessIcon from '../assets/success-ico.svg?react';
import WarningIcon from '../assets/warning-ico.svg?react';

export function mapSuccessIndicator(status: number): {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
} {
  switch (status) {
    case 1:
      return { Icon: SuccessIcon, label: 'Success' };
    case 2:
      return { Icon: WarningIcon, label: 'Out of Gas' };
    case 0:
    default:
      return { Icon: ErrorIcon, label: 'Failed' };
  }
}
