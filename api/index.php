<?php
require_once 'Firestore.php';

$fs = new Firestore('libros');



echo '<pre>';
$id = uniqid();
print_r($fs->newDocument($id, ['capital' => false]));

echo $id;