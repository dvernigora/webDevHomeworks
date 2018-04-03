<?php
session_start();
$pathToDb = __DIR__ . '/db/messages.json';
$data = json_decode(file_get_contents($pathToDb), true);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('location: index.html');
}

if (!file_exists($pathToDb)) {
    echo "The file $pathToDb is not exists";
    return;
}

if (!is_writable($pathToDb)) {
    echo "The file $pathToDb is not writable";
    return;
}

if (isset($_POST['message'])) {
    $data[] = [
        $_POST['time'],
        $_SESSION['userName'],
        $_POST['message']
    ];
    $data = json_encode($data, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
    file_put_contents($pathToDb, $data);
    echo 'ok';
}

