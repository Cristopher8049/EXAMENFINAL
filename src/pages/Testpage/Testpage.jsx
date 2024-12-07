import { useState, useEffect } from "react";
import EventDetails from "../../components/Events/EventDetails";
import Navbar from "../../components/Navbar/Navbar";
import "./Testpage.css"; // Import CSS file for styling

const Testpage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5219/api/Event/GetAllEvents");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const eventsData = await response.json();

      // Ensure eventsData is an array
      if (eventsData && eventsData.data && eventsData.data.$values) {
        setEvents(eventsData.data.$values);
      } else {
        setEvents([]); // Set to an empty array if no events are found
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]); // Ensure state is set even on error
    }
  };


  return (
    <>
      <Navbar />
      <div className="testpage-container">
        <div className="events-container">
          {events.map((event) => (
            <EventDetails key={event.eventId} event={event} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Testpage;
