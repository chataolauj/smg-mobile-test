$(document).ready(function () {
	let file = null;
	let msg = "adfadf";

	$(".toast").toast("show");

	$("#file-upload").change(() => {
		file = $("#file-upload").prop("files")[0];

		if (file && file.size / 1024 / 1024 > 10) {
			alert("Your file is too large!");
			file = null;
			$("#img-upload").val("");
		} else {
			$(".custom-file-label").html(file.name);
		}
	});

	$("#upload-btn").click(async () => {
		if (file) {
			$("#upload-form").submit();
		} else {
			alert("Please select a file first...");
		}
	});
});
