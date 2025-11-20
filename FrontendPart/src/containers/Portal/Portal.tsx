import styles from './styles.module.scss';
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface IProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode;
    className?: string;
}

export default function Portal(props: IProps) {

    const { isOpen, children, className = "", setIsOpen } = props;

    const refBackground = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (event.target === refBackground.current || event.target === refBackground.current?.children[0]) {
                setIsOpen(false);
            }
        }
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    if (isOpen) {
        document.body.style.overflow = 'hidden';
        return createPortal(<div className={`${styles.modal} ${className}`}><div ref={refBackground} className={styles.background}>{children}</div></div>, document.getElementById('portal')!);
    } else {
        document.body.style.overflow = 'auto';
        return <></>;
    }
}