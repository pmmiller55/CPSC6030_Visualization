d3.select("#select_clem").on("change", function() {
	val = d3.select("#select_clem").property("value")
	if (val == "A_data") { 
		document.getElementById('simulated').src = "clemson_vis.js"
}
		
	if (val == "kW_data") {
		document.getElementById('simulated').src = "clemson_kW.js"

}

	if (val == "kVA_data") {
		document.getElementById('simulated').src = "clemson_kVA.js"
}})