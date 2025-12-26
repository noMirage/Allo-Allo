import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../../../assets/global/logowork.jpg';
import { DETAILS_WORKER_PATH } from '../../../../routs/routs';
import { PATH_TO_STORE } from '../../../../configs/configs';
import { IResume } from '../../../../interfaces/resume';
import { TCategoryWorks } from '../../../../interfaces/works';

interface IProps {
    data: IResume[];
    sectionName: TCategoryWorks;
}

export function ListWorkers(props: IProps) {
    const { data, sectionName } = props;

    function handleLimitSymbols(text: string): string {
        const str = [];
        for (let index = 0; text.length > index; index++) {
            if (index > 250) {
                str.push('...');
                break;
            };
            str.push(text[index]);
        }

        return str.join('');
    }

    return (
        <ul className={styles.list}>
            {data.map((item, _) => {
                return (
                    <li>
                        <Link className={styles.itemBody} to={`${DETAILS_WORKER_PATH}/${item.id}/${`${item.title.replace(/\//g, " ")}`}/${sectionName}`}>
                            <div className={styles.wrapper}>
                                <div className={styles.bodyLogo}>
                                    <img src={item.user.avatar ? `${PATH_TO_STORE}${item.user.avatar}` : defaultAvatar} alt='logo' />
                                </div>
                                <div className={styles.bodyText}>
                                    <h3 className={`${gStyles.textLarge}`}>{item.title}</h3>
                                    <div className={gStyles.textExtraBig} dangerouslySetInnerHTML={{ __html: handleLimitSymbols(item.description.replace(/<\/?[^>]+(>|$)/g, " ")) }} />
                                </div>
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    );
}