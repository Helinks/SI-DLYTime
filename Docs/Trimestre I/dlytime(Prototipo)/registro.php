<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="css/style.css">
    <title>FORMULARIO DE REGISTRO E INICIO SESIÓN</title>
</head>
<?php
require 'db/con_db.php'; 
require 'ct/ct_reg.php';
?>
<body style="background-image: url(); background-size: cover;">
    <div class="container-form register hide">
        <div class="information">
            <div class="info-childs">
                <h2>¿Ya tienes una cuenta?</h2>
                <p><a href="login.php"><input type="button" value="Iniciar Sesión" id="sign-in"></a></p>
            </div>
        </div>
        <div class="form-information">
            <div class="form-information-childs">
                <h2>Registro</h2>
                <form class="form form-register" method="post" novalidate>
                    <div>
                        <label>
                            <i class='bx bx-user'></i>
                            <input type="text" placeholder="Nombre de Usuario" name="username">
                        </label>
                    </div>
                    <div>
                        <label>
                            <i class='bx bx-envelope'></i>
                            <input type="email" placeholder="Correo Electrónico" name="userEmail">
                        </label>
                    </div>
                    <div>
                        <label>
                            <i class='bx bx-lock-alt'></i>
                            <input type="password" placeholder="Contraseña" name="userPassword">
                        </label>
                    </div>
                    <div>
                        <label>
                            <i class='bx bx-lock-alt'></i>
                            <input type="password" placeholder="Confirmar Contraseña" name="confirmPassword">
                        </label>
                    </div>
                    <input type="submit" value="Registrarse" class="sing-on" name="register">
                </form>
            </div>
        </div>
    </div>
</body>
</html>