<?php
require 'db/con_db.php';

// Agregar usuario
if (isset($_POST['agregar'])) {
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];

    // Encriptar la contraseña
    $hashedPassword = password_hash($contrasena, PASSWORD_DEFAULT);

    // Realizar la inserción en la base de datos
    $sql = "INSERT INTO usuarios (nombre, correo, contrasena) VALUES (:nombre, :correo, :contrasena)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':correo', $correo);
    $stmt->bindParam(':contrasena', $hashedPassword);
    $stmt->execute();
    // Redirigir de vuelta al CRUD después de agregar el usuario
    header("Location: crud.php");
    exit();
}

// Eliminar usuario
if (isset($_POST['eliminar'])) {
    $id = $_POST['id'];

    // Realizar la eliminación en la base de datos
    $sql = "DELETE FROM usuarios WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    // Redirigir de vuelta al CRUD después de eliminar el usuario
    header("Location: crud.php");
    exit();
}

// Editar usuario
if (isset($_POST['editar'])) {
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];

    // Encriptar la nueva contraseña si se proporcionó
    if (!empty($contrasena)) {
        $contrasena = password_hash($contrasena, PASSWORD_DEFAULT);
    }

    // Realizar la actualización en la base de datos
    $sql = "UPDATE usuarios SET nombre = :nombre, correo = :correo";
    // Agregar la actualización de la contraseña si se proporcionó
    if (!empty($contrasena)) {
        $sql .= ", contrasena = :contrasena";
    }
    $sql .= " WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':correo', $correo);
    // Asignar la nueva contraseña si se proporcionó
    if (!empty($contrasena)) {
        $stmt->bindParam(':contrasena', $contrasena);
    }
    $stmt->execute();
    // Redirigir de vuelta al CRUD después de editar el usuario
    header("Location: crud.php");
    exit();
}

// Obtener todos los usuarios
$sql = "SELECT * FROM usuarios";
$stmt = $conn->prepare($sql);
$stmt->execute();
$usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/crud.css">
    <title>CRUD de Usuarios</title>
</head>
<body style="background-color: rgba(255, 87, 87, 0.9);">
<div class="titulo1">
    <h1>CRUD</h1>
</div>

<div class="agregar-usuario">
    <h2>Agregar Usuario</h2>
</div>
    <form class="form brug" method="POST">
        <div class="form-group brug">
            <label>Nombre:</label>
            <input type="text" name="nombre" required>
        </div>
        <div class="form-group brug">
            <label>Correo:</label>
            <input type="email" name="correo" required>
        </div>
        <div class="form-group brug">
            <label>Contraseña:</label>
            <input type="password" name="contrasena" required>
        </div>
        <button type="submit" name="agregar" class="login-On brug">Agregar Usuario</button>
    </form>

    <div class="users-table-container brug">
        <table class="users-table brug">
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Contraseña</th>
                <th>Acciones</th>
            </tr>
            <?php foreach ($usuarios as $usuario): ?>
                <tr>
                    <td><?php echo $usuario['id']; ?></td>
                    <td><?php echo $usuario['nombre']; ?></td>
                    <td><?php echo $usuario['correo']; ?></td>
                    <td>********</td> <!-- Contraseña oculta -->
                    <td>
    <div style="display: flex; max-width: 70px;">
        <form method="POST" style="margin-left: 10%;margin-right: 5px;">
            <input type="hidden" name="id" value="<?php echo $usuario['id']; ?>">
            <input type="submit" name="eliminar" value="Eliminar" class="login-in brug">
        </form>
        <button onclick="mostrarEditar(<?php echo $usuario['id']; ?>, '<?php echo $usuario['nombre']; ?>', '<?php echo $usuario['correo']; ?>')" class="sing-on brug">Editar</button>
    </div>
</td>
                </tr>
            <?php endforeach; ?>
        </table>
    </div>

    <!-- Ventana emergente para editar usuario -->
    <div class="modal brug" id="editarUsuario" style="display: none;">
        <div class="modal-content brug">
            <h2>Editar Usuario</h2>
            <form method="POST">
                <input type="hidden" id="editId" name="id">
                <div class="form-group brug">
                    <label>Nombre:</label>
                    <input type="text" id="editNombre" name="nombre" required>
                </div>
                <div class="form-group brug">
                    <label>Correo:</label>
                    <input type="email" id="editCorreo" name="correo" required>
                </div>
                <div class="form-group brug">
                    <label>Nueva Contraseña:</label>
                    <input type="password" id="editContrasena" name="contrasena">
                </div>
                <button type="submit" name="editar" class="login-En brug">Guardar Cambios</button>
            </form>
        </div>
    </div>

    <script>
        function mostrarEditar(id, nombre, correo) {
            document.getElementById('editId').value = id;
            document.getElementById('editNombre').value = nombre;
            document.getElementById('editCorreo').value = correo;
            document.getElementById('editarUsuario').style.display = 'block';
        }
    </script>
</body>
</html>
