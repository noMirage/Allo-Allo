import styles from './styles.module.scss';
import gStyles from '../../../../styles/styles.module.scss';
import background1 from '../../../../assets/Home/mainBackgroundImage1.png';
import background2 from '../../../../assets/Home/mainBackgroundImage2.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export function HomeSwiper() {
    return (
        <section className={styles.body}>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                modules={[Autoplay]}
                autoplay={{
                    delay: 3000,
                }}
                speed={1000}
                loop={true}
                className={styles.wrapperSwiper}
            >
                <SwiperSlide>
                    <div className={styles.bodyImageSwiper}>
                        <img src={background1} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.bodyImageSwiper}>
                        <img src={background2} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.bodyImageSwiper}>
                        <img src={background1} />
                    </div>
                </SwiperSlide>
            </Swiper>
            <div className={gStyles.container}>
                <div className={styles.wrapper}>
                    <p className={`${gStyles.textExtraLarge}`}>Платформа пошуку майстрів <br />Якість понад усе</p>
                </div>
            </div>
        </section>
    );
}