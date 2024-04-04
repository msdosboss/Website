<?php
    /*if (isset($_POST['execute'])){
        $output = shell_exec('echo Execute Order 66 >> /srv/http/website/test');

        echo "Order 66 complete";
    }*/

    $a = $_POST['URL'];
    //$output = shell_exec("echo ('$a') >> /srv/http/website/test2");
    $output = shell_exec("echo xDDDDDDDDDDDDd >> /srv/http/website/test2");
    echo "This is ('$a')";

?>