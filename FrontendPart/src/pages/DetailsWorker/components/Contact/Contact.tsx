import styles from "./styles.module.scss";
import gStyles from "../../../../styles/styles.module.scss";
import { useState } from "react";
import { PATH_TO_STORE } from "../../../../configs/configs";
import avatarDefault from '../../../../assets/global/profileIcon.svg';

interface IProps {
    phone: string;
    published: string;
    category: string;
    fullName: string;
    location: string;
    isGallery: boolean;
    avatar: string | null;
}

export function Contact(props: IProps) {
    const { phone, category, published, fullName, location, isGallery, avatar } = props;

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
        <section className={`${styles.wrapper} ${!isGallery && styles.wapperExtend}`}>
            <div className={styles.header}>
                <p className={gStyles.textBig}>Опубліковано {formatted}</p>
                <div className={styles.avatar}><img src={avatar ? `${PATH_TO_STORE}${avatar}` : avatarDefault} /></div>
            </div>
            <h1 className={`${gStyles.textLarge} ${styles.name}`}>{fullName}</h1>
            <h2 className={`${gStyles.textLarge} ${styles.description}`}>{location}</h2>
            <h2 className={`${gStyles.textLarge} ${styles.category}`}>
                {category}
            </h2>
            <button onClick={handleChangeValue} className={`${styles.button} ${gStyles.textMedium}`}>
                {isShowPhone ? `+${phone}` : "Показати телефон"}
            </button>
        </section>
    );
}
