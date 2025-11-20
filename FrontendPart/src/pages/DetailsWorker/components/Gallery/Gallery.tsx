import styles from './styles.module.scss';
import './styles.scss';
import Fancybox from '../../../../containers/Fancybox/Fancybox';
import Carousel from '../../../../containers/Carousel/Carousel';

interface IProps {
    dataGallery: string[];
}

export function Gallery(props: IProps) {
    const { dataGallery } = props;
    return (
        <section className={styles.wrapper}>
            <div className={`${styles.container}`}>
                <Fancybox
                    options={{
                        Carousel: {
                            infinite: true,
                            Navigation: {
                                prevTpl: `<button class="gallery-prev-button"></button>`,
                                nextTpl: `<button class="gallery-next-button"></button>`
                            }
                        },
                    }}
                    className="gallery-fancybox"
                >
                    <Carousel
                        options={{ infinite: true }}
                        className="gallery-carousel"
                    >
                        {dataGallery.map((item, _) => (
                            <a data-fancybox="gallery" className={`${styles.itemGallery} log f-carousel__slide`}
                                href="https://t3.ftcdn.net/jpg/01/79/28/02/360_F_179280204_Yu8ysrTC8ep7Ikl6AjPSaSQoQ9aSGzif.jpg">
                                <img src='https://t3.ftcdn.net/jpg/01/79/28/02/360_F_179280204_Yu8ysrTC8ep7Ikl6AjPSaSQoQ9aSGzif.jpg' />
                            </a>
                        ))}
                    </Carousel>
                </Fancybox>
            </div>
        </section>
    );
}