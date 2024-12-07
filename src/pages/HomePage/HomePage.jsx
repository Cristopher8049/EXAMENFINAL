import CardGrid from "../../components/CardGrid/CardGrid"
import Carousel from "../../components/Carousel/Carousel"
import Categories from "../../components/Categories/Categories"
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import { useEffect, useState } from 'react';

function HomePage() {
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
            console.log("Fetched events data:", eventsData); // Log the fetched data

            // Extract events array from the response
            if (eventsData && eventsData.data && eventsData.data.$values) {
                setEvents(eventsData.data.$values);
            } else {
                setEvents([]); // Set empty array if no events are found
            }
        } catch (error) {
            console.error("Error fetching events:", error);
            setEvents([]); // Set empty array on error
        }
    };

    return (
        <div>
            <Navbar />
            <Carousel />
            <Categories />
            <div className="card-grid-container">
                <div className="card-grid">
                    {events.map((event) => (
                        event && <CardGrid key={event.eventId} event={event} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default HomePage;
