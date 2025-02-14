<?php

$db_host = 'localhost';
$db_name = 'dlytime';
$db_user = 'root';
$db_pass = '';

try { 
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}

$registro_exitoso = false; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['register'])) {

        $username = $_POST['username'];
        $userEmail = $_POST['userEmail'];
        $userPassword = $_POST['userPassword'];
        $confirmPassword = $_POST['confirmPassword'];

        if (!empty($username) && !empty($userEmail) && !empty($userPassword) && !empty($confirmPassword)) {

            if ($userPassword === $confirmPassword) {
 
                if (filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {

                    $hashedPassword = password_hash($userPassword, PASSWORD_DEFAULT);

                    $sql = "INSERT INTO usuarios (nombre, correo, contrasena) VALUES (:nombre, :correo, :contrasena)";
                    $stmt = $conn->prepare($sql);

                    $stmt->bindParam(':nombre', $username);
                    $stmt->bindParam(':correo', $userEmail);
                    $stmt->bindParam(':contrasena', $hashedPassword);

                    if ($stmt->execute()) {

                        $registro_exitoso = true;
                        echo "<script>
            alert('¡Registro exitoso! Ahora puedes iniciar sesión');
            window.location = 'login.php'; // Redirigir al usuario a la página de inicio de sesión
          </script>";
                    } else {
                        // Error al ejecutar la consulta
                        echo "<script>
            alert('¡Error al registrar! Por favor, inténtalo de nuevo más tarde');
          </script>";
                    }
                } else {
                    // Correo electrónico no válido
                    echo "<script>
        alert('¡Correo electrónico inválido! Por favor, incluye un correo electrónico válido.');
      </script>";
                }
            } else {
                // Contraseñas no coinciden
                echo "<script>
        alert('¡Las contraseñas no coinciden! Por favor, verifica las contraseñas ingresadas');
      </script>";
            }
        } else {
            // Campos vacíos
            echo "<script>
        alert('¡Campos vacíos! Por favor, completa todos los campos del formulario');
      </script>";
        }
    }
}
?>
