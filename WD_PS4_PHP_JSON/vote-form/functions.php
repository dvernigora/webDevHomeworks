<?php
if (isset($_POST['getVote'])) {
    $resOfVote = $_POST['vote'];
    $data = json_decode(file_get_contents('data.json'), true);
    $data[$resOfVote]++;
    $pretty = json_encode($data, JSON_PRETTY_PRINT);
    $fp = fopen('data.json', "w");
    fputs($fp, $pretty);
    fclose($fp);
    header('Location: statistics.php');
}
?>