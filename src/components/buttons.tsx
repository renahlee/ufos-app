import './buttons.css'

export function ButtonGroup({ options, current, onChange, subtle, vertical }) {
  return (
    <div className={`button-group ${vertical ? 'vertical' : ''}`}>
      {options.map(({val, label}) => (
        <button
          key={val}
          className={`${subtle ? 'subtle' : ''} ${val === current ? 'current' : ''}`}
          onClick={() => onChange(val)}
        >
          {label ?? val}
        </button>
      ))}
    </div>
  );
}
