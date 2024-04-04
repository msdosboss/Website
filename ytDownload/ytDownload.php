<?php
    /*if (isset($_POST['execute'])){
        $output = shell_exec('echo Execute Order 66 >> /srv/http/website/test');

        echo "Order 66 complete";
    }*/

    $url = $_POST['URL'];
    $format = $_POST['formats'];
    $output = shell_exec("echo $url with optition $format >> /srv/http/website/test2");
    //echo "This is $a";

?>