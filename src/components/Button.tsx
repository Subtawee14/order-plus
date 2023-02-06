import classNames from 'classnames';
import Spinner from './Spinner';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  buttonType?: 'primary' | 'secondary';
}

export default function Button({
  children,
  loading,
  buttonType,
  ...buttonProps
}: Props) {
  const buttonColor = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
  };

  return (
    <button
      {...buttonProps}
      className={classNames(
        'flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none',
        buttonColor[buttonType || 'primary']
      )}
    >
      {loading && (
        <div className="w-5 h-5 mr-4">
          <Spinner />
        </div>
      )}
      {children}
    </button>
  );
}
