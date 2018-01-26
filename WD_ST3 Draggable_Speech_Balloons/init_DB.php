<?php
$pathToDb = __DIR__ . '/db/data.json';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('location: index.html');
}

$data = json_decode(file_get_contents($pathToDb), true);

switch ($_POST['action']) {
    case 'add':
        $data = insert_to_db($data);
        break;
    case 'remove':
        $data = remove_from_db($data);
        break;
    case 'update_coord':
        $data = update_coordinate($data);
        break;
}

file_put_contents($pathToDb, $data);

function insert_to_db($data) {
    $data[$_POST['id']] = [
        'xCoord' => (float)$_POST['xCoord'],
        'yCoord' => (float)$_POST['yCoord'], 
        'text' => $_POST['text']
    ];
    return json_encode($data, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
}

function remove_from_db($data) {
    unset($data[$_POST['id']]);
    return json_encode($data, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
}

function update_coordinate($data) {
    $data[$_POST['id']]['xCoord'] = (float)$_POST['xCoord'];
    $data[$_POST['id']]['yCoord'] = (float)$_POST['yCoord'];
    return json_encode($data, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
}

