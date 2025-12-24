import logo from '../../assets/Header/logo.svg';
import { TRoutes } from '../../interfaces/global';
import styles from './styles.module.scss';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { HOME_PATH } from '../../routs/routs';
import { Link } from 'react-router-dom';

interface Props {
    routes: TRoutes[];
}

export function HeaderWithProgressBar(props: Props) {

    const { routes } = props;

    return (
        <>
            <Link to={HOME_PATH} className={styles.logo}>
                <img src={logo} alt="" />
            </Link>
            <ProgressBar routes={routes} />
        </>
    )
}

