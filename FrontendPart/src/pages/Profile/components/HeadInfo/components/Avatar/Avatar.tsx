import styles from './styles.module.scss';
import defaultAvatar from '../../../../../../assets/global/avatar.jpg';
import { utilServer } from '../../../../../../utils/js/utilServer';
import { AVATAR_PROFILE, PATH_TO_STORE } from '../../../../../../configs/configs';
import { useAppDispatch } from '../../../../../../hooks/AppRedux';
import { update } from '../../../../../../servers/user';
import { hasKeys } from '../../../../../../utils/js/checkTypes';
import { IUser } from '../../../../../../interfaces/user';

interface IProps {
    avatar: string | null;
}

export function Avatar(props: IProps) {

    const { avatar } = props;

    const dispatch = useAppDispatch();

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const MAX_SIZE = 2 * 1024 * 1024;

        if (!file) return;

        if (!file.type.startsWith('image/')) {
            return;
        }

        if (file.size > MAX_SIZE) {
            return;
        }

        const formData = new FormData();
        formData.append('avatar', file);

        const data = await utilServer(AVATAR_PROFILE, 'post', formData, () => {}, false);

        if (data.success && hasKeys<IUser>(data.data!)) {
            dispatch(update(data.data));
        }
    };

    return (
        <div className={`${styles.bodyAvatar}`}>
            <img src={avatar ? `${PATH_TO_STORE}${avatar}` : defaultAvatar} alt="" />
            <input name='avatar' accept='image/*' type='file' onChange={handleAvatarChange} />
        </div>
    );

}