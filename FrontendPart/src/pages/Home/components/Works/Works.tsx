import styles from "./styles.module.scss";
import gStyles from "../../../../styles/styles.module.scss";
import arrow from "../../../../assets/global/arrow.svg";
import { WORKS } from "../../../../constants/works";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

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
                        modules={[Navigation]}
                        centeredSlides={true}
                        navigation={{
                            prevEl: `.${styles.buttonPrevSwiper}`,
                            nextEl: `.${styles.buttonNextSwiper}`,
                        }}
                        speed={1000}
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
