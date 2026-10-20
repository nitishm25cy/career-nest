
function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  ariaLabel,
  ariaExpanded,
  ariaControls
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cn-button ${className}`}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
    >
      {children}
    </button>
  );
}

export default Button;
