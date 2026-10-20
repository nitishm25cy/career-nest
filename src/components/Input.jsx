
function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  autoComplete,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid
}) {
  const errorId = `${name}-error`;

  return (
    <div className="reusable-input">
      <label htmlFor={name}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-describedby={
          [ariaDescribedBy, error ? errorId : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        aria-invalid={error ? true : ariaInvalid}
      />

      {error && (
        <small className="input-error" id={errorId} role="alert">
          {error}
        </small>
      )}
    </div>
  );
}

export default Input;
