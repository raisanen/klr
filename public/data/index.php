<?php
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'OPTIONS') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: accept, x-requested-with, content-type');
        exit;
    }

    function success($data) {
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: ' . 'application/json');
        header('Content-Length: ' . strlen($data));
        http_response_code(200);
        echo $data;
    }

    if (strlen($real_word) >= 5 && strlen($real_word) <= 10) {
        $real_word = preg_replace('/[^a-z]/', '', isset($_GET['word']) ? $_GET['word'] : '');
        $filename = "data/${real_word}.json";
        switch ($method) {
            case 'GET':
                if (file_exists($filename)) {
                    $content = file_get_contents($filename);
                    success($content);
                } else {
                    http_response_code(400);
                }
                break;
            case 'POST':
                file_put_contents($filename, $_POST['data']);
                success('');
                break;
            default:
                http_response_code(400);
                break;
        }
        exit;
    } else {
        http_response_code(400);
        // 400
    }
    exit;
?>
