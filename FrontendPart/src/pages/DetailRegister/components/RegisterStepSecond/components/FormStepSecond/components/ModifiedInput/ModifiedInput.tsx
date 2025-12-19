import styles from "./styles.module.scss";
import gStyles from "../../../../../../../../styles/styles.module.scss";
import { Field, FormikErrors, } from "formik";
import "simplebar-react/dist/simplebar.min.css";
import { validateBaseField } from "../../../../../../../../utils/js/validates";

interface IProps {
    errors: FormikErrors<{
        location: string;
    }>;
    location: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    setIsShowSelect: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModifiedInput(props: IProps) {
    const { setLocation, errors, location, setIsShowSelect } = props;

    return (
        <Field name='location' validate={validateBaseField}>
            {({ _, form }: any) => {
                return <input onBlur={() => form.setFieldTouched("location", true)} onFocus={() => setIsShowSelect(true)} onChange={(event) => {
                    setLocation(event.target.value); form.setFieldValue('location', event.target.value); form.setFieldTouched('location', true);
                }} placeholder="Локація" type="text" className={`${styles.input} ${gStyles.textExtraBig} ${errors.location && gStyles.inputWrong}`} value={location} />;
            }}
        </Field>
    );
}
