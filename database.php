<?php

$servername = "localhost";
$db_username = "root";
$db_password = "1qa2ws3ed";
$dbname = "my_satodi";

// Create connection
$conn = mysqli_connect($servername, $db_username, $db_password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>