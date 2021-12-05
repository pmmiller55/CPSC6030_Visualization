//run sim makes it so that you select a measurement and then can delete everything and refresh the simulation when you switch measurments you want to visualize

runsim()

function runsim(){

//Load in the datasets
d3.json("simulated_A.json").then(function(s_A) { 
 	d3.json("simulated_kVA.json").then(function(s_kVA) { 
		d3.json("simulated_kW.json").then(function(s_kW) { 
			d3.csv("simtimeA.csv").then(function(stime) {
				d3.json("simulated_links.json").then(function(s_links) {

//Set the size and select the svg.
var width = 750
var height= 750	
var sim_svg =  d3.select("#simulated")
	.style("width", width)
	.style("height", height)

//set the variables
var slink = Array.from(s_links)	

var time = Array.from(stime)

var sA_data = s_A
var skVA_data = s_kVA
var skW_data = s_kW


var simSelected = readdrop()

function readdrop(){
	var get = document.getElementById("select_sim").value
	if (get == "sA_data") {var simSelected1 = s_A}
	if (get == "skVA_data") {var simSelected1 = s_kVA}
	if (get == "skW_data") {var simSelected1 = s_kW}
	return simSelected1
}

d3.select("#select_sim").on("change", function(){
	resetSim()	
	readdrop()
	console.log(simSelected)

})

function resetSim(){
	node.remove()
	edges.remove()
	delete(s_A)
	delete(s_kVA)
	delete(s_kW)
	runsim()
}

//This section controls the slider on the page which shows the date selected.
	var sim_slider = document.getElementById("sim_dateslide")
 	var sim_output = document.getElementById("sim_date")
	sim_output.innerHTML = JSON.stringify(time[sim_slider.value])

//This function pulls the value from the slider and updates the visualization with the new readings and shows what date you've selected on the website
	sim_slider.oninput = function() {
		var current2 = this.value
		let sim_datee = JSON.stringify(time[current2])
		layout.force("collisions").radius(function(simSelected) {
			var read = simSelected.reading[current2]
			if(read == "NA") {return 1}
			return read/100}) 
		layout.force("link").distance(function(d) {
			var reader = simSelected[d.target.index].reading[current2]
			if (reader == "NA") {return 1}
			console.log(reader)
			return reader/100})
		layout.force('tick')
		

		
	sim_output.innerHTML = sim_datee

	}
	
//Forces
    var layout = d3.forceSimulation(simSelected)
		.force('center', d3.forceCenter(width/2 , height/2))
		.force('collisions', d3.forceCollide(function(simSelected) {
			var read = simSelected.reading[sim_slider.value]
			if(read == "NA") {return 1}
			return read/100}))
		.force('many', d3.forceManyBody())
		.force('link', d3.forceLink(slink).distance(function(d) {
			read = simSelected[d.target.index].reading[sim_slider.value]
			if (read == "NA") {return 1}
			return read/100})) 
		.on('tick', ticked)

//Set color scale; needs to be change to grab the max and min values instead of these testing values	 
 //  var color =  d3.scaleLinear().domain([1,50, 100, 200]).range(['red', 'blue', 'green', 'orange']) 
   
//Print the visualization 
     var edges = sim_svg.append("g")
                  .selectAll("line")
                  .data(slink)
                  .enter()
                  .append("line")
                  .attr("stroke", "black")
                  .attr("stroke-width", 1) 
     
    var node = sim_svg.append("g")
                .selectAll("circle")
                .data(simSelected)
                .enter()
                .append("circle") 
			    .attr("fill", "red")
				.attr("r", 5)
			//	.attr('fill-opacity', 0.5)
				.on('mouseover', function(d, i){
					d3.select(this).attr("stroke", "black")
					    var text = sim_svg
							.append('text')
							.attr("id", 'nodetexta')
							.attr("x", 90)
							.attr("y", 600)
							.attr("dx", ".35em")
							.attr("dy", "0em")
							.attr("font-family", "sans-serif")
							.text("Node: " + i.node )
						var text2 = sim_svg 
							.append('text')
							.attr("id", 'nodetextb')
							.attr("x", 90)
							.attr("y", 600)
							.attr("dx", ".35em")
							.attr("dy", "1.2em")
							.attr("font-family", "sans-serif")
							.text("Reading: " + i.reading[sim_slider.value])
				})
				.on('mouseout', function(d,i){
					d3.select(this).attr("stroke","none")
					d3.select("#nodetexta").remove()
					d3.select("#nodetextb").remove()
				})
		
    function ticked(){
      node
	    .attr('cx', d => d.x)
        .attr('cy', d => d.y)	
      
      edges
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)
	}

				})
			}) 
		}) 
	})
}) 

}