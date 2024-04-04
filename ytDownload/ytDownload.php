<?php
    /*if (isset($_POST['execute'])){
        $output = shell_exec('echo Execute Order 66 >> /srv/http/website/test');

        echo "Order 66 complete";
    }*/

    $format = $_POST['formats'];
    $url = isset($_POST['URL']) ? escapeshellarg($_POST['URL']) : '';
    $output = shell_exec("echo $url with optition $format >> /srv/http/website/test2");

    $file = '/srv/http/website/test2';

    if(file_exists($file)){
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="'.basename($file).'"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file));
        readfile($file);
        exit;
    }
    //echo "This is $a";

?>