import styles from './styles.module.scss';
import './styles.scss';
import Fancybox from '../../../../containers/Fancybox/Fancybox';
import Carousel from '../../../../containers/Carousel/Carousel';
import { ItemSlide } from './components/ItemSlide/ItemSlide';

interface IProps {
    dataGallery: string[];
}

export function Gallery(props: IProps) {
    const { dataGallery = [] } = props;

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
                        <ItemSlide dataGallery={dataGallery} />
                    </Carousel>
                </Fancybox>
            </div>
        </section>
    );
}