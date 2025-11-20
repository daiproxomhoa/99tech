import React from "react";
import { CloseIcon } from "../assets";
import clsx from "clsx";

interface DialogProps {
  open?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  children,
  className,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      data-testid="dialog-container"
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
        data-testid="dialog-backdrop"
      />
      <div
        className={clsx(
          "bg-gray-900 rounded-lg shadow-lg z-10 max-w-md w-full border border-gray-700",
          "max-h-[calc(100vh-4rem)] overflow-y-auto",
          "flex flex-col"
        )}
      >
        <div className="flex gap-2 items-center py-3 px-4">
          <h2 className="text-lg font-semibold flex-1 text-start">{title}</h2>
          <button
            className="cursor-pointer"
            onClick={() => {
              onClose?.();
            }}
          >
            <CloseIcon />
          </button>
        </div>
        <div className={clsx("flex flex-col flex-1 overflow-auto", className)}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
