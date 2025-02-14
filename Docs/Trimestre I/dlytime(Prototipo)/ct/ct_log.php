<?php
// Establecer la conexión a la base de datos
$db_host = 'localhost';
$db_name = 'dlytime';
$db_user = 'root';
$db_pass = '';

session_start();

try { 
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar si se ha enviado el formulario de inicio de sesión
    if (isset($_POST['login'])) {
        // Recuperar los datos del formulario
        $userEmail = $_POST['userEmail'];
        $userPassword = $_POST['userPassword'];

        // Validar que los campos no estén vacíos
        if (!empty($userEmail) && !empty($userPassword)) {
            // Consultar la base de datos para encontrar el usuario por su correo electrónico
            $sql = "SELECT * FROM usuarios WHERE correo = :correo";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':correo', $userEmail);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Verificar si se encontró un usuario con el correo electrónico proporcionado
            if ($user) {
                // Verificar si la contraseña coincide
                if (password_verify($userPassword, $user['contrasena'])) {
                    // Inicio de sesión exitoso
                    $_SESSION['id'] = $user['id'];
                    echo "<script>
        alert('¡Inicio de sesión exitoso! Bienvenido de vuelta');
        window.location = 'index.php'; // Redirigir al usuario al dashboard
      </script>";
              
                } else {
                    // Contraseña incorrecta
                    echo "<script>
                        Swal.fire({
                            alert('¡Contraseña incorrecta! Por favor, verifica tu contraseña');
                        });
                      </script>";
                }
            } else {
                // Usuario no encontrado
                echo "<script>
        alert('¡Usuario no encontrado! Por favor, verifica tu correo electrónico');
      </script>";
            }
        } else {
            // Campos vacíos
            echo "<script>
        alert('¡Campos vacíos! Por favor, completa todos los campos');
      </script>";
        }
    }
}
?>