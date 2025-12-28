import styles from "./styles.module.scss";
import gStyles from "../../../../../../styles/styles.module.scss";
import { Field, FormikErrors, } from "formik";
import { Link } from "react-router-dom";
import pStyles from '../../../../styles.module.scss';
import { SelectLocation } from "../../../../../../components/ui/selectLocation/selectLocation";
import { SelectImage } from "../../../../../../components/ui/selectImage/selectImage";
import { TPreviews } from "../../../../../../interfaces/global";
import { TUserDataVacancy } from "../../../../types/types";
import { ItemSelectedImage } from "../../../../../../components/ItemSelectedImage/ItemSelectedImage";

interface IProps {
    returnPath: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    location: string
    errors: FormikErrors<{
        location: string;
        price: string
    }>;
    submitForm: (() => Promise<void>) & (() => Promise<any>);
    setPreviews: React.Dispatch<React.SetStateAction<TPreviews[] | TPreviews>>
    previews: TPreviews[] | TPreviews;
    setData: React.Dispatch<React.SetStateAction<TUserDataVacancy>>
}

export function FormStepSecond(props: IProps) {
    const { returnPath, setLocation, location, errors, submitForm, setPreviews, previews, setData } = props;

    return (
        <>
            <div>
                <div className={`${pStyles.bodyForm} ${styles.body}`}>
                    <p className={`${gStyles.textExtraLarge} ${styles.title}`}>Вкажіть місце вашої компанії/організації</p>
                    <SelectLocation errors={errors} location={location} setLocation={setLocation} />
                    <Field className={`${styles.input} ${gStyles.textBig} ${errors.price && gStyles.inputWrong}`} placeholder='Вкажить заробітню плату' type="text" name="price" />
                    <SelectImage previews={previews} setPreviews={setPreviews} setData={setData} multipleMode={false} placeholder="Натисніть щоб завантажити логотип організації/компанії">
                        {
                            Array.isArray(previews) && previews.length > 0 &&
                            <ul className={`${styles.listImages}`}>
                                {previews.map((src, index) =>
                                    <ItemSelectedImage key={src.url} setPreviews={setPreviews} src={src.url || ""} index={index} />
                                )}
                            </ul>
                        }
                    </SelectImage>
                </div>
                <div className={styles.containerButtons}>
                    <Link className={`${gStyles.textBig}`} to={returnPath}>Назад</Link>
                    <button type='button' onClick={submitForm} className={`${gStyles.textBig}`}>Далі</button>
                </div>
            </div>
        </>
    );
}
