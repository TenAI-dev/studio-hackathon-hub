import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  className?: string;
  onComplete?: (value: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  value,
  onChange,
  length = 4,
  disabled = false,
  className = '',
  onComplete
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    onChange(pastedData);
    
    // Focus last filled input or first empty one
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
    setActiveIndex(nextIndex);
    
    // Check if complete
    if (pastedData.length === length) {
      onComplete?.(pastedData);
    }
  };

  // Handle input change
  const handleChange = (index: number, inputValue: string) => {
    const newValue = value.split('');
    newValue[index] = inputValue.slice(-1); // Take only last character
    const updatedValue = newValue.join('');
    
    onChange(updatedValue);

    // Move to next input if value entered
    if (inputValue && index < length - 1) {
      const nextIndex = index + 1;
      inputRefs.current[nextIndex]?.focus();
      setActiveIndex(nextIndex);
    }

    // Check if complete
    if (updatedValue.length === length) {
      onComplete?.(updatedValue);
    }
  };

  // Handle key down
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0) {
        // Move to previous input if current is empty
        const prevIndex = index - 1;
        inputRefs.current[prevIndex]?.focus();
        setActiveIndex(prevIndex);
      } else {
        // Clear current input
        const newValue = value.split('');
        newValue[index] = '';
        onChange(newValue.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  return (
    <div className={cn("flex gap-4 justify-center", className)}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={() => setActiveIndex(index)}
          onPaste={handlePaste}
          disabled={disabled}
          className={cn(
            "w-14 h-14 text-center text-2xl font-semibold",
            "border-2 rounded-lg transition-studio",
            "focus:outline-none focus:border-studio-orange focus:ring-2 focus:ring-studio-orange/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            activeIndex === index ? "border-studio-orange" : "border-gray-300"
          )}
        />
      ))}
    </div>
  );
};