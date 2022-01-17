import Link from 'next/link';
import { FC } from 'react';

const Error500: FC = () => {
  return (
    <div className="container-fluid my-5">
      <div className="text-center">
        <div className="error mx-auto" data-text="500">
          500
        </div>
        <p className="lead text-gray-800 mb-5">something went wrong</p>
        <p className="text-gray-500 mb-0">
          It looks like you found a glitch in the matrix...
        </p>
        <Link href="/">
          <a>← Back to Dashboard</a>
        </Link>
      </div>
    </div>
  );
};

export default Error500;
