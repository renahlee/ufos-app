import './buttons.css'

export function ButtonGroup({ options, current, onChange, subtle }) {
  return (
    <div className="button-group">
      {options.map(({val, label}) => (
        <button
          key={val}
          className={`${subtle ? 'subtle' : ''} ${val === current ? 'current' : ''}`}
          onClick={() => onChange(val)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
