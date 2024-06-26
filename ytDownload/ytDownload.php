<?php

    $format = $_POST['formats'];
    $url = isset($_POST['URL']) ? escapeshellarg($_POST['URL']) : '';
    $url = filter_var($url, FILTER_SANITIZE_URL);
    $outputTemplate = "/srv/http/website/videos/%(title)s.%(ext)s";
    if(substr_compare($url, "'https://www.youtube.com", 0, 24) != 0){
        echo "Not valid input $url";
        exit;
    }

    if($format == 'mp3'){        
        $output = shell_exec("yt-dlp --extract-audio -o '$outputTemplate' '$url'"); //--audio-format mp3
        $output = shell_exec("python ytDownload.py -a");
        $file = shell_exec("yt-dlp --print filename $url");
        $file = preg_filter("/\[[^\]]*\]/", "", $file);
        $file = str_replace(" ", "", $file);
        $file = str_replace("'", "", $file);
        $file = str_replace(".webm", ".mp3", $file);
        $file = "/srv/http/website/videos/" . $file;
        $file = trim($file);
    }
    
    else if($format == 'mp4'){
        $output = shell_exec("yt-dlp -o '$outputTemplate' '$url'");
        $output = shell_exec("python ytDownload.py -v");
        $file = shell_exec("yt-dlp --print filename $url");
        $file = preg_filter("/\[[^\]]*\]/", "", $file);
        $file = str_replace("'", "", $file);
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

    $output = shell_exec("rm -f '$file'");
    $file = str_replace("/srv/http/website/videos/","", $file);
    $output = shell_exec("echo $file >> /srv/http/website/videos/videosDonwloaded");

?>