<?php
require_once './db/con_db.php';

if(isset($_POST['Restablecer'])){
    $contraseña = $_POST['userPassword'];
    $confirm_contraseña= $_POST['userPasswordConfirm'];
    $id = $_POST['id'];
    
    if($contraseña==$confirm_contraseña) {
    

        $contraseña = password_hash($contraseña, PASSWORD_DEFAULT);
        


    // Realizar la actualización en la base de datos
    $sql = "UPDATE usuarios SET contrasena = :password WHERE id = :id";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->bindValue(':password', $contraseña);

    $stmt->execute();
   
    

    header("Location: login.php");
    exit();
    }
}

?>