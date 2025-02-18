<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

// Regenerate session ID for security
session_regenerate_id(true);

error_reporting(E_ALL);
ini_set('display_errors', 1);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dashboard</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Welcome to Your Dashboard</h1>
  <p>You are logged in.</p>
  <a href="logout.php">Logout</a>
</body>
</html>
