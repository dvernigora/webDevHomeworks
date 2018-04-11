<?php 
error_reporting(E_ERROR | E_PARSE);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('location: index.html');
}

function checkDB($pathToFile) {
    $response = ['status' => 'ok', 'err' => '', 'msg' => ''];

    if (!file_exists($pathToFile)) {
        $file = file_put_contents($pathToFile, '[]');
        if (!$file) {
            $response['status'] = '';
            $response['err'] = 'The file ' . __DIR__ . DIRECTORY_SEPARATOR . $pathToFile . ' is not exists, and no access to the directory.';
            return $response;
        }
    }

    if (!is_writable($pathToFile)) {
        $response['status'] = '';
        $response['err'] = 'The file' . __DIR__ . DIRECTORY_SEPARATOR . $pathToFile . 'is not writable';
        return $response;
    }
    return $response;
}
