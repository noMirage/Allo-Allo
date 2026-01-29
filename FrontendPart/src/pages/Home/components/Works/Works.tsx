import styles from "./styles.module.scss";
import gStyles from "../../../../styles/styles.module.scss";
import arrow from "../../../../assets/global/arrow.svg";
import { WORKS } from "../../../../constants/works";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { Autoplay } from 'swiper/modules';

export function WorkList() {
    return (
        <section className={styles.body}>
            <div className={`${gStyles.container} ${styles.container}`}>
                <div className={`${styles.buttonNextSwiper} ${styles.buttonSwiper}`}>
                    <div>
                        <img src={arrow} />
                    </div>
                </div>
                <div className={styles.containerSwiper}>
                    <Swiper
                        spaceBetween={25}
                        slidesPerView={3}
                        modules={[Navigation, Autoplay]}
                        centeredSlides={true}
                        autoplay={{
                            delay: 4000,
                        }}
                        speed={1000}
                        navigation={{
                            prevEl: `.${styles.buttonPrevSwiper}`,
                            nextEl: `.${styles.buttonNextSwiper}`,
                        }}
                        breakpoints={{
                            120: {
                                slidesPerView: 1.02,
                            },
                            480: {
                                slidesPerView: 1.5,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                        }}
                        loop={true}
                        className={styles.wrapperSwiper}
                    >
                        {WORKS.map((item, _) => (
                            <SwiperSlide className={styles.item}>
                                <Link to={item.to} className={styles.itemBody}>
                                    <p className={`${styles.name} ${gStyles.textLarge}`}>
                                        {item.category}
                                    </p>
                                    <div className={styles.icon}>
                                        <img src={item.icon} alt="icon" />
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className={`${styles.buttonPrevSwiper} ${styles.buttonSwiper}`}>
                    <div>
                        <img src={arrow} />
                    </div>
                </div>
            </div>
        </section>
    );
}
