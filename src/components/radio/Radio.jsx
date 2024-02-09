const Radio = ({ name, value, labelText, labelIcon, checked, onChange }) => {
  return (
    <div className="radio-container">
      <input
        id={value}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        required
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
