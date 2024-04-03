<?php 
// Check for safe mode
if( ini_get('safe_mode') ){
    // Do it the safe mode way
echo "Do it the safe mode way";
}else{
    // Do it the regular way
echo "Do it the regular way";
}

?>
