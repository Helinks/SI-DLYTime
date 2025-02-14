<?php
header('Content-Type: application/json');
$pdo=new PDO("mysql:dbname=dlytime;host=127.0.0.1","root","");

// Seleciona los eventos del calendario
$sentenciaSQL= $pdo->prepare("SELECT * FROM citas");
$sentenciaSQL->execute();

$resultado= $sentenciaSQL->fetchALL(PDO::FETCH_ASSOC);
echo json_encode($resultado);
?>