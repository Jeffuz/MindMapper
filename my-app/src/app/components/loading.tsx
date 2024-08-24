import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/mindmapper_logo.png"
        alt="Logo"
        width={100}
        height={50}
        className="w-auto h-12 sm:h-14 mb-3"
      />
      <div className="flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
