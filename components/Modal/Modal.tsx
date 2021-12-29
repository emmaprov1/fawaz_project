import ReactDom from 'react-dom';
import { FC } from 'react';

const Modal: FC<{ close: () => void }> = ({ children, close }) => {
  return ReactDom.createPortal(
    <div className="position-fixed modall">
      <div className="modall-bg" onClick={close}></div>
      {children}
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
