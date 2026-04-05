import { Form } from "react-bootstrap";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './ContentSection.css'

const ContentSection = ({ value, onChange }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Content</Form.Label>
      <div className="quill-editor-wrapper">
        <ReactQuill 
          theme="snow" 
          value={value} 
          onChange={onChange}
          placeholder="Write your article here..."
        />
      </div>
    </Form.Group>
  );
};

export default ContentSection;