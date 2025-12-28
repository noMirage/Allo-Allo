import { TPreviews } from '../../../../../interfaces/global';
import { hasKeys } from '../../../../../utils/js/checkTypes';
import { ItemSelectedImage } from '../../../../ItemSelectedImage/ItemSelectedImage';
import { SelectImage } from '../../../selectImage/selectImage';
import styles from './styles.module.scss';


interface IProps<T> {
    previews: TPreviews[] | TPreviews;
    setPreviews: React.Dispatch<React.SetStateAction<TPreviews[] | TPreviews>>;
    setData: React.Dispatch<React.SetStateAction<T>>;
    multipleMode?: boolean;
    placeholder?: string;
}

export function ListSelectedImages<T>(props: IProps<T>) {

    const { previews, setPreviews, setData, multipleMode = true, placeholder = '' } = props;

    if (Array.isArray(previews) && previews.length > 0) {
        return (
            <SelectImage placeholder={placeholder} previews={previews} setPreviews={setPreviews} setData={setData} multipleMode={multipleMode}>
                <ul className={`${styles.bodyImages}`}>
                    {previews.map((src, index) => {
                        if (src.url) {
                            return (
                                <ItemSelectedImage key={src.url} setPreviews={setPreviews} src={src.url} index={index} />
                            )
                        }
                    })}
                </ul>
            </SelectImage>
        );
    } else if (hasKeys<TPreviews>(previews)) {
        return (
            <SelectImage placeholder={placeholder} previews={previews} setPreviews={setPreviews} setData={setData} multipleMode={multipleMode}>
                <div className={`${styles.bodyImages}`}>
                    {previews.url && <ItemSelectedImage key={previews.url} setPreviews={setPreviews} src={previews.url} index={0} />}
                </div>
            </SelectImage>
        )
    }
    return <></>;
}