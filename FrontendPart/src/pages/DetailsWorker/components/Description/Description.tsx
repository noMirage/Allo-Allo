import styles from "./styles.module.scss";
import gStyles from "../../../../styles/styles.module.scss";

interface IProps {
    description: string;
}

export function Description(props: IProps) {
    const { description } = props;

    return (
        <section className={styles.wrapper}>
            <h2 className={`${styles.title} ${gStyles.textLarge}`}>Опис</h2>
            <p className={`${styles.description} ${gStyles.textMedium}`}>
                {description}
            </p>
        </section>
    );
}
