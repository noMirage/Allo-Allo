import styles from './styles.module.scss';
import gStyles from '../../../../../../../styles/styles.module.scss';
import { TPreviews } from '../../../../../../../interfaces/global';
import { ItemSelectedImage } from '../../../../../../ItemSelectedImage/ItemSelectedImage';
import { hasKeys } from '../../../../../../../utils/js/checkTypes';

interface IProps {
    previews: TPreviews[] | TPreviews;
    setPreviews: React.Dispatch<React.SetStateAction<TPreviews[] | TPreviews>>;
    error?: string | null;
}

export function SwitchList(props: IProps) {

    const { previews, setPreviews, error = null } = props;


    if (Array.isArray(previews) && previews.length > 0) {
        return (
            <>
                <div className={gStyles.warningMessage}>{error}</div>
                <ul className={`${styles.bodyImages}`}>
                    {previews.map((src, index) => {
                        if (src.url) {
                            return (
                                <ItemSelectedImage key={src.url} setPreviews={setPreviews} src={src.url} index={index} />
                            )
                        }
                    })}
                </ul>
            </>
        )
    } else if (hasKeys<TPreviews>(previews)) {
        return (
            <>
                <div className={gStyles.warningMessage}>{error}</div>
                <div className={`${styles.bodyImages}`}>
                    {previews.url && <ItemSelectedImage key={previews.url} setPreviews={setPreviews} src={previews.url} index={0} />}
                </div>
            </>
        );
    }
    return <></>;
}