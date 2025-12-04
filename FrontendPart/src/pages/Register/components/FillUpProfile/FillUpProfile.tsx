
import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import { useState } from 'react';
import { IFieldUser } from '../../types/types';

export function FillUpProfile() {
  const [fieldUser, setFieldUser] = useState<IFieldUser>({ name: "", surname: "", phone: "", majors: "" });

  const handleChangeFieldUser = (value: string, key: string) => {
    setFieldUser((prevState: IFieldUser) => {
      const newState = { ...prevState };
      newState[key] = value;
      return newState;
    });
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className={styles.body}>
      <div className={styles.form}>
        <form onSubmit={(event) => handleSubmit(event)}>
          <input onChange={(event) => handleChangeFieldUser(event.target.value, "name")} value={fieldUser.name} type="name" placeholder='Електроний адрес' className={`${styles.input} ${gStyles.textBig}`} />
          <input onChange={(event) => handleChangeFieldUser(event.target.value, "surname")} value={fieldUser.surname} type="name" placeholder='Електроний адрес' className={`${styles.input} ${gStyles.textBig}`} />
          <input onChange={(event) => handleChangeFieldUser(event.target.value, "phone")} value={fieldUser.phone} type="name" placeholder='Електроний адрес' className={`${styles.input} ${gStyles.textBig}`} />
         
          <div className={styles.bodyButton}>
            <button className={`${gStyles.textBig} ${styles.button}`}>Готово</button>
          </div>
        </form>
      </div>
    </div>
  );
}