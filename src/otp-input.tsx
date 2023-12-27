import React, { useEffect } from "react";

export type OtpInputRef = {
  clear: () => void;
};

type Props = {
  size?: number;
  onValueChange?: (value: string) => void;
};

export const OtpInput = React.forwardRef<OtpInputRef, Props>(
  ({ size = 5, onValueChange }, ref) => {
    const [otp, setOtp] = React.useState<string[]>(new Array(size).fill(""));
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    React.useEffect(() => {
      const newVal = new Array(size).fill("");

      setOtp(newVal);

      onValueChange && onValueChange(newVal.join(""));

      inputRefs.current[0]?.focus();
    }, [size]);

    const clearInput = () => {
      const newVal = new Array(size).fill("");

      setOtp(newVal);

      onValueChange && onValueChange(newVal.join(""));

      inputRefs.current[0]?.focus();
    };

    const focusInput = (index: number, moveCursorToEnd: boolean = false) => {
      const input = inputRefs.current[index];

      input?.focus();

      if (moveCursorToEnd) {
        input?.setSelectionRange(input.value.length, input.value.length);
      }
    };

    const handleChange = (element: HTMLInputElement, index: number) => {
      if (isNaN(Number(element.value))) return;

      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      onValueChange && onValueChange(newOtp.join(""));

      if (element.value && index < size - 1) {
        focusInput(index + 1);
      }
    };

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number
    ) => {
      switch (e.key) {
        case "Backspace":
          if (index > 0 && !e.currentTarget.value) {
            focusInput(index - 1, true);
          }
          break;
        case "ArrowLeft":
          if (index > 0) {
            focusInput(index - 1, true);
          }
          break;
        case "ArrowRight":
          if (index < size - 1) {
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
        .getData("text")
        .split("")
        .filter((_, index) => index < size);
      setOtp([...data, ...new Array(size - data.length).fill("")]);
      focusInput(data.length < size ? data.length : size - 1);
    };

    React.useImperativeHandle(ref, () => ({
      clear: clearInput,
    }));

    return (
      <div
        style={{ gridTemplateColumns: `repeat(${size}, 35px)` }}
        className="grid gap-2 justify-center"
      >
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            value={data}
            maxLength={1}
            ref={(el) => (inputRefs.current[index] = el)}
            inputMode="numeric"
            autoFocus={index === 0}
            onPaste={handlePaste}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target, index)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              handleKeyDown(e, index)
            }
            className="text-center text-lg flex h-10 w-full rounded-md border border-input px-3 py-2 ring-offset-inherit placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 text-neutral-700 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          />
        ))}
      </div>
    );
  }
);
