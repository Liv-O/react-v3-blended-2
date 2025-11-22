import ClockLoader from 'react-spinners/ClockLoader';
import style from './Loader.module.css';

export default function Loader() {
  return <div className={style.backdrop}>{<ClockLoader />}</div>;
}
