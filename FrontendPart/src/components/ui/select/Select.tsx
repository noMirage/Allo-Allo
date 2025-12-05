import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import ListItemNoMultiplyMode from './components/ListItemNoMultiplyMode/ListItemNoMultiplyMode';
import ListItemMultiplyMode from './components/ListItemMultiplyMode/ListItemMultiplyMode';

interface IProps {
    options: string[];
    firstOption?: number;
    className?: string;
    multiplyMode?: boolean;
}

export default function Select(props: IProps) {

    const { options, firstOption = null, className = '', multiplyMode } = props;

    const [saveHeight, setSaveHeight] = useState<number>(0);

    const refSelect = useRef<HTMLDivElement | null>(null);
    const refContent = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        if (refContent.current && refContent.current.getBoundingClientRect().height > 0) {
            setSaveHeight(refContent.current.getBoundingClientRect().height);
            refContent.current.style.maxHeight = '0px';
        }
    }, [refContent.current]);

    function handleOpenOptions(): void {
        if (refContent.current && refSelect.current) {
            refSelect.current.classList.toggle(styles.activeSelect);

            if (refContent.current.getBoundingClientRect().height > 0) {
                refContent.current.style.maxHeight = `0px`;
            } else {
                refContent.current.style.maxHeight = `${saveHeight}px`;
            }

        }
    }

    function handleSelectOption(func: () => void): void {
        if (refContent.current && refSelect.current) {
            func();
            refSelect.current.classList.remove(styles.activeSelect);
            refContent.current.style.maxHeight = '0px';
        }
    }

    if (multiplyMode) {
        return (
            <ListItemMultiplyMode 
                className={className}
                options={options}
                handleOpenOptions={handleOpenOptions}
                refContent={refContent}
                refSelect={refSelect}
                handleSelectOption={handleSelectOption}
            />
        );
    } else {
        return (
            <ListItemNoMultiplyMode
                className={className}
                options={options}
                handleOpenOptions={handleOpenOptions}
                refContent={refContent}
                refSelect={refSelect}
                handleSelectOption={handleSelectOption}
                firstOption={firstOption}
            />
        );
    }

}