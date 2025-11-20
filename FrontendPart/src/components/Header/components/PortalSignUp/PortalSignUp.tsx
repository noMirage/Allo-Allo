import styles from "./styles.module.scss";
import gStyles from "../../../../styles/styles.module.scss";
import { useState } from "react";
import { POST_USER_REGISTER } from "../../../../configs/configs";
import { Register } from "./component/Register/Register";


export function PortalSignUp() {

    const [switchSection, setSwitchSection] = useState<boolean>(true);

    return (
        <section className={styles.wrapper}>
            <div className={`${gStyles.container} ${styles.container}`}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <button className={`${gStyles.textBig} ${styles.switchButton}`} onClick={() => setSwitchSection(true)}>Зареєструватися</button>
                        <button className={`${gStyles.textBig} ${styles.switchButton}`} onClick={() => setSwitchSection(false)}>Увійти</button>
                    </div>
                    {switchSection ? <Register /> : <div></div>}
                </div>
            </div>
        </section>
    );
}
