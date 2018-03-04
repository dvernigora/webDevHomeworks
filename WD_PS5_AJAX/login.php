<?php
$res = ['msg' => '', 'err' => '', 'status' => 'ok'];
$pathToUsersDb = 'db/users_db.json';
$data = json_decode(file_get_contents($pathToUsersDb), true);
$userName = $_POST['user-name'];
$userKey = strtolower($userName);

if (isset($data[$userKey])) {
    $userPass = $data[$userKey];
    if ($userPass != $_POST['user-password']) {
        echo('Wrong password.');
        return;
    } 
    setcookie('userName', $userName);
    $res['msg'] = 'ok';
    echo 'registration confirmed';
    return;
}

$data[$userKey] = $_POST['user-password'];
$newData = json_encode($data, JSON_PRETTY_PRINT);
$fp = fopen($pathToUsersDb, "wb");
fputs($fp, $newData);
fclose($fp);
setcookie('userName', $userName);
echo 'registration confirmed';
return;
