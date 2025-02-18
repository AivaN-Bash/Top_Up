<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - Your Site</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body class="light-mode">
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h2>Welcome Back</h2>
        <p>Please sign in to continue</p>
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

      <form class="login-form" action="authenticate.php" method="POST">
        <div class="form-group">
          <input type="email" name="email" required>
          <label>Email Address</label>
          <span class="focus-border"></span>
        </div>

        <div class="form-group">
          <input type="password" name="password" required>
          <label>Password</label>
          <span class="focus-border"></span>
        </div>

        <button type="submit" class="login-btn">Sign In</button>

        <div class="social-login">
          <p>Or continue with</p>
          <div class="social-buttons">
            <a href="#" class="social-btn fb">
              <svg><!-- Facebook icon SVG --></svg>
            </a>
            <a href="#" class="social-btn google">
              <svg><!-- Google icon SVG --></svg>
            </a>
          </div>
        </div>
      </form>

      <div class="login-footer">
        <p>Don't have an account? <a href="signup.php">Sign Up</a></p>
      </div>
    </div>
  </div>
</body>
</html>
