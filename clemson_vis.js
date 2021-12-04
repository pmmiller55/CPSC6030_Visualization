
//Load in the datasets
d3.json("clemson_A.json").then(function(A) { 
	d3.csv("timeA.csv").then(function(timeA) { 
 		d3.json("clemson_kVA.json").then(function(kVA) { 
			d3.csv("timekVA.csv").then(function(timekVA) {
				d3.json("clemson_kW.json").then(function(kW) { 
					d3.csv("timekW.csv").then(function(timekW) {
						d3.json("clemson_links.json").then(function(links) {
		 


//Set the size and select the svg.
var width = 500
var height= 500
var svg =  d3.select("#clemson_viz")
	.style("width", width)
	.style("height", height)

//set the variables
var link = Array.from(links)

var timA = Array.from(timeA)
var timkVA = Array.from(timekVA)
var timkW = Array.from(timekW)

var A_data = A
var kW_data = kW
var kVA_data = kVA

var cSelected = kW_data


//This section controls the slider on the page which shows the date selected.
	var slider = document.getElementById("dateslide")
 	var output = document.getElementById("date")
	output.innerHTML = JSON.stringify(timA[slider.value])

//This function pulls the value from the slider and updates the visualization with the new readings and shows what date you've selected on the website
	slider.oninput = function() {
		var current = this.value
		console.log(current)
		let datee = JSON.stringify(timA[current])
		console.log(datee)
		layout.force("collisions").radius(function(cSelected) {
			var read = cSelected.reading[current]
			if(read == "NA") {return 1}
			return read/100}) 
		layout.force("link").distance(function(d) {
			var reader = cSelected[d.target.index].reading[current]
			if (reader == "NA") {return 1}
			return reader/100})  
		ticked()
		
	output.innerHTML = JSON.stringify(timA[slider.value])

	}
	
	
//Forces
    var layout = d3.forceSimulation(cSelected)
		.force('center', d3.forceCenter(width / 2 , height / 2))
		.force('collisions', d3.forceCollide(function(cSelected) {
			var read = cSelected.reading[slider.value]
			if(read == "NA") {return 1}
			return read/100}))
		.force('many', d3.forceManyBody())
		.force('link', d3.forceLink(link).distance(function(d) {
			read = cSelected[d.target.index].reading[slider.value]
			if (read == "NA") {return 1}
			return read/100})) 
		.on('tick', ticked)

//Set color scale; needs to be change to grab the max and min values instead of these testing values	 
 //  var color =  d3.scaleLinear().domain([1,50, 100, 200]).range(['red', 'blue', 'green', 'orange']) 
   
//Print the visualization 
     var edges = svg.append("g")
                  .selectAll("line")
                  .data(link)
                  .enter()
                  .append("line")
                  .attr("stroke", "black")
                  .attr("stroke-width", 1) 
     
    var node = svg.append("g")
                .selectAll("circle")
                .data(cSelected)
                .enter()
                .append("circle") 
			    .attr("fill", "red")
				.attr("r", 5)
			//	.attr('fill-opacity', 0.5)
				.on('mouseover', function(d, i){
					d3.select(this).attr("stroke", "black")
					    var text = svg
							.append('text')
							.attr("id", 'nodetext')
							.attr("x", 50)
							.attr("y", 950)
							.attr("dx", ".35em")
							.attr("dy", "0em")
							.attr("font-family", "sans-serif")
							.text("Node: " + i.node )
						var text2 = svg 
							.append('text')
							.attr("id", 'nodetext2')
							.attr("x", 50)
							.attr("y", 950)
							.attr("dx", ".35em")
							.attr("dy", "1.2em")
							.attr("font-family", "sans-serif")
							.text("Reading: " + i.reading[slider.value])
				})
				.on('mouseout', function(d,i){
					d3.select(this).attr("stroke","none")
					d3.select("#nodetext").remove()
					d3.select("#nodetext2").remove()
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
	})
}) 
