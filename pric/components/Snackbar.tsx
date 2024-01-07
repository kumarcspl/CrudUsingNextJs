import { useState, useEffect } from 'react';
import classNames from 'classnames';

interface SnackbarProps {
  message: string;
  severity: 'success' | 'error';
  isOpen: boolean;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({
  message,
  severity,
  isOpen,
  onClose,
}) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <div
      className={classNames(
        'fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4',
        {
          'opacity-100': open,
          'opacity-0': !open,
          'pointer-events-none': !open,
        }
      )}
    >
      <div className={classNames('max-w-screen-md mx-auto')}>
        <div
          className={classNames(
            'rounded-md p-2',
            {
              'bg-green-500': severity === 'success',
              'bg-red-500': severity === 'error',
            },
            'flex items-center justify-between'
          )}
        >
          <span>{message}</span>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Snackbar;
