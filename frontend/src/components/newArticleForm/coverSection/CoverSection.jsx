import { Form } from "react-bootstrap";
import './CoverSection.css'

const CoverSection = ({ mode, setMode, file, getRootProps, getInputProps, isDragActive, value, onChange }) => (
  <Form.Group className="mb-3">
    <div className="d-flex justify-content-between align-items-center mb-2">
      <Form.Label className="m-0">Cover image</Form.Label>
      <div className="d-flex gap-2">
        <span 
          onClick={() => setMode('file')} 
          className={`cursor-pointer ${mode === 'file' ? 'text-decoration-underline' : 'text-secondary'}`}
        >Upload</span>
        <span>|</span>
        <span 
          onClick={() => setMode('url')} 
          className={`cursor-pointer ${mode === 'url' ? 'text-decoration-underline' : 'text-secondary'}`}
        >URL</span>
      </div>
    </div>
    {mode === "url" ? (
      <Form.Control type="url" name="cover" value={value} onChange={onChange} />
    ) : (
      <div {...getRootProps()} className={`dropzone-container ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        {file ? <p className="m-0">Selected: {file.name}</p> : <p className="m-0">Drag & drop or click to select</p>}
      </div>
    )}
  </Form.Group>
);

export default CoverSection;