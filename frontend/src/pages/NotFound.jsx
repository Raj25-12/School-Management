import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { Button, Card } from '../components/common';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 px-4">
      <Card className="text-center max-w-md p-8 sm:p-10 shadow-2xl space-y-4">
        <h1 className="text-7xl sm:text-8xl font-black text-emerald-600 dark:text-emerald-400">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold">Page Not Found</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <div className="pt-2 flex flex-wrap gap-3 justify-center">
          <Button
            variant="secondary"
            icon={ArrowLeft}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Link to="/login">
            <Button variant="emerald" icon={Home}>
              Go to Login
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default React.memo(NotFound);
