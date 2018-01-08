<?php
if (isset($_POST['getVote'])) {
    $resOfVote = $_POST['vote'];
    $data = json_decode(file_get_contents('data.json'), true);
    $data[$resOfVote]++;
    $pretty = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents('data.json', $pretty);
    header('Location: statistics.php');
}

