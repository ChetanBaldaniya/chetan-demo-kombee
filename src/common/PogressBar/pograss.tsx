import React, { useEffect, useState } from "react";

const InfiniteProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 20); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-1 bg-gray-300 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full bg-blue-600"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default InfiniteProgressBar;
