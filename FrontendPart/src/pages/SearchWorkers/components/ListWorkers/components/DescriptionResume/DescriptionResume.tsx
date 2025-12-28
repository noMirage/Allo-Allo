import styles from './styles.module.scss';
import gStyles from '../../../../../../styles/styles.module.scss';
import { limitSymbol } from '../../../../../../utils/js/limitSymbol';

interface IProps {
    description: string;
    title: string;
}

export function DescriptionResume(props: IProps) {
    const { description, title } = props;

    return (
        <div className={styles.bodyText}>
            <h3 className={`${gStyles.textLarge}`}>{title}</h3>
            <div className={gStyles.textExtraBig} dangerouslySetInnerHTML={{ __html: limitSymbol(description.replace(/<\/?[^>]+(>|$)/g, " ")) }} />
        </div>
    );
}