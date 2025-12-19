import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import { TRoutes } from '../../types/types';
import { useLocation } from 'react-router-dom';
import { DETAIL_REGISTER } from '../../../../routs/routs';

interface IProps {
    routes: TRoutes[];
}

export function ProgressBar(props: IProps) {
    const { routes } = props;
    let location = useLocation();
    let cleanPath = '';

    if (!(location.pathname.slice().split('/'))[2]) {
        cleanPath = DETAIL_REGISTER.slice().split('/')[1];

    } else {
        cleanPath = (location.pathname).slice().split('/')[2];
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <ul className={styles.list}>
                    {routes.map((item, _) => (
                        <li className={`${styles.bullet} ${item.path === `/${cleanPath}` && styles.activeBullet}`}></li>
                    ))}
                </ul>
            </div>
        </div>
    );
}