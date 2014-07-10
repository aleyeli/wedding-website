<?php

//Retrieve form data. 
//GET - user submitted data using AJAX
//POST - in case user does not support javascript, we'll use POST instead

$email = ($_GET['email']) ?$_GET['email'] : $_POST['email'];

//flag to indicate which method it uses. If POST set it to 1
if ($_POST) $post=1;

if (!$email) $errors[count($errors)] = 'Please enter your email.'; 

if (!$errors) {

	//recipient
	$to = 'Your Name <yourname@yourdomain.com>';	
	//sender
	$from = $name . ' <' . $email . '>';
	
	//subject and the html message
	$subject = 'User has subscribed to mailing list';	
	$message = '
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head></head>
	<body>
	<table>
		<tr><td>Email: </td><td>' . $email . '</td></tr>
	</table>
	</body>
	</html>';

	//send the mail
	$result = sendmail($to, $subject, $message, $from);
	
	//if POST was used, display the message
	if ($_POST) {
		if ($result) echo 'Thank you! You have been subscribed.';
		else echo 'Sorry, unexpected error. Please try again later';
		
	//else if GET was used, return the boolean value so that 
	//ajax script can react accordingly
	//1 means success, 0 means failed
	} else {
		echo $result;	
	}

//if the errors array has values
} else {
	//display the errors message
	for ($i=0; $i<count($errors); $i++) echo $errors[$i] . '<br/>';
	echo '<a href="form.php">Back</a>';
	exit;
}

//Simple mail function with HTML header
function sendmail($to, $subject, $message, $from) {
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
	$headers .= 'From: ' . $from . "\r\n";
	
	$result = mail($to,$subject,$message,$headers);
	
	if ($result) return 1;
	else return 0;
}

?>