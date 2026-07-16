const Button = ({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-2xl bg-[#f97316] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(249,115,22,0.18)] transition duration-200 hover:bg-[#ea580c] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;