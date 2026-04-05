import { Form } from "react-bootstrap";
import Select from "react-select";

const ReadTimeSection = ({ value, unit, onChange }) => {
  const options = [
    { value: 'seconds', label: 'seconds' },
    { value: 'minutes', label: 'minutes' },
    { value: 'hours', label: 'hours' }
  ];

  const currentUnit = options.find(opt => opt.value === unit) || options[0];

  const handleSelectChange = (selected) => {
    onChange({
      target: {
        name: "readTimeUnit",
        value: selected ? selected.value : "minutes"
      }
    });
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>Read Time</Form.Label>
      <div className="d-flex gap-2">
        <Form.Control 
          className="w-25"
          type="number" 
          name="readTimeValue" 
          value={value} 
          onChange={onChange} 
          min="0"
        />
        <div className="flex-grow-1">
          <Select
            options={options}
            value={currentUnit}
            onChange={handleSelectChange}
            isSearchable={false}
          />
        </div>
      </div>
    </Form.Group>
  );
};

export default ReadTimeSection;