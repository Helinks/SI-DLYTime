<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/recuperacion.css">
    <title>Recuperación de contraseña</title>
</head>

<body style="background-image: url('imagenes/fondo.jpg'); background-size: cover;">
    <div class="container-form login hide">
        <div class="form-information">
            <div class="form-information-childs">
                <h2>Restablecer Contraseña</h2>
                <form class="form form-login" method="POST" novalidate>
                    <div>
                        <label>
                            <i class='bx bx-envelope'></i>
                            <input type="email" placeholder="Correo Electrónico" name="userEmail">
                        </label>
                    </div>
                    <input type="submit" value="Restablecer" class="login-in" name="login">
                </form>
            </div>
        </div>
    </div>

    <?php
    require 'ct/ct_res.php';
    ?>
</body>
</html>