import styles from './styles.module.scss';
import gStyles from '../../../styles/styles.module.scss';

import { ErrorMessage, Form, FormikErrors } from 'formik';
import { ModifiedInput } from './components/ModifiedInput/ModifiedInput';
import { SeletOption } from './components/SeletOption/SeletOption';
import { useEffect, useState } from 'react';
import "simplebar-react/dist/simplebar.min.css";
import "./simpleBarCustom.scss";

interface IProps {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  location: string
  errors: FormikErrors<{
    location: string;
  }>;
  placeholder?: string; 
}

export function SelectLocation(props: IProps) {
  const { location, errors, setLocation, placeholder = '' } = props;

  const [isShowSelect, setIsShowSelect] = useState<boolean>(true);

  useEffect(() => {
    setIsShowSelect(false);
  }, [setLocation]);

  return (
    <Form className={styles.formContainer}>
      <div className={styles.container}>
        <ModifiedInput placeholder={placeholder} setIsShowSelect={setIsShowSelect} location={location} setLocation={setLocation} errors={errors} />
        <ErrorMessage className={gStyles.warningMessage} name="location" component="div" />
        <SeletOption isShowSelect={isShowSelect} setIsShowSelect={setIsShowSelect} setLocation={setLocation} location={location} />
      </div>
    </Form>
  );
}
