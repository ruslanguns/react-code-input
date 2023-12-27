import React, { useState, ChangeEvent, KeyboardEvent, useRef } from 'react';
import { cn } from './utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const OtpInput: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number, moveCursorToEnd: boolean = false) => {
    const input = inputRefs.current[index];
    if (input) {
      input.focus();
      if (moveCursorToEnd) {
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }
  };

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 5) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    switch (e.key) {
      case 'Backspace':
        if (index > 0 && !e.currentTarget.value) {
          focusInput(index - 1, true);
        }
        break;
      case 'ArrowLeft':
        if (index > 0) {
          focusInput(index - 1, true);
        }
        break;
      case 'ArrowRight':
        if (index < 5) {
          focusInput(index + 1);
        }
        break;
      default:
        break;
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const data = e.clipboardData
      .getData('text')
      .split('')
      .filter((_, index) => index < 6);
    setOtp([...data, ...new Array(6 - data.length).fill('')]);
    focusInput(data.length < 6 ? data.length : 5);
  };

  return (
    <div className="grid grid-cols-[repeat(6,_35px)] gap-2 justify-center">
      {otp.map((data, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={data}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(e.target, index)
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(e, index)
          }
          className={cn(
            'flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-inherit placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 text-neutral-700 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
            'text-center text-lg'
          )}
          onPaste={handlePaste}
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
};

export default OtpInput;
