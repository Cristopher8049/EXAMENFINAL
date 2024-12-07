import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import CreateEventPage from "./pages/CreateEventPage/CreateEventPage";
import EventDetailPage from "./pages/EventDetailPage/EventDetailPage";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import EventPage from "./pages/EventPage/EventPage";
import MyEventsPage from "./pages/MyEventsPage/MyEventsPage";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/createEvent" element={<ProtectedRoutes><CreateEventPage /></ProtectedRoutes>} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/events/:eventId" element={<EventDetailPage />} />
        <Route path="/my-events" element={<ProtectedRoutes><MyEventsPage /></ProtectedRoutes>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
