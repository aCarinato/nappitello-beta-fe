// styles
import classes from './TextInput.module.css';

function TextInput(props) {
  const {
    type,
    required,
    label,
    value,
    minLength,
    maxLength,
    onChange,
    onBlur,
    placeholder,
    disabled = false,
    isInvalid,
    errorMsg,
  } = props;
  return (
    <div className={classes['box-0']}>
      <label className={classes['text-label']} htmlFor="short-description">
        {label} {required && <sup className={classes['required']}>*</sup>}
      </label>
      <input
        className={
          isInvalid ? classes['text-input-invalid'] : classes['text-input']
        }
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder && placeholder}
        minLength={minLength && minLength}
        maxLength={maxLength && maxLength}
        onChange={onChange}
        onBlur={onBlur}
      />
      {isInvalid ? (
        <p className={classes['input-error-msg']}>{errorMsg}</p>
      ) : (
        <p className={classes['input-error-msg-none']}>none</p>
      )}
    </div>
  );
}

export default TextInput;
