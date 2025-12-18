
import styles from './styles.module.scss';
import { FormEmail } from './components/FormEmail/FormEmail';
import { AlternativeLogIn } from './components/AlternativeLogIn/AlternativeLogIn';

interface IProps {
  handleSubmit: (email: string) => void;
}

export function RegisterEmail(props: IProps) {
  const { handleSubmit } = props;

  return (
    <div className={styles.body}>
      <FormEmail handleSubmit={handleSubmit} />
      <AlternativeLogIn />
    </div>
  );
}