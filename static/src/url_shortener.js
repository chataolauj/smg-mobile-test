function encode(count, host) {
	let dictionary = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(
		""
	);

	let short_url = "";

	if (count == 0) short_url += dictionary[0];

	while (count >= 1) {
		short_url += dictionary[count % 62];
		count /= 62;
	}

	console.log(short_url.split("").reverse().join(""));
	console.log(host);

	return short_url.split("").reverse().join("");
}

module.exports = { encode };
