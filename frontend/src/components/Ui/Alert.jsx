import React from 'react';
import { AlertCircle } from "lucide-react"

/**
 * Alert component to display feedback messages.
 *
 * @param {object} props - The component props.
 * @param {('default' | 'destructive')} [props.variant='default'] - The variant of the alert.
 * - `default`:  Standard alert style.
 * - `destructive`: Indicates an error or destructive action.
 * @param {string} [props.className] - Optional class name for custom styling.
 * @param {React.ReactNode} [props.children] - The content of the alert.
 * @param {string} [props.title] - The title of the alert.
 * @param {string} [props.description] - The description of the alert.
 */
const Alert: React.FC<{
  variant?: 'default' | 'destructive';
  className?: string;
  children?: React.ReactNode;
  title?: string;
  description?: string;
}> = ({
  variant = 'default',
  className,
  children,
  title,
  description
}) => {
  const baseClasses = "relative w-full rounded-md border";
  const variantClasses =
    variant === 'destructive'
      ? 'bg-destructive text-destructive-foreground border-destructive'
      : 'bg-background text-foreground border-border';

  const combinedClasses = `${baseClasses} ${variantClasses} ${className || ''}`;

  return (
    <div className={combinedClasses} role="alert">
      {variant === 'destructive' && (
        <AlertCircle className="h-4 w-4" />
      )}
      {title && <h4 className="font-semibold">{title}</h4>}
      {description && <p className="text-sm">{description}</p>}
      {children}
    </div>
  );
};

/**
 * Title component for the Alert.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} [props.children] - The content to display as the title.
 */
const AlertTitle: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="font-semibold">{children}</div>;
};

/**
 * Description component for the Alert.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} [props.children] - The content to display as the description.
 */
const AlertDescription: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return <p className="text-sm">{children}</p>;
};

export { Alert, AlertTitle, AlertDescription };
