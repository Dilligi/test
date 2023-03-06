<?php 

$server_ip = "127.0.0.1";
$server_login = "root";
$server_pass = "";
$db_name = "test_db";

$db = new PDO('mysql:host='.$server_ip.';dbname='.$db_name.'', $server_login, $server_pass);


if ($_SERVER["REQUEST_METHOD"]=="GET") {

    if ($query = $db->query('SELECT * FROM `test`')) {

        $info = $query->FetchAll(PDO::FETCH_ASSOC);
        echo json_encode($info);
        exit;
    
    }

}

else {

    $postData = json_decode(file_get_contents('php://input'), true);
    $request = "INSERT INTO `test` (`id`, `percent`) VALUES";


    foreach ($postData as $key=>$value) {
        $request .= " ('". $key  ."', '". $value ."'),";
    }

    $request[strlen($request) - 1] = ';';
    $query = $db->query($request);

}

?>