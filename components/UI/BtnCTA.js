// styles
import classes from './BtnCTA.module.css';

function BtnCTA(props) {
  const { label, onClickAction = () => {} } = props;
  return (
    <button onClick={onClickAction} className={classes['box-0']}>
      {label}
    </button>
  );
}

export default BtnCTA;
