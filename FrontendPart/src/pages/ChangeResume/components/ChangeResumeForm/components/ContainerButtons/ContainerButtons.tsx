import styles from './styles.module.scss';
import gStyles from '../../../../../../styles/styles.module.scss';
import { Link } from "react-router-dom";
import { PROFILE_PATH } from "../../../../../../routs/routs";

interface IProps {
    submitForm: (() => Promise<void>) & (() => Promise<any>)
}

export function ContainerButtons(props: IProps) {

    const { submitForm } = props;


    return (
        <div className={styles.containerButtons}>
            <Link className={`${gStyles.textBig}`} to={`${PROFILE_PATH}`}>
                Назад
            </Link>

            <button
                onClick={submitForm}
                className={`${gStyles.textBig}`}
            >
                Внести зміни
            </button>
        </div>
    );
}