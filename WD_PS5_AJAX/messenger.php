<?php
require_once('checkDB.php');
$pathToDb = 'db' . DIRECTORY_SEPARATOR . 'messages.json';
$response = checkDB($pathToDb);

if ($response['err']) {
    echo json_encode($response);
    return;
}
session_start();

$data = json_decode(file_get_contents($pathToDb), true);
$currentDate = new DateTime();
$newMessages = [];

foreach ($data as $key => $value) {
    $timeLimit = new DateTime($value['date']);
    $timeLimit->modify('+1 hour');
    if ($timeLimit > $currentDate) {
        $newMessages[] = $data[$key];
    }
}

if (isset($_POST['message'])) {
    $userMsg = [
        'date' => $currentDate->format('d.m.Y H:i:s'), 
        'name' => $_SESSION['userName'], 
        'msg' => $_POST['message']
    ];

    $data[] = $userMsg;
    $newMessages[] = $userMsg;

    $data = json_encode($data, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
    file_put_contents($pathToDb, $data);
    echo json_encode($userMsg);
    return;
}

if (isset($_POST['getMessages'])) {
    echo json_encode($newMessages);
}

