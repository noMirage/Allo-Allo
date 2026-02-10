import gStyles from '../../../../styles/styles.module.scss';
import styles from './styles.module.scss';
import iconWork from '../../../../assets/global/plumber.svg';

const history: any = [
    {
        category: "сантехніка",
        icon: iconWork,
        description: "Монтаж/ремонт труб",
        status: "Виконано",
        date: "23.12.2025",
    },
    {
        category: "сантехніка",
        icon: iconWork,
        description: "Монтаж/ремонт труб",
        status: "Виконано",
        date: "23.12.2025",
    },
    {
        category: "сантехніка",
        icon: iconWork,
        description: "Монтаж/ремонт труб",
        status: "Виконано",
        date: "23.12.2025",
    },
]

export function HistoryFinishedWorks(props: any) {

    const { } = props;

    return (<div className={styles.resume}>
        <h2 className={`${gStyles.textLarge} ${styles.title}`}>Історія виконаних робіт</h2>
        <div className={styles.body}>
            <ul className={styles.list}>
                {history.map((item: any, _: number) => (
                    <li className={`${styles.item}`} key={item.date}>
                        <div className={styles.bodyIcon}>
                            <img src={item.icon} alt="" />
                        </div>
                        <div className={styles.container}>
                            <h3 className={`${gStyles.textExtraBig}`}>{item.category}</h3>
                            <h4 className={`${gStyles.textExtraBig}`}>{item.description}</h4>
                        </div>
                        <div className={styles.bodyExtraInfo}>
                            <h3 className={`${gStyles.textExtraBig}`}>{item.status}</h3>
                            <h4 className={`${gStyles.textExtraBig}`}>{item.date}</h4>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    );

}