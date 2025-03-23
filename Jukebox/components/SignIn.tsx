import React from "react";

const SignIn = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <button className="w-64 py-3 bg-purple-300 text-black rounded-full text-lg font-semibold shadow-md hover:bg-purple-400">
          Sign up free
        </button>
        <button className="w-64 py-3 bg-black text-white border border-gray-500 rounded-full text-lg font-semibold shadow-md flex items-center justify-center gap-2 hover:bg-gray-900">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google logo" className="w-5 h-5" />
          Continue with Google
        </button>
        <button className="text-white text-lg font-medium hover:underline">
          Login
        </button>
      </div>
    </div>
  );
}

export default SignIn;

