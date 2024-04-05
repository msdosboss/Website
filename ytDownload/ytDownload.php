<?php
    /*if (isset($_POST['execute'])){
        $output = shell_exec('echo Execute Order 66 >> /srv/http/website/test');

        echo "Order 66 complete";
    }*/

    $format = $_POST['formats'];
    $url = isset($_POST['URL']) ? escapeshellarg($_POST['URL']) : '';
    //$output = shell_exec("echo $url with option $format >> /srv/http/website/test2");
    $outputTemplate = "/srv/http/website/videos/%(title)s.%(ext)s";
    if($format == 'mp3'){        
        $output = shell_exec("yt-dlp --extract-audio -o '$outputTemplate' '$url'"); //--audio-format mp3
        $output = shell_exec("python ytDownload.py -a");
        $file = shell_exec("yt-dlp --print filename $url");
        $file = preg_filter("/\[[^\]]*\]/", "", $file);
        $file = str_replace(" ", "", $file);
        $file = str_replace(".webm", ".mp3", $file);
        $file = "/srv/http/website/videos/" . $file;
        $file = trim($file);
    }
    else if($format == 'mp4'){
        $output = shell_exec("yt-dlp -o '$outputTemplate' '$url'");
        $output = shell_exec("python ytDownload.py -v");
        $file = shell_exec("yt-dlp --print filename $url");
        $file = preg_filter("/\[[^\]]*\]/", "", $file);
        $file = str_replace(" ", "", $file);
        $file = str_replace(".webm", ".mp4", $file);
        $file = "/srv/http/website/videos/" . $file;
        $file = trim($file);

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
    }

    //$output = shell_exec("rm -f $file");

?>