import styles from "./styles.module.scss";
import gStyles from "../../../../../../styles/styles.module.scss";
import { POST_USER_REGISTER } from "../../../../../../configs/configs";
import { useState } from "react";
import { utilServer } from "../../../../../../utils/js/utilServer";

export function Register() {
    const [valueField, setValueField] = useState({
        name: "",
        surname: "",
        email: "",
        age: "",
        avatar: "",
        phone: "",
        password: "",
    });

    function handleChangeValue(key: any, value: string) {
        setValueField((prevState) => ({ ...prevState, [key]: value }));
    }

    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', valueField.name);
        formData.append('surname', valueField.surname);
        formData.append('age', valueField.age);
        formData.append('email', valueField.email);
        formData.append('avatar', valueField.avatar);
        formData.append('phone', valueField.phone);
        formData.append('password', valueField.password);

        const data = utilServer(POST_USER_REGISTER, 'post', formData);

        console.log(data);

    }

    return (
        <form onSubmit={submit} method="post" action={POST_USER_REGISTER}>
            <div className={styles.bodyForm}>
                <div className={styles.bodyInput}>
                    <input
                        className={`${styles.input} ${gStyles.textExtraBig}`}
                        onChange={(event) => handleChangeValue("name", event.target.value)}
                        placeholder="Ім'я"
                        name="name"
                        id="name"
                    />
                    <input
                        className={`${styles.input} ${gStyles.textExtraBig}`}
                        onChange={(event) =>
                            handleChangeValue("surname", event.target.value)
                        }
                        placeholder="Фамілія"
                        name="surname"
                        id="surname"
                    />
                </div>
                <div className={styles.bodyInput}>
                    <input
                        className={`${styles.input} ${gStyles.textExtraBig}`}
                        onChange={(event) => handleChangeValue("email", event.target.value)}
                        placeholder="Пошта"
                        name="email"
                        id="email"
                        type="email"
                    />
                    <input
                        className={`${styles.input} ${gStyles.textExtraBig}`}
                        onChange={(event) =>
                            handleChangeValue("password", event.target.value)
                        }
                        placeholder="Пароль"
                        name="password"
                        id="password"
                    />
                </div>
                <div className={styles.bodyInput}>
                    <input
                        className={`${styles.input} ${gStyles.textExtraBig}`}
                        onChange={(event) => handleChangeValue("age", event.target.value)}
                        placeholder="Вік"
                        name="age"
                        id="age"
                    />
                    <input
                        className={`${styles.input} ${gStyles.textExtraBig}`}
                        onChange={(event) =>
                            handleChangeValue("avatar", event.target.value)
                        }
                        placeholder="Аватар"
                        name="avatar"
                        id="avatar"
                    />
                </div>
                <input
                    className={`${styles.input} ${gStyles.textExtraBig} ${styles.lastInput}`}
                    onChange={(event) => handleChangeValue("phone", event.target.value)}
                    placeholder="Номер телефона"
                    name="phone"
                    id="phone"
                    type="tel"
                />
            </div>

            <div className={styles.buttonSubmit}>
                <button type='submit' className={`${gStyles.textBig}`}>Зареєструватися</button>
            </div>
        </form>
    );
}
