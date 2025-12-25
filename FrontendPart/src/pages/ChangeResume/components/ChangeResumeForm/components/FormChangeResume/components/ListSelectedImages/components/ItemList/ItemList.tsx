import { useState } from "react";
import styles from './styles.module.scss';
import { PATH_TO_STORE } from "../../../../../../../../../../configs/configs";
import iconDelete from '../../../../../../../../../../assets/global/delete.svg';
import { TUserDataWResumeWithoutCategory } from "../../../../../../types/types";
import { TPreviews } from "../../../../../../../../../../interfaces/global";


interface IProps {
    src: string;
    index: number;
    setPreviews: React.Dispatch<React.SetStateAction<TPreviews[]>>;
}

export function ItemList(props: IProps) {

    const { src, index, setPreviews } = props;

    const [isShowDeleteIcon, setIsShowDeleteIcon] = useState<boolean>(false);

    function handleDeleteImage() {
        setPreviews((prevState) => {
            let newState = [...prevState];
            newState = newState.filter((item, secondIndex) => secondIndex !== index);
            return newState;
        });
    }

    return (
        <li key={src} onMouseLeave={() => setIsShowDeleteIcon(false)} onMouseEnter={() => setIsShowDeleteIcon(true)}>
            <div className={styles.body}>
                {isShowDeleteIcon && <div onClick={() => handleDeleteImage()} className={styles.icon}><img src={iconDelete} alt="" /></div>}
                {src.startsWith('blob:') ? <img src={src} /> : <img src={`${PATH_TO_STORE}${src}`} />}
            </div>
        </li>
    );
}