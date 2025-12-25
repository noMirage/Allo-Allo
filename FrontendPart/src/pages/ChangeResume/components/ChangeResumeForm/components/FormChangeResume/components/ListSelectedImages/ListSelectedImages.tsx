import styles from './styles.module.scss';
import { SelectImage } from "../../../../../../../../components/ui/selectImage/selectImage";
import { TUserDataWResumeWithoutCategory } from "../../../../types/types";
import { ItemList } from "./components/ItemList/ItemList";
import { TPreviews } from '../../../../../../../../interfaces/global';


interface IProps {
    previews: TPreviews[];
    setPreviews: React.Dispatch<React.SetStateAction<TPreviews[]>>;
    setData: React.Dispatch<React.SetStateAction<TUserDataWResumeWithoutCategory>>
}

export function ListSelectedImages(props: IProps) {

    const { previews, setPreviews, setData } = props;

    return (
        <SelectImage previews={previews} setPreviews={setPreviews} setData={setData}>
            {
                Array.isArray(previews) && previews.length > 0 &&
                <ul className={`${styles.listImages}`}>
                    {previews.map((src, index) => {
                        return (
                            <ItemList setPreviews={setPreviews} src={src.url} index={index} />
                        )
                    })}
                </ul>
            }
        </SelectImage>
    );
}