<?php
$pathToUsersDb = 'db/data.json';
$data = json_decode(file_get_contents($pathToUsersDb), true);

unset($data[$_POST['id']]);

$newData = json_encode($data, JSON_UNESCAPED_UNICODE);
file_put_contents($pathToUsersDb, $newData);

