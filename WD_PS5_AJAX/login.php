<?php
error_reporting(E_ERROR);

$pathToUsersDb = 'db/users_db.json';
$data = json_decode(file_get_contents($pathToUsersDb), true);
$userName = strtolower($_POST['user-name']);
$passwordCurrentUser = $data[$userName];
if ($passwordCurrentUser !== null) {
    if ($passwordCurrentUser != $_POST['user-password']) {
        echo('Wrong password.');
        return;
    } else {
        echo 'registration confirmed';
        return;
    }
} else {
    $data[$userName] = $_POST['user-password'];
    $newData = json_encode($data, JSON_PRETTY_PRINT);
    $fp = fopen($pathToUsersDb, "wb");
    fputs($fp, $newData);
    fclose($fp);
    echo 'registration confirmed';
    return;
}

