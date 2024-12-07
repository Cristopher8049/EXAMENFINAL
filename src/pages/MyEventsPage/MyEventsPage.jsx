import "./MyEventsPage.css";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import CardGrid from "../../components/CardGrid/CardGrid";
import Footer from "../../components/Footer/Footer";
import useAuth from "../../hooks/useAuth";

function MyEventsPage() {
  const [events, setEvents] = useState([]);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/events/my-events/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const eventsData = await response.json();
        console.log("Fetched events data:", eventsData);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (userId) {
      fetchEvents();
    } else {
      console.error("userId is undefined");
    }
  }, [userId]);

  return (
    <div>
      <Navbar />
      <div style={{ height: "80px" }}></div>
      <div className="card-grid-container">
        <h1>Mis Eventos</h1>
        <div className="card-grid">
          {events.map(
            (event) => event && <CardGrid key={event.eventId} event={event} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyEventsPage;
