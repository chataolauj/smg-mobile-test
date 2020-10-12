function encode(count) {
	let dictionary = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(
		""
	);

	let short_url = "";

	if (count == 0) {
		return dictionary[0];
	}

	/* count = number of documents in database + 1 (the one we're about to add) */
	while (count > 0) {
		short_url += dictionary[count % 62];
		count = Math.floor((count /= 62)); //stops count from being a positive decimal > 0, which would make the loop more or less infinite
	}

	return short_url;
}

module.exports = { encode };
