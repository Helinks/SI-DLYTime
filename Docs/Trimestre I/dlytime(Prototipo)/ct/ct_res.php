<?php
// Establecer la conexión a la base de datos
$db_host = 'localhost';
$db_name = 'dlytime';
$db_user = 'root';
$db_pass = '';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require './PHPMailer/Exception.php';
require './PHPMailer/PHPMailer.php';
require './PHPMailer/SMTP.php';

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

        // Validar que los campos no estén vacíos
        if (!empty($userEmail)) {
            // Consultar la base de datos para encontrar el usuario por su correo electrónico
            $sql = "SELECT * FROM usuarios WHERE correo = :correo";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':correo', $userEmail);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);


            // Verificar si se encontró un usuario con el correo electrónico proporcionado
            if ($user) {
                $mail = new PHPMailer(true);

try {
    //Server settings
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp-mail.outlook.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'dlytime@outlook.com';                     //SMTP username
    $mail->Password   = 'KSSG29/11';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption
    $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('dlytime@outlook.com', 'DLYTime Bussines');
    $mail->addAddress($userEmail, 'Joe User');     //Add a recipient

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Recuperación de contraseña';
    $mail->Body    = 'Hola, este correo es generado para el restablecimiento de tu contraseña, por favor, <a href="localhost/dlytime/restablecimiento.php?id='.$user['id'].'">Da click aqui</a>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
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