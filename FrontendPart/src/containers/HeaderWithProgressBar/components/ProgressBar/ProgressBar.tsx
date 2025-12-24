import styles from './styles.module.scss';
import { useLocation } from 'react-router-dom';
import { TRoutes } from '../../../../interfaces/global';

interface IProps {
    routes: TRoutes[];
}

export function ProgressBar(props: IProps) {
    const { routes } = props;
    let location = useLocation();
    let cleanPath = '';

    if (!(location.pathname.slice().split('/'))[2]) {
        cleanPath = routes[0].path.slice().split('/')[1];

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