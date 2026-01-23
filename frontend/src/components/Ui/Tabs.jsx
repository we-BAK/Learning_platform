import * as React from 'react';
import { cn } from '../../lib/utils';

const TabsContext = React.createContext({
  value: undefined,
  onValueChange: () => {},
});

const Tabs = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className,
  ...props
}) => {
  const [value, setValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : value;

  function handleChange(newValue) {
    if (!isControlled) {
      setValue(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  }

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleChange }}>
      <div className={cn('tabs-root', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="tablist"
      className={cn('tabs-list flex border-b border-gray-300 dark:border-gray-700', className)}
      {...props}
    >
      {children}
    </div>
  );
});
TabsList.displayName = 'TabsList';

const TabsTrigger = React.forwardRef(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  const isSelected = context.value === value;

  function onClick() {
    context.onValueChange(value);
  }

  return (
    <button
      ref={ref}
      role="tab"
      aria-selected={isSelected}
      className={cn(
        'tabs-trigger cursor-pointer rounded-t-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none',
        isSelected
          ? 'bg-primary text-white dark:bg-primary/90'
          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
});
TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = React.forwardRef(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  if (context.value !== value) {
    return null;
  }

  return (
    <div
      ref={ref}
      role="tabpanel"
      className={cn('tabs-content mt-2', className)}
      {...props}
    >
      {children}
    </div>
  );
});
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
