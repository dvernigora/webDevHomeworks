<?php
$pathToDb = __DIR__ . '/db/messages.json';
$data = json_decode(file_get_contents($pathToDb), true);
//setlocale(LC_ALL, 'Ukrainian');

if (isset($_POST['message'])) {
    $data[date('Y-m-d H:i:s')] = [
        $_COOKIE['userName'],
        $_POST['message']
    ];
    $data = json_encode($data, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
    file_put_contents($pathToDb, $data); 
}

if (isset($_POST['clearDB'])) {
    file_put_contents($pathToDb, '');
}
//echo '[' . date("Y-m-d H:i:s") . '] ' . ucfirst($_POST['user-name']) . ': Hello world!';