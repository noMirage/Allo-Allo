import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import { TRoutes } from '../../types/types';
import { useLocation } from 'react-router-dom';

interface IProps {
    routes: TRoutes[];
}

export function ProgressBar(props: IProps) {
    const { routes } = props;
    const location = useLocation();
    const cleanPath = (location.pathname).slice().split('/')[2];

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