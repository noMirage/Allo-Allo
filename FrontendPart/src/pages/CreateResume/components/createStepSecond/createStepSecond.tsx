import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import pStyles from '../../styles.module.scss';
import { TUserDataWResume } from '../../types/types';
import { Link } from 'react-router-dom';
import { CREATE_RESUME } from '../../../../routs/routs';
import { useState } from 'react';

interface IProps {
    comeBack: string;
    setData: React.Dispatch<React.SetStateAction<TUserDataWResume>>;
}

export function CreateStepSecond(props: IProps) {
    const { setData, comeBack } = props;

    const [previews, setPreviews] = useState<string[]>([]);

    function handleSelectImages(event: React.ChangeEvent<HTMLInputElement>) {

        const files = event.target.files;
        if (!files) return;

        const urls = Array.from(files).map(file =>
            URL.createObjectURL(file)
        );

        setPreviews(urls);

        setData((prevState) => {
            const newState = { ...prevState };
            newState.images = ""
            return newState;
        });
    }

    return (
        <div className={`${styles.wrapper}`}>
            <div className={styles.container}>
                <div className={`${styles.body}`}>
                    <p className={`${gStyles.textExtraLarge} ${styles.title}`} >Завантажте фотографії ваших робіт</p>
                    <div className={styles.containerInput}>
                        <p className={`${gStyles.textLarge}`}>Натисни, щоб завантажити фото</p>
                        <input onChange={(event) => handleSelectImages(event)} className={`${styles.input}`} accept="image/*" multiple type='file' name='photos' />
                    </div>
                </div>
                {previews.length > 0 &&
                    <ul className={styles.listImages}>
                        {previews.map((src) => (
                            <li key={src}>
                                <img src={src} />
                            </li>
                        ))}
                    </ul>}
                <div className={pStyles.containerButtons}>
                    <Link className={`${gStyles.textBig}`} to={`${CREATE_RESUME}${comeBack}`}>
                        Назад
                    </Link>
                    <Link
                        className={`${gStyles.textBig}`}
                        to=''
                    >
                        Далі
                    </Link>
                </div>
            </div>
        </div >
    );
}