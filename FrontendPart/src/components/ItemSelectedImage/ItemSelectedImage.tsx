import { useState } from "react";
import styles from './styles.module.scss';
import { PATH_TO_STORE } from "../../configs/configs";
import iconDelete from '../../assets/global/delete.svg';
import { TPreviews } from "../../interfaces/global";


interface IProps {
    src: string;
    index: number;
    setPreviews: React.Dispatch<React.SetStateAction<TPreviews[] | TPreviews>>;
}

export function ItemSelectedImage(props: IProps) {

    const { src, index, setPreviews } = props;

    const [isShowDeleteIcon, setIsShowDeleteIcon] = useState<boolean>(false);

    function handleDeleteImage() {
        setPreviews((prevState) => {
            if (Array.isArray(prevState)) {
                let newState = [...prevState];
                newState = newState.filter((item, secondIndex) => secondIndex !== index);
                return newState;
            } else {
                let newState = { ...prevState };
                newState = {url: null};
                return newState;
            }
        });
    }

    return (
        <li onMouseLeave={() => setIsShowDeleteIcon(false)} onMouseEnter={() => setIsShowDeleteIcon(true)}>
            <div className={styles.body}>
                {isShowDeleteIcon && <div onClick={() => handleDeleteImage()} className={styles.icon}><img src={iconDelete} alt="" /></div>}
                {src.startsWith('blob:') ? <img src={src} /> : <img src={`${PATH_TO_STORE}${src}`} />}
            </div>
        </li>
    );
}