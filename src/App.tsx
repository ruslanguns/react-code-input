import React from "react";
import { OtpInput, OtpInputRef } from "./otp-input";
import { Slider } from "./slider";

function App() {
  const [val, setValue] = React.useState("");
  const [size, setSize] = React.useState(6);
  const otpRef = React.useRef<OtpInputRef>(null);

  const onClear = () => {
    otpRef.current?.clear();
  };

  return (
    <div className="bg-gradient-to-r pt-16 h-screen w-screen from-violet-800 to-fuchsia-900 flex flex-col text-white font-sans font-semibold text-2xl gap-4 items-center ">
      <h4>Enter a code</h4>

      <OtpInput ref={otpRef} onValueChange={setValue} size={size} />

      <Slider
        defaultValue={[5]}
        max={10}
        min={1}
        step={1}
        className="w-[150px] mt-10"
        onValueChange={([value]) => setSize(value)}
      />
      <h4 className="text-sm font-thin flex flex-col items-center justify-center">
        <span className="font-bold text-2xl">{size}</span>
        SIZE
      </h4>

      {val && <div className="mt-10">{val}</div>}

      {val && (
        <button
          onClick={onClear}
          className="text-sm hover:underline font-light"
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default App;
