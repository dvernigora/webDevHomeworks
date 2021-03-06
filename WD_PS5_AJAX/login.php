<?php
require_once('checkDB.php');
$pathToUsersDb = 'db' . DIRECTORY_SEPARATOR . 'users_db.json';
$response = checkDB($pathToUsersDb);

if ($response['err']) {
    echo json_encode($response);
    return;
}

$data = json_decode(file_get_contents($pathToUsersDb), true);
$userName = $_POST['name'];
$userKey = strtolower($userName);

if(isset($_SESSION)) {
    session_destroy();
}
session_start();

if (isset($data[$userKey])) {
    $userPass = $data[$userKey];
    if ($userPass != $_POST['pass']) {
        $response['status'] = '';
        $response['msg'] = 'Wrong password';
        echo json_encode($response);
        return;
    } 

    $_SESSION['name'] = $userName;
    $_SESSION['hellomsg'] = true;
    echo json_encode($response);
    return;
}

$data[$userKey] = $_POST['pass'];
$newData = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
file_put_contents($pathToUsersDb, $newData);

$_SESSION['name'] = $userName;
$_SESSION['hellomsg'] = true;

echo json_encode($response);
return;

