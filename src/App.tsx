import OtpInput from "./otp-input";

function App() {
  return (
    <div className="bg-gradient-to-r pt-16 h-screen w-screen from-violet-800 to-fuchsia-900 flex flex-col text-white font-sans font-semibold text-2xl space-y-4 text-center ">
      <h4>Enter a code</h4>
      <OtpInput />
    </div>
  );
}

export default App;
