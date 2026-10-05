function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = ""
}) {
  return (
    <div className="reusable-input">

      <label htmlFor={name}>
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

      {error && (
        <small className="input-error">
          {error}
        </small>
      )}

    </div>
  );
}

export default Input;