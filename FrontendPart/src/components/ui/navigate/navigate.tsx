import styles from './styles.module.scss';
import gStyles from '../../../styles/styles.module.scss';
import { Link } from 'react-router-dom';
import { INavigate } from '../../../interfaces/navigate';
import { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface IProps {
  navigateList: INavigate[];
  className?: string;
  children?: ReactNode;
}

export function Navigate(props: IProps) {
  const { navigateList, className, children } = props;
  return (
    <ul className={`${styles.list} ${className}`}>
      {children}

      <Swiper
        spaceBetween={1}
        slidesPerView={"auto"}
        className={styles.wrapperSwiper}
        centeredSlidesBounds={true}
        observer={true}
        observeParents={true}
        watchOverflow={true}
        resistanceRatio={0}
      >
        {navigateList.map((item, _) => (
          <SwiperSlide className={styles.slide}>
            <li className={styles.item}>
              <Link to={`${item.to}`} className={gStyles.textBig}>
                {item.category}
              </Link>
            </li>
          </SwiperSlide>
        ))}
      </Swiper>
    </ul>
  );
}
