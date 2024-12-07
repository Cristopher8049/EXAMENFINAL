import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();


    if (loading) {
        return <div>Loading...</div>;
    }


    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoutes;