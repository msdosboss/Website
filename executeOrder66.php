<?php
if (isset($_POST['execute'])){
    $output = shell_exec('echo Execute Order 66 >> ~/test')

    echo "Order 66 complete"
}

?>