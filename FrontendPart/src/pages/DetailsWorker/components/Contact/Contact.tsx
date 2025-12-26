import styles from "./styles.module.scss";
import gStyles from "../../../../styles/styles.module.scss";
import { ReactComponent as Heart } from "../../../../assets/global/heartIcon.svg";
import { useState } from "react";

interface IProps {
    phone: string;
    published: string;
    title: string;
    fullName: string;
}

export function Contact(props: IProps) {
    const { phone, title, published, fullName } = props;

    const date = new Date(published);

    const formatted = date.toLocaleString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const [isShowPhone, setIsShowPhone] = useState<boolean>(false);

    function handleChangeValue() {
        setIsShowPhone(true);
    }

    return (
        <section className={styles.wrapper}>
            <div className={styles.header}>
                <p className={gStyles.textBig}>Опубліковано {formatted}</p>
                <Heart className={styles.heartIcon} />
            </div>
            <h1 className={`${gStyles.textLarge} ${styles.title}`}>{fullName}</h1>
            <h2 className={`${gStyles.textLarge} ${styles.title}`}>
                {title}
            </h2>
            <button onClick={handleChangeValue} className={`${styles.button} ${gStyles.textMedium}`}>
                {isShowPhone ? `+${phone}` : "Показати телефон"}
            </button>
        </section>
    );
}
