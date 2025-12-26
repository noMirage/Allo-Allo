import styles from './styles.module.scss';
import gStyles from '../../../../../../styles/styles.module.scss';

interface IProps {
    description: string;
    title: string;
}

export function DescriptionResume(props: IProps) {
    const { description, title } = props;

    function handleLimitSymbols(text: string): string {
        const str = [];
        for (let index = 0; text.length > index; index++) {
            if (index > 250) {
                str.push('...');
                break;
            };
            str.push(text[index]);
        }

        return str.join('');
    }

    return (
        <div className={styles.bodyText}>
            <h3 className={`${gStyles.textLarge}`}>{title}</h3>
            <div className={gStyles.textExtraBig} dangerouslySetInnerHTML={{ __html: handleLimitSymbols(description.replace(/<\/?[^>]+(>|$)/g, " ")) }} />
        </div>
    );
}