import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./EventDetailPage.module.css";
import { useEffect, useState } from "react";

function EventDetailPage() {
  const [event, setEvent] = useState(null);
  const [isAttending, setIsAttending] = useState(false);

  const [showTeamForm, setShowTeamForm] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState(["", "", ""]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch("http://localhost:5219/api/Event/GetEventById/2");
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const result = await response.json();
        if (result.status && result.data) {
          setEvent(result.data);
        } else {
          console.error("Error fetching event:", result.mesage);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchEvent();
  }, []);

  const formatEventDate = (dateString) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    const months = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day} de ${month}`;
  };

  const formatEventTime = (dateString) => {
    if (!dateString) return "No time";
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours < 12 ? "AM" : "PM";
    if (hours > 12) hours -= 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleShowTeamForm = () => {

    if (isAttending) {

      setIsAttending(false);

    } else {

      setShowTeamForm(true);
    }
  };

  const handleMemberChange = (index, value) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  const handleSubmitTeamForm = async (e) => {
    e.preventDefault();

    const registrationData = {
      eventId: 2,
      teamName: teamName,
      memberNames: members.filter(m => m.trim() !== "")
    };

    console.log("Registration Data:", registrationData);

    try {
      const response = await fetch("http://localhost:5219/api/Event/EnrollTeam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        throw new Error("Failed to update attendance");
      }

      const data = await response.json();
      console.log("Attendance updated successfully:", data);
      setIsAttending(true);
      setShowTeamForm(false);
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  if (!event) {
    return (
      <div className={styles.container}>
        <Navbar />
        <div className={styles.content}>
          <p>Loading event details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.hero}>
        <img
          src={event.imageUrl}
          alt={event.name}
          className={styles.heroImage}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.eventInfo}>
          <div className={styles.grid}>
            <div className={styles.leftColumn}>
              <h2 className={styles.sectionTitle}>{event.name}</h2>
              <div className={styles.info}></div>
              <p className={styles.description}>{event.description}</p>
            </div>
            <div className={styles.rightColumn}>
              <Button
                size="lg"
                className={styles.button}
                onClick={handleShowTeamForm}
              >
                {isAttending ? "Ya estás asistiendo con un equipo" : "Asistir!"}
              </Button>
              {showTeamForm && !isAttending && (
                <div className={styles.formContainer}>
                  <form onSubmit={handleSubmitTeamForm} className={styles.teamForm}>
                    <label>
                      Nombre del equipo:
                      <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        required
                      />
                    </label>
                    <label>
                      Integrante 1:
                      <input
                        type="text"
                        value={members[0]}
                        onChange={(e) => handleMemberChange(0, e.target.value)}
                        required
                      />
                    </label>
                    <label>
                      Integrante 2:
                      <input
                        type="text"
                        value={members[1]}
                        onChange={(e) => handleMemberChange(1, e.target.value)}
                      />
                    </label>
                    <label>
                      Integrante 3:
                      <input
                        type="text"
                        value={members[2]}
                        onChange={(e) => handleMemberChange(2, e.target.value)}
                      />
                    </label>
                    <button type="submit">Confirmar asistencia con equipo</button>
                  </form>
                </div>
              )}
              <div className={styles.details}>
                <h3 className={styles.detailsTitle}>Detalles del evento</h3>
                <div className={styles.detailsContent}>
                  <div className={styles.infoItem}>
                    <CalendarIcon className={styles.icon} />
                    <p className={styles.infoText}>
                      {formatEventDate(event.startDate)}
                    </p>
                  </div>
                  <div className={styles.infoItem}>
                    <ClockIcon className={styles.icon} />
                    <p className={styles.infoText}>
                      {formatEventTime(event.startDate)}
                    </p>
                  </div>
                  <div className={styles.infoItem}>
                    <MapIcon className={styles.icon} />
                    <p className={styles.infoText}>{event.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {event.isPaid && (
            <div>
              <p>Precio: ${event.price}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

const CalendarIcon = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
};

const ClockIcon = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
};

const MapIcon = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
      <path d="M15 5.764v15" />
      <path d="M9 3.236v15" />
    </svg>
  );
};

const Button = ({ children, size, className, ...rest }) => {
  const buttonClasses = [
    styles.button,
    size === "lg" ? styles.large : "",
    className,
  ]
    .join(" ")
    .trim();

  return (
    <button className={buttonClasses} {...rest}>
      {children}
    </button>
  );
};

export default EventDetailPage;