import { useAppSelector } from '../../hooks/AppRedux';
import { IUserEmployer } from '../../interfaces/user';
import { hasKeys } from '../../utils/js/checkTypes';
import { useParams } from 'react-router-dom';
import { ChangeVacancyForm } from './components/ChangeVacancyForm/ChangeVacancyForm';

export function ChangeVacancy() {

    const user: IUserEmployer | {} = useAppSelector((state) => state.user.data);

    let { index } = useParams();

    if (hasKeys<IUserEmployer>(user)) {
        return (
            <ChangeVacancyForm vacancies={user.vacancies[Number(index)]} />
        );
    } else {
        return <></>;
    }
}