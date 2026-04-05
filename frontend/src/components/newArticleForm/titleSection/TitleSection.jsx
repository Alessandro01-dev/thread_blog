import { Form } from "react-bootstrap";

const TitleSection = ({ value, onChange }) => (
  <Form.Group className="mb-3">
    <Form.Label>Title</Form.Label>
    <Form.Control 
      type="text" 
      name="title" 
      value={value} 
      onChange={onChange} 
      required 
    />
  </Form.Group>
);

export default TitleSection;