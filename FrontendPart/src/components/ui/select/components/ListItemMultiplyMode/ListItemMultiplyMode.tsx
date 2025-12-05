import { useState } from 'react';
import styles from './styles.module.scss';
import gStyles from '../../../../../styles/styles.module.scss';
import pStyles from '../../styles.module.scss';
import { ReactComponent as Arrow } from '../../../../../assets/global/singleArrow.svg';
import ItemList from './components/ItemList/ItemList';

interface IProps {
    refSelect: React.RefObject<HTMLDivElement | null>;
    options: string[];
    handleOpenOptions: () => void;
    refContent: React.RefObject<HTMLUListElement | null>;
    handleSelectOption: (func: () => void) => void;
    className: string;
}

export default function ListItemMultiplyMode(props: IProps) {
    const { refSelect, options, handleOpenOptions, refContent, handleSelectOption, className } = props;

    const [selectedOption, setSelectedOption] = useState<string[]>([]);

    return (
        <div ref={refSelect} className={`${styles.select} ${className}`}>
            <div onClick={handleOpenOptions} className={pStyles.header}>
                <p className={gStyles.textBig}>{selectedOption.map((item, _) => <span className={styles.heading}>{item}<span>/</span></span>)}</p>
                <Arrow className={styles.iconArrow} />
            </div>
            <ul className={styles.list} ref={refContent}>
                {options.map((item, index) => {
                        return (
                            <ItemList
                                name={item}
                                setSelectedOption={setSelectedOption}
                                handleSelectOption={handleSelectOption}
                                options={options}
                                index={index}
                            />
                        )
                })}
            </ul>
        </div>
    );
}