import { ArrowLeftCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-semibold mt-4 text-gray-800">Page Not Found</h2>
        <p className="text-gray-500 mt-2">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => navigate('/')}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
        >
          <ArrowLeftCircle className="w-5 h-5" />
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;


