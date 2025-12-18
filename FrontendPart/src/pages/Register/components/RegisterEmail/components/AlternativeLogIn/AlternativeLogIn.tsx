
import styles from './styles.module.scss';
import google from '../../../../../../assets/global/google.svg';
import facebook from '../../../../../../assets/global/facebook.svg';
import apple from '../../../../../../assets/global/apple.svg';

interface IProps {

}

export function AlternativeLogIn(props: IProps) {
  return (
    <ul className={styles.list}>
      <li>
        <button>
          <img src={google} alt="" />
        </button>
      </li>
      <li>
        <button>
          <img src={facebook} alt="" />
        </button>
      </li>
      <li>
        <button>
          <img src={apple} alt="" />
        </button>
      </li>
    </ul>
  );
}