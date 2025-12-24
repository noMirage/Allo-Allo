import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import pStyles from '../../styles.module.scss';
import { TUserDataWResume } from '../../types/types';
import { Link, useNavigate } from 'react-router-dom';
import { CREATE_RESUME, PROFILE_PATH } from '../../../../routs/routs';
import { useState } from 'react';
import { POST_ADD_RESUME } from '../../../../configs/configs';
import { utilServer } from '../../../../utils/js/utilServer';

interface IProps {
    comeBack: string;
    setData: React.Dispatch<React.SetStateAction<TUserDataWResume>>;
    dataResume: TUserDataWResume;
}

export function CreateStepSecond(props: IProps) {
    const { setData, comeBack, dataResume } = props;

    const [previews, setPreviews] = useState<string[]>([]);

    const navigate = useNavigate();

    function handleSelectImages(event: React.ChangeEvent<HTMLInputElement>) {

        const files = event.target.files;
        if (!files) return;

        const urls = Array.from(files).map(file =>
            URL.createObjectURL(file)
        );

        setPreviews(urls);

        setData((prevState) => {
            const newState = { ...prevState };
            newState.images = files;
            return newState;
        });
    }

    async function handleSubmit() {
        const formData = new FormData();
        formData.append('category', dataResume.category);
        formData.append('description', dataResume.description);
        formData.append('title', dataResume.title);
        if (dataResume.images && dataResume.images.length > 0) {
            Array.from(dataResume.images).forEach((file) => {
                formData.append('images[]', file);
            });
        }
        const data = await utilServer(POST_ADD_RESUME, 'post', formData);
        if (data.success) {
            navigate(PROFILE_PATH);
        }
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
                        onClick={handleSubmit}
                    >
                        Далі
                    </Link>
                </div>
            </div>
        </div >
    );
}