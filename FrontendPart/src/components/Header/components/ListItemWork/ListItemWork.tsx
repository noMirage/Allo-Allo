import styles from "./styles.module.scss";
import gStyles from "../../../../styles/styles.module.scss";
import pStyles from "../../styles.module.scss";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { DropDownMenu } from "../../../../containers/DropDownMenu/DropDownMenu";
import { WORKS } from "../../../../constants/works";
import { ORDER_WORK_PATH } from "../../../../routs/routs";

interface IProps {
    lengthOfList: number;
    name: string;
    icon: string;
    to: string;
}

export function ListItemWork(props: IProps) {
    const { lengthOfList, name, icon } = props;

    const refWorks = useRef<HTMLAnchorElement | null>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <li
            style={{ flexBasis: 100 / lengthOfList + "%" }}
            className={`${pStyles.listName}`}
        >
            <a
                className={`${gStyles.textLarge} ${styles.wrapper}`}
                key={name}
                ref={refWorks}
            >
                <div className={styles.headerItem}>
                    <img className={styles.itemIcon} src={icon} />
                    {name}
                </div>
            </a>
            <DropDownMenu
                activeElement={refWorks}
                className={styles.wrapperDropDownMenu}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                <ul className={styles.list}>
                    {WORKS.map((item, _) => (
                        <Link
                            className={`${styles.item} ${gStyles.textLarge}`}
                            to={`${item.to}/:${item.name}`}
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </ul>
            </DropDownMenu>
        </li>
    );
}
