<?php
$pathToDb = __DIR__ . '\db\data.json';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('location: index.html');
}

if (!file_exists($pathToDb)) {
    $template = [
    "Sanguine" => 0,
    "Choleric" => 0,
    "Melancholic" => 0,
    "Phlegmatic" => 0 ];
    file_put_contents($pathToDb, json_encode($template, JSON_PRETTY_PRINT));
}

if (!is_writable($pathToDb)) {
    echo "The file $pathToDb is not writable";
    return false;
}

if (isset($_POST['vote'])) {
    $resOfVote = $_POST['vote'];
    $data = json_decode(file_get_contents($pathToDb), true);
    $data[$resOfVote]++;
    $pretty = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents($pathToDb, $pretty);
    echo 'ok';
}

