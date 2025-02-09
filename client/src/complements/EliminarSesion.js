import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Eliminar token y rol del almacenamiento local
        localStorage.clear();

        navigate("/login");
    };

    return (
        <div onClick={handleLogout}>
            Cerrar sesión
        </div>
    );
};

export default LogoutButton;