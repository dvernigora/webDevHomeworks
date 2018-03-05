<?php
$pathToDb = __DIR__ . '\db\data.json';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('location: index.php');
}

if (isset($_POST['vote'])) {
    $resOfVote = $_POST['vote'];
    $data = json_decode(file_get_contents($pathToDb), true);
    $data[$resOfVote]++;
    $pretty = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents($pathToDb, $pretty);
    echo 'ok';
}

