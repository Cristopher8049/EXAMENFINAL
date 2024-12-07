// IconButton.js
import './IconButton.css';

const IconButton = ({ Icon, label }) => (
    <div className="icon-button">
        <div className="icon-circle">
            <Icon className="icon" />
        </div>
        <p>{label}</p>
    </div>
);

export default IconButton;