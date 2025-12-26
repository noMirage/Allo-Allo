import styles from './styles.module.scss';
import gStyles from '../../../../../../styles/styles.module.scss';

interface IProps {
    time: string;
}

export function TimeResume(props: IProps) {
    const { time } = props;

    function timeAgo(dateString: string) {
        const now: Date = new Date();
        const past = new Date(dateString);
        const diff = now.getTime() - past.getTime();

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} днів тому`;
        if (hours > 0) return `${hours} годин тому`;
        if (minutes > 0) return `${minutes} хвилин тому`;
        return `${seconds} секунд тому`;
    }

    return (
        <time className={`${styles.time} ${gStyles.textMedium}`}>{timeAgo(time)}</time>
    );
}