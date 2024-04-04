<?php
/*if (isset($_POST['execute'])){
    $output = shell_exec('echo Execute Order 66 >> /srv/http/website/test');

    echo "Order 66 complete";
}*/

echo $_POST['URL'];
$output = shell_exec('echo Execute Order 66 >> /srv/http/website/test2')

?>