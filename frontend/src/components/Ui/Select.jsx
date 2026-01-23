import React, { useState } from "react";

export const Select = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");

  const handleSelect = (newValue) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  // Recursively inject props
  const injectProps = (element) => {
    if (!React.isValidElement(element)) return element;

    const propsToInject = {};
    if (element.type === SelectTrigger) {
      propsToInject.onClick = () => setIsOpen(!isOpen);
    }
    if (element.type === SelectValue) {
      propsToInject.selected = selectedValue;
    }
    if (element.type === SelectContent) {
      propsToInject.open = isOpen;
    }
    if (element.type === SelectItem) {
      propsToInject.onSelect = handleSelect;
    }

    const newChildren = React.Children.map(element.props.children, injectProps);

    return React.cloneElement(element, propsToInject, newChildren);
  };

  return <div className="relative">{React.Children.map(children, injectProps)}</div>;
};

export const SelectTrigger = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="w-full flex justify-between items-center border border-gray-300 rounded px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500"
  >
    {children}
    <span className="ml-2">&#9662;</span>
  </button>
);

export const SelectValue = ({ placeholder, selected }) => (
  <span className={selected ? "" : "text-gray-400"}>
    {selected || placeholder}
  </span>
);

export const SelectContent = ({ open, children }) =>
  open ? (
    <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded shadow-lg z-50">
      {children}
    </div>
  ) : null;

export const SelectItem = ({ value, onSelect }) => (
  <div
    onClick={() => onSelect(value)}
    className="px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer"
  >
    {value}
  </div>
);
