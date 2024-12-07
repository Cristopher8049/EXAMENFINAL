import "./EventDetails.css"; // Import CSS file for styling

const EventDetails = ({ event }) => {
  const {
    eventName,
    eventDescription,
    eventLocation,
    contactInfo,
    eventImage,
    eventDate,
    eventStartTime,
    eventEndTime,
  } = event;

  const handleAttendClick = () => {
    // Replace with your logic to handle attending the event
    console.log(`Attending event: ${eventName}`);
  };

  return (
    <div className="event-details">
      <h2>{eventName}</h2>
      <div className="event-details-grid">
        <div className="event-description">
          <p>
            <strong>Detalles/Descripción:</strong>
          </p>
          <p>{eventDescription}</p>
        </div>
        <div className="event-info">
          <p>
            <strong>Ubicación/Lugar:</strong> {eventLocation}
          </p>
          <p>
            <strong>Información de contacto:</strong> {contactInfo}
          </p>
          <p>
            <strong>Fecha de realización:</strong> {eventDate}
          </p>
          <p>
            <strong>Hora de inicio:</strong> {eventStartTime}
          </p>
          <p>
            <strong>Hora de finalización:</strong> {eventEndTime}
          </p>
        </div>
      </div>
      {eventImage && (
        <img src={eventImage} alt={eventName} className="event-image" />
      )}
      <button className="attend-button" onClick={handleAttendClick}>
        Asistir al evento
      </button>
    </div>
  );
};

export default EventDetails;
