import styles from './styles.module.scss';
import gStyles from '../../../../../../styles/styles.module.scss';
import { formatDate } from '../../../../../../utils/js/formatDate';

interface IProps {
    time: string;
}

export function TimeResume(props: IProps) {
    const { time } = props;

    return (
        <time className={`${styles.time} ${gStyles.textMedium}`}>{formatDate(time)}</time>
    );
}