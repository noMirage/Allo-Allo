import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import gStyles from "../../../../../../../../styles/styles.module.scss";
import { ErrorMessage, Field, FormikErrors } from "formik";
import styles from "./styles.module.scss";
import { validatePhone } from '../../../../../../../../utils/js/validates';
import './styles.scss';

interface IProps {
    errors: FormikErrors<{
        fullName: string;
        phone: string;
    }>;
}

export function PhoneInputCustom(props: IProps) {
    const { errors, } = props;

    return (
        <>
            <Field name="phone" validate={validatePhone}>
                {({ field, form, meta }: any) => (
                    <div className={styles.bodyPhone}>
                        <PhoneInput
                            {...field}
                            country="ua"
                            onlyCountries={['ua', "pl", "cz", "de"]}
                            onChange={(value) => { form.setFieldValue('phone', value) }}
                            onBlur={() => form.setFieldTouched('phone', true)}
                            buttonClass={styles.inputPhoneButton}
                            inputClass={`${styles.inputPhone} ${gStyles.textExtraBig} ${errors.phone && gStyles.inputWrong}`}
                            dropdownClass={styles.containerCountries}
                        />
                    </div>
                )}
            </Field>
            <ErrorMessage
                className={gStyles.warningMessage}
                name="phone"
                component="div"
            />
        </>
    );
}
