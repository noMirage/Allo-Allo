import { useAppSelector } from '../../hooks/AppRedux';
import { IUser, IUserJobSeeker } from '../../interfaces/user';
import { hasKeys } from '../../utils/js/checkTypes';
import { useParams } from 'react-router-dom';
import { ChangeResumeForm } from './components/ChangeResumeForm/ChangeResumeForm';



export function ChangeResume() {

    const user: IUser | {} = useAppSelector((state) => state.user.data);

    let { index } = useParams();

    if (hasKeys<IUserJobSeeker>(user)) {
        return (
            <ChangeResumeForm resume={user.resumes[Number(index)]} />
        );
    } else {
        return <></>;
    }
}