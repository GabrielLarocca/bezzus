import "./style.css";

export default function CheckData(props) {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        // checked={marcas.indexOf(el) > -1}
        value={props.label}
        id={props.label}
      />
      <label className="form-check-label" for={props.label}>
        {props.label}
      </label>
    </div>
  );
}
