<?php
$ds = DIRECTORY_SEPARATOR;  //1
 
$storeFolder = 'uploads';   //2
 
if (!empty($_FILES)) {
     
    $tempFile = $_FILES['file']['tmp_name'];          //3             
      
    $targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;  //4
     
    $targetFile =  $targetPath. $_FILES['file']['name'];  //5
    $partes_ruta = pathinfo($targetFile);
    $nombre = uniqid().".".$partes_ruta['extension'];
    $finalFile = $storeFolder.$ds.$nombre;
 
    if(@move_uploaded_file($tempFile,$finalFile)){
    	echo $nombre;
    } //6
     
}
?>