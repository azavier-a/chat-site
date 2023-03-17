<?php
  // connect to database
  $db = new mysqli("127.0.0.1", "azavier", "52906", "chat_site");

  // get data from JavaScript
  $signature = $_POST["signature"];
  $recipient = $_POST["recipient"];
  $message = $_POST["message"];

  // insert or update data in database table
  $query = "INSERT INTO messages (`text`, `send`, `recv`) VALUES ('{$signature}', '{$recipient}', '{$message}')";
  $result = $db->query($query);
  // return any data to JavaScript if needed
  $q = $db->query("SELECT * FROM messages WHERE (send='{$signature}' AND recv='{$recipient}') OR (send='{$recipient}' AND recv='{$signature}')");
  $rows = $q->fetch_all(MYSQLI_ASSOC);
  echo json_encode($rows);
?>