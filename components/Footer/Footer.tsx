import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="sticky-footer bg-white">
      <div className="container my-auto">
        <div className="copyright text-center my-auto">
          <span>Copyright © Your Website {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
