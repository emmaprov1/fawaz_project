import Link from 'next/link';
import { FC } from 'react';

const Error404: FC = () => {
  return (
    <div className="container-fluid my-5">
      <div className="text-center">
        <div className="error mx-auto" data-text="404">
          404
        </div>
        <p className="lead text-gray-800 mb-5">Page Not Found</p>
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

export default Error404;
