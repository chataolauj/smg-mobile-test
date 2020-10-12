$(document).ready(function () {
	let file = null;

	$(".toast").toast("show");

	$("#file-upload").change(() => {
		file = $("#file-upload").prop("files")[0];

		if (file) {
			$(".custom-file-label").html(file.name);
		}
	});

	$("#upload-btn").click(async () => {
		if (file) {
			$("#upload-form").submit();
		} else {
			showAlert("Please select a file first...");
		}
	});
});

function showAlert(msg) {
	$("#alert-container").append(
		'<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
			"<strong>" +
			msg +
			"</strong>" +
			'<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
			'<span aria-hidden="true">&times;</span>' +
			"</button>" +
			"</div>"
	);

	$("#alert").addClass("show");
}
