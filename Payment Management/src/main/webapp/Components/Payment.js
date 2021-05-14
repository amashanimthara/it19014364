/**
 * 
 */

$(document).ready(function() {
    loadTable();
});

$(document).on("click", "#btnSave", function (event) {
    // Clear alerts---------------------
    $("#alertSuccess").text("");
    $("#alertSuccess").hide();
    $("#alertError").text("");
    $("#alertError").hide();
    // Form validation-------------------
    //var status = validateItemForm();
	var status = true;
    if (status != true) {
        $("#alertError").text(status);
        $("#alertError").show();
        return;
    }
    // If valid------------------------
    var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";
    var url = ($("#hidItemIDSave").val() == "") ? "http://localhost:8080/GadgetBadget/rest/payments" : "http://localhost:8080/GadgetBadget/rest/payments/"+$("#hidItemIDSave").val();
    $.ajax(
        {
            url: url,
            type: type,
            data: $("#formItem").serialize(),            
            dataType: "json",
            complete: function (response, status) {
                onItemSaveComplete(response.responseText, status);
            }
        });
});

function loadTable() {
	$.ajax({
        url: "http://localhost:8080/GadgetBadget/rest/payments",
		dataType: 'json',
        success: function (data) {
			let table = "<table>";
			table += "<tr> <th> Payment ID </th> <th> Payment Type </th> <th> Amount </th> <th> Date </th><th> Update </th> <th> Delete </th></tr>";
            $.each(data,function(i,message){			   
			   let tr = "<tr>";
			   tr += "<td><input id='hidItemIDUpdate' name='hidItemIDUpdate' type='hidden' value='" + message.payment_ID + "'>"+ message.payment_ID +"</td>";
			   tr += "<td>"+ message.payment_type +"</td>";
			   tr += "<td>"+ message.amount +"</td>";
			   tr += "<td>"+ message.date +"</td>";
			   tr += "<td><input name='btnUpdate' type='button' value='Update' class='btnUpdate btn btn-secondary' data-itemid='" + message.payment_ID + "'></td>";
			   tr += "<td><input name='btnRemove' type='button' value='Remove' class='btnRemove btn btn-danger' data-itemid='" + message.payment_ID + "'></td>";
			   tr += "<tr>";
			   table += tr;			   
            });
						
			table += "</table>";
			
			document.getElementById("table").innerHTML = table;
        }
    });
}

function onItemSaveComplete(response, status) {
    if (status == "success") {
		$("#alertSuccess").text("Successfully saved.");
        $("#alertSuccess").show();   
        loadTable();  
    } else if (status == "error") {
        $("#alertError").text("Error while saving.");
        $("#alertError").show();
    } else {
        $("#alertError").text("Unknown error while saving..");
        $("#alertError").show();
    }
    $("#hidItemIDSave").val("");
    $("#formItem")[0].reset();
}

// CLIENT-MODEL================================================================
function validateItemForm() {
    if ($("#payment_type").val().trim() == "") {
        return "Insert project name.";
    }
    if ($("#amount").val().trim() == "") {
        return "Insert project description.";
    }
    if ($("#date").val().trim() == "") {
        return "Insert project duration.";
    }
  
    return true;
}

// UPDATE==========================================
$(document).on("click", ".btnUpdate", function (event) {
    $("#hidItemIDSave").val($(this).data("itemid"));    
    $("#payment_type").val($(this).closest("tr").find('td:eq(1)').text());
    $("#amount").val($(this).closest("tr").find('td:eq(2)').text());
    $("#date").val($(this).closest("tr").find('td:eq(3)').text());
});

$(document).on("click", ".btnRemove", function (event) {

    $.ajax(
        {
            url: "http://localhost:8080/GadgetBadget/rest/payments/"+$(this).data("itemid"),
            type: "DELETE",
            dataType: "text",
            complete: function (response, status) {
                onItemDeleteComplete(response.responseText, status);
            }
        });
});

function onItemDeleteComplete(response, status) {
    if (status == "success") {
    	$("#alertSuccess").text("Successfully deleted.");
        $("#alertSuccess").show();
        loadTable();
        /*var resultSet = JSON.parse(response);
        if (resultSet.status.trim() == "success") {
            $("#alertSuccess").text("Successfully deleted.");
            $("#alertSuccess").show();
            $("#divItemsGrid").html(resultSet.data);
        } else if (resultSet.status.trim() == "error") {
            $("#alertError").text(resultSet.data);
            $("#alertError").show();
        }*/
    } else if (status == "error") {
        $("#alertError").text("Error while deleting.");
        $("#alertError").show();
    } else {
        $("#alertError").text("Unknown error while deleting..");
        $("#alertError").show();
    }
}