<?php
// Incluir el archivo de conexión
require_once "db/con_db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar si se envió el formulario de agregar cita
    if (isset($_POST['agregar_cita'])) {
        try {
            // Recibir los datos del formulario
            $title = $_POST['title'];
            $description = $_POST['description'];
            $start = $_POST['start'];
            $end = $_POST['end'];

            // Preparar la consulta SQL para insertar la cita
            $sql = "INSERT INTO citas (title, description, start, end) VALUES (:title, :description, :start, :end)";
            $stmt = $conn->prepare($sql);

            // Vincular los parámetros
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':start', $start);
            $stmt->bindParam(':end', $end);

            // Ejecutar la consulta
            if ($stmt->execute()) {
                // Redirigir a la página principal o a una página de éxito
                header("Location: adm_citas.php");
                exit();
            } else {
                // Mostrar un mensaje de error si la inserción falla
                echo "<script>alert('Error al agregar la cita');</script>";
            }
        } catch (PDOException $e) {
            // Manejar errores de la base de datos
            echo "Error al agregar la cita: " . $e->getMessage();
        }
    }

    // Verificar si se envió el formulario de editar cita
    if (isset($_POST['editar_cita'])) {
        try {
            // Recibir los datos del formulario
            $id = $_POST['id'];
            $nombre = $_POST['title'];
            $description = $_POST['description'];
            $start = $_POST['start'];
            $end = $_POST['end'];

            // Preparar la consulta SQL para actualizar la cita
            $sql = "UPDATE citas SET title = :title, description = :description, start = :start, end = :end WHERE id = :id";
            $stmt = $conn->prepare($sql);

            // Vincular los parámetros
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':start', $start);
            $stmt->bindParam(':end', $end);

            // Ejecutar la consulta
            if ($stmt->execute()) {
                // Redirigir a la página principal o a una página de éxito
                header("Location: adm_citas.php");
                exit();
            } else {
                // Mostrar un mensaje de error si la actualización falla
                echo "<script>alert('Error al editar la cita');</script>";
            }
        } catch (PDOException $e) {
            // Manejar errores de la base de datos
            echo "Error al editar la cita: " . $e->getMessage();
        }
    }
}

// Verificar si se recibió una solicitud POST para eliminar una cita
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['eliminar_cita'])) {
    // Verificar si se recibió el ID de la cita a eliminar
    if (isset($_POST['id_cita'])) {
        try {
            // Obtener el ID de la cita a eliminar
            $id_cita = $_POST['id_cita'];

            // Preparar la consulta SQL para eliminar la cita
            $sql = "DELETE FROM citas WHERE id = :id";
            $stmt = $conn->prepare($sql);

            // Vincular el parámetro
            $stmt->bindParam(':id', $id_cita);

            // Ejecutar la consulta
            if ($stmt->execute()) {
                // Redirigir de vuelta a la misma página después de eliminar la cita
                header("Location: {$_SERVER['PHP_SELF']}");
                exit();
            } else {
                // Mostrar un mensaje de error si la eliminación falla
                echo "<script>alert('Error al eliminar la cita');</script>";
            }
        } catch (PDOException $e) {
            // Manejar errores de la base de datos
            echo "Error al eliminar la cita: " . $e->getMessage();
        }
    } else {
        // Mostrar un mensaje si no se proporcionó un ID de cita para eliminar
        echo "<script>alert('ID de cita no proporcionado');</script>";
    }
}

// Consulta SQL para obtener las citas disponibles
$sql = "SELECT * FROM citas";
$resultado = $conn->query($sql);

// Verifica si se encontraron resultados
if ($resultado && $resultado->rowCount() > 0) {
    // Almacena los resultados en la variable $citas
    $citas = $resultado->fetchAll(PDO::FETCH_ASSOC);
} else {
    // Si no se encontraron resultados, asigna un arreglo vacío a $citas
    $citas = [];
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/citas_style.css">
    <title>CRUD de Citas</title>
</head>
<body style="background-color: rgba(255, 87, 87, 0.9);">
<div>
       <?php require 'partials/header.php' ?>
     </div>


<main>
<form class="form" method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
    <div class="form-group">
        <label>Nombre:</label>
        <input type="text" name="title" class="input" required>
    </div>
    <div class="form-group">
        <label>Descripción:</label>
        <input type="text" name="description" class="input" required>
    </div>
    <div class="form-group">
        <label>Fecha de inicio:</label>
        <input type="datetime-local" name="start" class="input" required>
    </div>
    <div class="form-group">
        <label>Fecha de fin:</label>
        <input type="datetime-local" name="end" class="input" required>
    </div>
    <button type="submit" name="agregar_cita" class="btn-agregar">Agregar Cita</button>
</form>


<div class="citas-table-container">
    <table class="citas-table">
        <tr>
            <th class="th">ID</th>
            <th class="th">Nombre</th>
            <th class="th">Descripción</th>
            <th class="th">Fecha de Inicio</th>
            <th class="th">Fecha de Fin</th>
            <th class="th">Acciones</th>
        </tr>
        <?php foreach ($citas as $cita): ?>
            <tr>
                <td class="td"><?php echo $cita['id']; ?></td>
                <td class="td"><?php echo $cita['title']; ?></td>
                <td class="td"><?php echo $cita['description']; ?></td>
                <td class="td"><?php echo $cita['start']; ?></td>
                <td class="td"><?php echo $cita['end']; ?></td>
                <td class="td">
                    <div style="display: flex;">
                        <form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>" style="margin-right: 5px;">
                            <input type="hidden" name="id_cita" value="<?php echo $cita['id']; ?>">
                            <button type="submit" name="eliminar_cita" class="btn-eliminar">Eliminar</button>
                        </form>
                        <button onclick="mostrarEditar(<?php echo $cita['id']; ?>, '<?php echo $cita['title']; ?>', '<?php echo $cita['description']; ?>', '<?php echo $cita['start']; ?>', '<?php echo $cita['end']; ?>')" class="btn-editar">Editar</button>
                    </div>
                </td>
            </tr>
        <?php endforeach; ?>
    </table>
</div>
        </main>
<!-- Ventana emergente para editar cita -->
<div id="editarCita" class="modal" style="display: none;">
    <div class="modal-content">
        <h2 class="subtitulo">Editar Cita</h2>
        <form method="POST">
            <input type="hidden" id="editId" name="id">
            <div class="form-group">
                <label>Nombre:</label>
                <input type="text" id="editTitle" name="title" class="input" required>
            </div>
            <div class="form-group">
                <label>Descripción:</label>
                <input type="text" id="editDescription" name="description" class="input" required>
            </div>
            <div class="form-group">
                <label>Fecha de inicio:</label>
                <input type="datetime-local" id="editStart" name="start" class="input" required>
            </div>
            <div class="form-group">
                <label>Fecha de fin:</label>
                <input type="datetime-local" id="editEnd" name="end" class="input" required>
            </div>
            <button type="submit" name="editar_cita" class="btn-guardar">Guardar Cambios</button>
        </form>
    </div>
</div>

<script>
    function mostrarEditar(id, title, description, start, end) {
        document.getElementById('editId').value = id;
        document.getElementById('editTitle').value = title;
        document.getElementById('editDescription').value = description;
        document.getElementById('editStart').value = start;
        document.getElementById('editEnd').value = end;
        document.getElementById('editarCita').style.display = 'block';
    }
</script>
</body>
</html>
