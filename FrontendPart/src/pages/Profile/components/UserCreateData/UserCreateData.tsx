import { TResume, TUserRole } from '../../../../interfaces/user';
import { IVacancies } from '../../../../interfaces/vacancies';
import { hasKeys } from '../../../../utils/js/checkTypes';
import { ListResume } from './components/ListResume/listResume';
import { NoData } from './components/NoData/NoResume';

interface IProps {
    data: TResume[] | [] | IVacancies[];
    title: string;
    description: string;
    redirect: { url: string, name: string };
    role: TUserRole;
}

export function UserCreateData(props: IProps) {

    const { data, redirect, description, title, role } = props;

    if (data === undefined || Array.isArray(data) && data.length < 1) {
        return <NoData redirect={redirect} description={description} title={title} />
    } else {
        if (role === 'job_seeker' && hasKeys<TResume[]>(data)) {
            return <ListResume resumes={data} />
        } else if (role === 'employer' && hasKeys<IVacancies[]>(data)) {
            return <></>;
        }
    }
    return <></>;
}