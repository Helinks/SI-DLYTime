<?php
$db_host = 'localhost';
$db_name = 'dlytime';
$db_user = 'root';
$db_pass = '';

try { 
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
    


?>