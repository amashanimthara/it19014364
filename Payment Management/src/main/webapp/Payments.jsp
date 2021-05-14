<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/Payment.js"></script>
</head>
<body>
<div class="container">
		<div class="row">
			<div class="col">


				<h1>Enter Payment Details</h1>
				<form method='post' action='Payments.jsp' id='formItem' name='formItem'>
					Payment Type: <input id='payment_type' name='payment_type' type='text' class='form-control col-md-3'><br> 
					Amount: <input id='amount' name='amount' type='number' class='form-control col-md-3'><br> 
					Date: <input id='date' name='date' type='date' class='form-control col-md-3'><br> 
					<input id='btnSave' name='btnSave' type='button' value='Save' class='btn btn-primary'> 
					<input type='hidden' id='hidItemIDSave' name='hidItemIDSave' value=''>
				</form>

				<br>

				<div id='alertSuccess' name='alertSuccess' class='alert alert-success'></div>
				<div id='alertError' name='alertError' class='alert alert-danger'></div>

				<br>
				<div id="table" class="table table-striped">
				
				</div>
				
							
			</div>
		</div>
	</div>
</body>
</html>