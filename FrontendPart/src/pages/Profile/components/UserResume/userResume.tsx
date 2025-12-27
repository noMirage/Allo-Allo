import { TResume } from '../../../../interfaces/user';
import { ListResumes } from './components/ListResumes/listResumes';
import { NoResume } from './components/NoResume/NoResume';

interface IProps {
    resumes: TResume[] | [];
}

export function UserResume(props: IProps) {

    const { resumes } = props;

    if (resumes === undefined || Array.isArray(resumes) && !resumes.length) {
        return <NoResume />
    } else {
        return <ListResumes resumes={resumes} />
    }
}