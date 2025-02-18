<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Process signup form submission
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    // Validate input
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['error'] = "Invalid email address.";
        header("Location: signup.php");
        exit();
    }
    if (strlen($password) < 6) {
        $_SESSION['error'] = "Password must be at least 6 characters.";
        header("Location: signup.php");
        exit();
    }

    // Database connection
    $conn = new mysqli("localhost", "root", "", "login_demo");
    if ($conn->connect_error) {
        $_SESSION['error'] = "Database connection failed: " . $conn->connect_error;
        header("Location: signup.php");
        exit();
    }

    // Check if email already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    if (!$stmt) {
        $_SESSION['error'] = "Database error: " . $conn->error;
        header("Location: signup.php");
        exit();
    }
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        $_SESSION['error'] = "Email is already registered.";
        $stmt->close();
        $conn->close();
        header("Location: signup.php");
        exit();
    }
    $stmt->close();

    // Insert new user with hashed password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    if (!$stmt) {
        $_SESSION['error'] = "Database error: " . $conn->error;
        header("Location: signup.php");
        exit();
    }
    $stmt->bind_param("ss", $email, $hashedPassword);
    if ($stmt->execute()) {
        $_SESSION['user_id'] = $stmt->insert_id;
        session_regenerate_id(true);
        $stmt->close();
        $conn->close();
        header("Location: dashboard.php");
        exit();
    } else {
        $_SESSION['error'] = "Signup failed. Please try again.";
        $stmt->close();
        $conn->close();
        header("Location: signup.php");
        exit();
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Signup - Your Site</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h2>Create an Account</h2>
      </div>
      
      <!-- Error Message Display -->
      <div id="error-message" style="color: red; text-align: center;">
        <?php
          if (isset($_SESSION['error'])) {
              echo $_SESSION['error'];
              unset($_SESSION['error']);
          }
        ?>
      </div>
      
      <form action="signup.php" method="POST">
        <div class="form-group">
          <input type="email" name="email" required>
          <label>Email Address</label>
        </div>
        <div class="form-group">
          <input type="password" name="password" required>
          <label>Password</label>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      
      <div class="login-footer">
        <p>Already have an account? <a href="login.php">Login</a></p>
      </div>
    </div>
  </div>
</body>
</html>
