import { ReactNode, useEffect, useState } from 'react';
import styles from './styles.module.scss';


interface IProps {
    children: ReactNode;
    interaction?: 'hover' | 'click';
    activeElement: React.RefObject<HTMLAnchorElement | null>;
    className?: string;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean;
}

export function DropDownMenu(props: IProps) {
    const { children, interaction = 'click', activeElement, className = '', setIsOpen, isOpen } = props;


    function handleChangeValue() {
        setIsOpen(!isOpen);
    }

    useEffect(() => {

        if (!activeElement.current) return;

        if (interaction === 'hover') {
            activeElement.current.addEventListener("mouseenter", handleChangeValue);
            activeElement.current.addEventListener("mouseleave", handleChangeValue);

            return () => {
                activeElement.current?.removeEventListener('mouseenter', handleChangeValue);
                activeElement.current?.removeEventListener('mouseleave', handleChangeValue);
            }
        } else if (interaction === 'click') {
            activeElement.current.addEventListener("click", handleChangeValue);
            return () => {
                activeElement.current?.removeEventListener('click', handleChangeValue);
            }
        }

    }, [activeElement, interaction, isOpen]);


    if (isOpen) {
        return (
            <div className={`${styles.wrapper} ${className}`}>
                {children}
            </div>
        );
    } else {
        return (
            <></>
        );
    }
}