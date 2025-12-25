import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import pStyles from '../../styles.module.scss';
import { TUserDataWResume } from '../../types/types';
import { Link, useNavigate } from 'react-router-dom';
import { CREATE_RESUME, PROFILE_PATH } from '../../../../routs/routs';
import { useState } from 'react';
import { POST_ADD_RESUME } from '../../../../configs/configs';
import { utilServer } from '../../../../utils/js/utilServer';
import { update } from '../../../../servers/user';
import { hasKeys } from '../../../../utils/js/checkTypes';
import { IUser } from '../../../../interfaces/user';
import { useAppDispatch } from '../../../../hooks/AppRedux';
import { SelectImage } from '../../../../components/ui/selectImage/selectImage';
import { TPreviews } from '../../../../interfaces/global';

interface IProps {
    comeBack: string;
    setData: React.Dispatch<React.SetStateAction<TUserDataWResume>>;
    dataResume: TUserDataWResume;
}

export function CreateStepSecond(props: IProps) {
    const { setData, comeBack, dataResume } = props;

    const [previews, setPreviews] = useState<TPreviews[]>([]);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    async function handleSubmit() {
        const formData = new FormData();
        formData.append('category', dataResume.category);
        formData.append('description', dataResume.description);
        formData.append('title', dataResume.title);
        if (dataResume.images && dataResume.images.length > 0) {
            Array.from([dataResume.images]).forEach((file) => {
                if (file instanceof File) {
                    formData.append('images[]', file);
                }
            });
        }
        const data = await utilServer(POST_ADD_RESUME, 'post', formData, () => { }, false);

        if (data.success && hasKeys<IUser>(data.data!)) {
            dispatch(update(data.data));
            navigate(PROFILE_PATH);
        }
    }

    return (
        <div className={`${styles.wrapper}`}>
            <div className={styles.container}>
                <div className={`${styles.body}`}>
                    <p className={`${gStyles.textExtraLarge} ${styles.title}`} >Завантажте фотографії ваших робіт</p>
                    <SelectImage previews={previews} setPreviews={setPreviews} setData={setData}>
                        {
                            previews.length > 0 &&
                            <ul className={`${styles.listImages}`}>
                                {previews.map((src) => (
                                    <li key={src.url}>
                                        <img src={src.url} />
                                    </li>
                                ))}
                            </ul>
                        }
                    </SelectImage>
                </div>
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