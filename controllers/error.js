exports.displayError = function (err,resp) {
	resp.writeHead(500, "Internal Error ocurred", { "Content-Type" : "text/html" });
	resp.write("<html><head><title>500</title></head><body>500: Internal Error.Details: " + err + "</body></html>");
	resp.end();
}