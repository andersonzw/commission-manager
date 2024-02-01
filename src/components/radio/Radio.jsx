const Radio = ({
  name,
  value,
  labelText,
  labelIcon,
  checked,
  onChange,
}) => {
  return (
    <div className="radio-container">
      <input
        type="radio"
        name={name}
        id={value}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={value}>
        {labelIcon && (
          <img className="icon" src={labelIcon} alt={`SVG icon for ${value}`} />
        )}

        <span>{labelText}</span>
      </label>
    </div>
  );
};

export default Radio;
