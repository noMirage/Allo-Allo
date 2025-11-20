import styles from "./styles.module.scss";
import gStyles from "../../../../styles/styles.module.scss";
import { ReactComponent as Heart } from "../../../../assets/global/heartIcon.svg";
import { useState } from "react";

interface IProps {
    date: string;
    title: string;
}

export function Contact(props: IProps) {
    const { date, title } = props;

    const [isShowPhone, setIsShowPhone] = useState<boolean>(false);

    function handleChangeValue() {
        setIsShowPhone(true);
    }

    return (
        <section className={styles.wrapper}>
            <div className={styles.header}>
                <p className={gStyles.textBig}>Опубліковано {date}</p>
                <Heart className={styles.heartIcon} />
            </div>
            <h2 className={`${gStyles.textLarge} ${styles.title}`}>
                {title}
            </h2>
            <button onClick={handleChangeValue} className={`${styles.button} ${gStyles.textMedium}`}>
                {isShowPhone ? "+380 954 943 9333" : "Показати телефон"}
            </button>
        </section>
    );
}
