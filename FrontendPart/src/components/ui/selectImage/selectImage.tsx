import 'react-phone-input-2/lib/style.css';
import gStyles from "../../../styles/styles.module.scss";
import styles from "./styles.module.scss";
import { ReactNode } from 'react';
import { TPreviews } from '../../../interfaces/global';

interface IProps {
    setPreviews: React.Dispatch<React.SetStateAction<TPreviews[]>>;
    previews: TPreviews[];
    setData: React.Dispatch<React.SetStateAction<any>>;
    className?: string;
    children: ReactNode;
}

export function SelectImage(props: IProps) {
    const { setPreviews, setData, className = '', children, previews } = props;

    function handleSelectImages(event: React.ChangeEvent<HTMLInputElement>) {

        const files = event.target.files;
        if (!files) return;

        let data: TPreviews[] = Array.from(files).map(file => { return { url: URL.createObjectURL(file), file } });

        setPreviews((prevState) => {
            const newState = [...prevState, ...data];
            return newState;
        });

        setData((prevState: any) => {
            const newState = { ...prevState };
            newState.images = previews;
            return newState;
        });

    }

    return (
        <>
            <div className={`${styles.containerInput} ${className}`}>
                <input onChange={(event) => handleSelectImages(event)} className={`${styles.hiddenInput}`} accept="image/*" multiple type='file' name="images[]" />
                <input placeholder='Натисність щоб завантажити фотографії' className={`${styles.input} ${gStyles.textExtraBig}`} name="show" />
            </div>
            {children}
        </>
    );
}
