import { Navigate } from "react-router-dom";

const RutaProtegida = ({ children, requiredRole }) => {
  const token = localStorage.getItem("authToken");
  const rol = localStorage.getItem("userRole");
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && !requiredRole.includes(Number(rol))) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RutaProtegida;
