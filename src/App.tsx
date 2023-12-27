import React from "react";
import { OtpInput, OtpInputRef } from "./otp-input";

function App() {
  const [val, setValue] = React.useState("");
  const otpRef = React.useRef<OtpInputRef>(null);

  const onClear = () => {
    otpRef.current?.clear();
  };

  return (
    <div className="bg-gradient-to-r pt-16 h-screen w-screen from-violet-800 to-fuchsia-900 flex flex-col text-white font-sans font-semibold text-2xl space-y-4 text-center ">
      <h4>Enter a code</h4>
      <OtpInput ref={otpRef} onValueChange={setValue} />

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
