exports.displayDataSet = function (data,resp) {
	resp.writeHead(200, { "Content-Type": "application/json" });
	resp.write(JSON.stringify(data));
	resp.end();


};