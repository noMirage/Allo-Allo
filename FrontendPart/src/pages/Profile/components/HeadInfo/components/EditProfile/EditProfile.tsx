import gStyles from '../../../../../../styles/styles.module.scss';
import styles from './styles.module.scss';
import pStyles from '../../../../styles.module.scss';
import { useState } from 'react';
import { Modal } from '../../../../../../components/ui/modal/modal';
import { ModalEdit } from './components/Modal/ModalEdit';

interface IProps {
    fullName: string;
    phone: string;
    location: string;
}

export function EditProfile(props: IProps) {

    const { fullName, phone, location } = props;

    const [isModal, setIsModal] = useState<boolean>(false);

    return (
        <>
            <div className={styles.containerHeadInfo}>
                <p className={`${gStyles.textLarge}`}>Основна інформація</p>
                <button onClick={() => setIsModal(true)} className={`${gStyles.textBig} ${pStyles.button}`}>Редагувати профіль</button>
            </div>
            {isModal && <Modal isModal={isModal} setIsModal={setIsModal}>
                <ModalEdit fullName={fullName} phone={phone} currentLocation={location} setIsModal={setIsModal} />
            </Modal>}
        </>
    );

}