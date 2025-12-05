import { useState } from 'react';
import styles from './styles.module.scss';
import gStyles from '../../../../../styles/styles.module.scss';
import pStyles from '../../styles.module.scss';
import { ReactComponent as Arrow } from '../../../../../assets/global/singleArrow.svg';

interface IProps {
    refSelect: React.RefObject<HTMLDivElement | null>;
    options: string[];
    handleOpenOptions: () => void;
    refContent: React.RefObject<HTMLUListElement | null>;
    handleSelectOption: (func: () => void) => void;
    className: string;
    firstOption: number | null;
}

export default function ListItemNoMultiplyMode(props: IProps) {
    const { refSelect, options, handleOpenOptions, refContent, handleSelectOption, className, firstOption } = props;

    const [selectedOption, setSelectedOption] = useState<string>(firstOption === null ? options[0] : options[firstOption]);

    return (
        <div ref={refSelect} className={`${styles.select} ${className}`}>
            <div onClick={handleOpenOptions} className={pStyles.header}>
                <p className={gStyles.textBig}>{selectedOption}</p>
                <Arrow className={styles.iconArrow} />
            </div>
            <ul className={styles.list} ref={refContent}>
                {options.map((item, index) => {
                    if (item !== selectedOption) {
                        return (
                            <li onClick={() => handleSelectOption(() => {setSelectedOption(options[index])})} key={item} className={`${styles.item} ${gStyles.textBig}`}>{item}</li>
                        )
                    }
                })}
            </ul>
        </div>
    );
}