let img_upload = document.getElementById("img-upload");
let file = null;
let upload_btn = document.getElementById("upload-btn");
let upload_form = document.getElementById("upload-form");

img_upload.addEventListener("change", () => {
	file = img_upload.files[0];

	if (file.size / 1024 / 1024 > 10) {
		alert("Your file is too large!");
		file = null;
		img_upload.value = "";
	}
});

upload_btn.addEventListener("click", async () => {
	if (file) {
		upload_form.submit();
	} else {
		alert("Please select a file first...");
	}
});
