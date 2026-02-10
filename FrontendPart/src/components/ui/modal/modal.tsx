import styles from './styles.module.scss';
import ReactDOM from 'react-dom';
import { ReactNode, useEffect } from 'react';

interface IProps {
  children: ReactNode,
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  isModal: boolean;
}

export function Modal(props: IProps) {
  const { children, setIsModal, isModal } = props;

  function handleCloseModal(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (event.target === event.currentTarget) {
      setIsModal(false);
    }
  };

  useEffect(() => {

    if (isModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = 'auto' };

  }, [isModal]);

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div onClick={(event) => handleCloseModal(event)} className={styles.moduleBody}>
        {children}
      </div>
    </div>,
    document.getElementById('modal')!,
  );
}
