import styles from './style.module.scss';
import gStyles from '../../styles/styles.module.scss';

interface IProps {
    countPagination: number;
    currentNumber: number;
    countShowPaginationBullets?: number;
    changePaginationAfter?: number;
    className: string;
    setCurrentValue: React.Dispatch<React.SetStateAction<number>>;
};

export default function Pagination(props: IProps) {

    const { countPagination, setCurrentValue, className, currentNumber, countShowPaginationBullets = 8, changePaginationAfter = 6 } = props;

    const pagination: (string | number)[] = [];

    for (let index = 0; index <= countPagination; index++) {
        if (index >= 1 && (index >= currentNumber - countShowPaginationBullets / 2) && pagination.length <= countShowPaginationBullets) {
            pagination.push(index);
        }
    };

    if (countPagination > changePaginationAfter) {
        pagination[11] = '...';
        pagination.push(countPagination + 1);
    };

    if (Number(pagination[0]) >= 2) {
        pagination.unshift('...');
        pagination.unshift(1);
    }

    function handleChangeValue(value: string | number): void {
        if (typeof value === 'number') {
            setCurrentValue(value);
        }
    }

    return (
        <div className={`${styles.pagination} ${className}`}>
            <ul className={styles.list}>
                {pagination.map((item, index) => (
                    <li onClick={() => handleChangeValue(item)} className={`${currentNumber === item ? styles.activePagination : ''} ${styles.item} ${gStyles.textBig}`} key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}