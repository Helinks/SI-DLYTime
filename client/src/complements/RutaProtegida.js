import { Navigate } from "react-router-dom";

const RutaProtegida = ({ children, requiredRole }) => {
    const token = localStorage.getItem("authToken");
    const rol = localStorage.getItem("userRole");

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && parseInt(rol, 10) !== requiredRole) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default RutaProtegida;