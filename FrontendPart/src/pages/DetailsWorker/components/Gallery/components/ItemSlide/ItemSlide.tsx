import styles from './styles.module.scss';
import './styles.scss';
import defaultImage from '../../../../../../assets/Home/mainBackgroundImage2.jpg';
import { PATH_TO_STORE } from '../../../../../../configs/configs';

interface IProps {
    dataGallery: string[];
}

export function ItemSlide(props: IProps) {
    const { dataGallery = [] } = props;

    if (dataGallery.length > 0) {
        return (
            <>
                {
                    dataGallery.map((item, _) => {
                        return (
                            <a data-fancybox="gallery" className={`${styles.itemGallery} log f-carousel__slide`}
                                href={`${PATH_TO_STORE}${item}`}>
                                <img src={`${PATH_TO_STORE}${item}`} />
                            </a>
                        )
                    })
                }
            </>
        );
    } else {
        return (
            <a data-fancybox="gallery" className={`${styles.itemGallery} log f-carousel__slide`}
                href={defaultImage}>
                <img src={defaultImage} />
            </a>
        )
    }
}