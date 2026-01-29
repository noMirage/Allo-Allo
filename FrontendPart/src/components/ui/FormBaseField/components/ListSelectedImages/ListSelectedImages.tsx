import { TPreviews } from '../../../../../interfaces/global';
import { SelectImage } from '../../../selectImage/selectImage';
import { SwitchList } from './componenets/switchList/switchList';


interface IProps<T> {
    previews: TPreviews[] | TPreviews;
    setPreviews: React.Dispatch<React.SetStateAction<TPreviews[] | TPreviews>>;
    setData: React.Dispatch<React.SetStateAction<T>>;
    multipleMode?: boolean;
    placeholder?: string;
    error?: string | null;
}

export function ListSelectedImages<T>(props: IProps<T>) {

    const { previews, setPreviews, error = null, setData, multipleMode = true, placeholder = '' } = props;

    return (
        <SelectImage error={error} placeholder={placeholder} previews={previews} setPreviews={setPreviews} setData={setData} multipleMode={multipleMode}>
            <SwitchList error={error} previews={previews} setPreviews={setPreviews} />
        </SelectImage>
    );
}