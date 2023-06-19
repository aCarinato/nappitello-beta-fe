// styles
import classes from './TextInput.module.css';

function TextInput(props) {
  const {
    name,
    type,
    required,
    label,
    value,
    // defaultValue,
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
      <label className={classes['text-label']} htmlFor={name}>
        {label} {required && <sup className={classes['required']}>*</sup>}
      </label>
      <input
        className={
          isInvalid ? classes['text-input-invalid'] : classes['text-input']
        }
        name={name}
        type={type}
        value={value}
        // defaultValue={defaultValue}
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
