<?php
    /*if (isset($_POST['execute'])){
        $output = shell_exec('echo Execute Order 66 >> /srv/http/website/test');

        echo "Order 66 complete";
    }*/

    $format = $_POST['formats'];
    $url = isset($_POST['URL']) ? escapeshellarg($_POST['URL']) : '';
    //$output = shell_exec("echo $url with option $format >> /srv/http/website/test2");

    if($format == 'mp3'){
        $outputTemplate = "/srv/http/website/videos/%(title)s.%(ext)s";
        $output = shell_exec("yt-dlp --extract-audio --audio-format mp3 -o '$outputTemplate' '$url'");
        $file = shell_exec("yt-dlp --get-filename -o '$outputTemplate' $url");
    }
    else if($format == 'mp4'){

    }
    
    
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