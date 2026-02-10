
import styles from './styles.module.scss';
import { FormEmail } from './components/FormEmail/FormEmail';
import { AlternativeLogIn } from './components/AlternativeLogIn/AlternativeLogIn';

interface IProps {
  handleSubmit: (email: string) => void;
  setVerificationEmail: React.Dispatch<React.SetStateAction<boolean>>
}

export function RegisterEmail(props: IProps) {
  const { handleSubmit, setVerificationEmail } = props;

  return (
    <div className={styles.body}>
      <FormEmail setVerificationEmail={setVerificationEmail} handleSubmit={handleSubmit} />
      <AlternativeLogIn />
    </div>
  );
}