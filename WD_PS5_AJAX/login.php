<?php
$pathToUsersDb = 'db/users_db.json';
$data = json_decode(file_get_contents($pathToUsersDb), true);
$userName = $_POST['user-name'];
$userKey = strtolower($userName);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('location: index.html');
}

if (!file_exists($pathToUsersDb)) {
    echo "The file $pathToUsersDb is not exists";
    return;
}

if (!is_writable($pathToUsersDb)) {
    echo "The file $pathToUsersDb is not writable";
    return;
}

if(isset($_SESSION)) {
    session_destroy();
}
session_start();

if (isset($data[$userKey])) {
    $userPass = $data[$userKey];
    if ($userPass != $_POST['user-password']) {
        echo('Wrong password.');
        return;
    } 

    $_SESSION['userName'] = $userName;
    $_SESSION['showHelloMsg'] = true;
    echo 'registration confirmed';
    return;
}

$data[$userKey] = $_POST['user-password'];
$newData = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
file_put_contents($pathToUsersDb, $newData);

$_SESSION['userName'] = $userName;
$_SESSION['showHelloMsg'] = true;

echo 'registration confirmed';
return;

