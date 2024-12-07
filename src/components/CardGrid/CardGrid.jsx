import './CardGrid.css';
import { Link } from 'react-router-dom';

function CardGrid({ event }) {

  if (!event) return null;

  const {
    name = "No name",
    startDate = "No date",
    address = "No location",
    imageUrl = ""
  } = event;

  const formatEventDate = (date) => {
    if (date === "No date") return date;
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(date).toLocaleDateString("es-ES", options);

  };

  return (
    <div className="card-grid">
      <Link
        to={`/events/${event.id}`}
        state={{ eventDetails: event }}
        style={{ textDecoration: "none" }}
      >
        <div className="card">
          <img src={imageUrl} alt={name} className="card-image" />
          <div className="card-content">
            <h3>{name}</h3>
            <h4>{formatEventDate(startDate)}, {address}</h4>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardGrid;
