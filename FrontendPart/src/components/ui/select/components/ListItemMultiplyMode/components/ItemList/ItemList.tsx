import { useState } from 'react';
import styles from './styles.module.scss';
import gStyles from '../../../../../../../styles/styles.module.scss';
import Checkbox from '../../../../../checkbox/checkbox';

interface IProps {
    setSelectedOption: React.Dispatch<React.SetStateAction<string[]>>;
    name: string;
    handleSelectOption: (func: () => void) => void;
    options: string[];
    index: number;
}

export default function ItemList(props: IProps) {
    const { setSelectedOption, handleSelectOption, name, options, index } = props;

    const [isSelect, setIsSelect] = useState<boolean>(false);

    function handleSelected() {
        setSelectedOption((prevState) => {
            let newState = [...prevState];
            if (!newState.find((item, _) => item === options[index])) {
                newState.push(options[index]);
            } else {
                newState = newState.filter((item, _) => item !== options[index]);
            }
            return newState;
        })
    }

    return (
        <li onClick={() => { handleSelectOption(() => { handleSelected() }); setIsSelect(!isSelect) }} key={name} className={`${styles.item} ${gStyles.textBig}`}>
            <Checkbox className={styles.checkbox} valueCheckbox={isSelect} />
            <p>{name}</p>
        </li>
    );
}