import { Navigate } from "react-router-dom";

const RutaProtegida = ({ children, requiredRole }) => {
  const token = localStorage.getItem("authToken");
  const rol = localStorage.getItem("userRole");
  
  alert(requiredRole);
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && !requiredRole.includes(Number(rol))) {
    return <Navigate to="/manoo" />;
  }

  return children;
};

export default RutaProtegida;
