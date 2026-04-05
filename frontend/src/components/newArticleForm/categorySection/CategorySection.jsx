import { Form } from "react-bootstrap";
import Select from "react-select";
import { categories } from "../../../utils/categories";

const CategorySection = ({ value, onChange }) => {
  
  const defaultValue = categories.find(cat => cat.value === value) || null;

  const handleSelectChange = (selectedOption) => {
    onChange({
      target: {
        name: "category",
        value: selectedOption ? selectedOption.value : ""
      }
    });
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>Category</Form.Label>
      <Select
        classNamePrefix="react-select"
        options={categories}
        value={defaultValue}
        onChange={handleSelectChange}
        placeholder="Select category..."
        isClearable
        required
      />
    </Form.Group>
  );
};

export default CategorySection;