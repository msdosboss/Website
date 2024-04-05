<?php
    /*if (isset($_POST['execute'])){
        $output = shell_exec('echo Execute Order 66 >> /srv/http/website/test');

        echo "Order 66 complete";
    }*/

    $format = $_POST['formats'];
    $url = isset($_POST['URL']) ? escapeshellarg($_POST['URL']) : '';
    //$output = shell_exec("echo $url with option $format >> /srv/http/website/test2");

    if($format == 'mp3'){
        //$outputTemplate = "/srv/http/website/videos/%(title)s.mp3"; //%(title)s.%(ext)s
        //$output = shell_exec("yt-dlp --extract-audio -o '$outputTemplate' '$url'"); //--audio-format mp3
        $file = shell_exec("yt-dlp --print filename $url");
        $file = preg_filter("/\[[^\]]*\]/", "", $file);
        echo "this is the name of the file $file";
    }
    else if($format == 'mp4'){

    }
    
    
    /*if(file_exists($file)){
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="'.basename($file).'"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file));
        readfile($file);
        exit;
    }*/
    //echo "This is $a";

?>