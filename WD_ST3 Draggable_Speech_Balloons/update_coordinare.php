<?php
$pathToUsersDb = 'db/data.json';
$data = json_decode(file_get_contents($pathToUsersDb), true);

$data[$_POST['id']]['xCoord'] = $_POST['xCoord'];
$data[$_POST['id']]['yCoord'] = $_POST['yCoord'];

$newData = json_encode($data, JSON_UNESCAPED_UNICODE);
file_put_contents($pathToUsersDb, $newData);

