import './ToggleLoginSignup.css';

const ToggleLoginSignup = ({ onToggle, isLogin }) => {

  const handleChange = () => {
    onToggle();
  };

  return (
    <div className="toggle-container">
      <label className="switch">
        <input
          type="checkbox"
          checked={!isLogin}
          onChange={handleChange}
        />
        <span className="slider round d-flex justify-content-between align-items-center">
          
            Log in
          
          <span
            className="slider-text text-end"
          >
            Sign up
          </span>
        </span>
      </label>
    </div>
  );
};

export default ToggleLoginSignup;
