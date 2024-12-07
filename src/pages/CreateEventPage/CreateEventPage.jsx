import { useState } from "react";
import "./CreateEventPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import useAuth from "../../hooks/useAuth";

const CreateEventPage = () => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [error, setError] = useState("");
  const { userId } = useAuth();

  const handleEventSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      eventName,
      eventDescription,
      eventLocation,
      contactInfo,
      eventImage,
      eventDate,
      eventStartTime,
      eventEndTime,
      userId,
    };


    try {
      const response = await fetch("http://localhost:8000/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create event");
      }

      alert("Event created successfully!");
      setEventName("");
      setEventDescription("");
      setEventLocation("");
      setContactInfo("");
      setEventImage("");
      setEventDate("");
      setEventStartTime("");
      setEventEndTime("");
      setError("");
    } catch (error) {
      console.error("Error creating event:", error);
      setError(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-event-container">
        <h2 className="page-title">Crear Nuevo Evento</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleEventSubmit} className="event-form">
          <div className="form-group">
            <label htmlFor="eventName">Nombre del Evento:</label>
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventDescription">Descripción:</label>
            <textarea
              id="eventDescription"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="eventLocation">Ubicación:</label>
            <input
              type="text"
              id="eventLocation"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              required
            />
          </div>
          <div className="form-group-grid">
            <div className="form-group">
              <label htmlFor="contactInfo">Teléfono:</label>
              <input
                type="text"
                id="contactInfo"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventImage">Imagen (URL):</label>
              <input
                type="text"
                id="eventImage"
                value={eventImage}
                onChange={(e) => setEventImage(e.target.value)}
                required
              ></input>
            </div>
          </div>
          <div className="form-group-grid">
            <div className="form-group">
              <label htmlFor="eventDate">Fecha de realización:</label>
              <input
                type="date"
                id="eventDate"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventStartTime">Hora de inicio:</label>
              <input
                type="time"
                id="eventStartTime"
                value={eventStartTime}
                onChange={(e) => setEventStartTime(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventEndTime">Hora de finalización:</label>
              <input
                type="time"
                id="eventEndTime"
                value={eventEndTime}
                onChange={(e) => setEventEndTime(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="submit-button">
            Crear Evento
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateEventPage;