console.log("Hello")
//Load in the datasets
d3.json("A.json").then(function(A) { 
	d3.csv("timeA.csv").then(function(timeA) { 
 		d3.json("kVA.json").then(function(kVA) { 
			d3.csv("timekVA.csv").then(function(timekVA) {
				d3.json("kW.json").then(function(kW) { 
					d3.csv("timekW.csv").then(function(timekW) {
						d3.json("links.json").then(function(links) {
		 


//Set the size and select the svg.
var width = 1000
var height= 1000	
var svg =  d3.select("#viz1")
	.style("width", width)
	.style("height", height)

//set the variables
var link = Array.from(links)	

var timA = Array.from(timeA)
var timkVA = Array.from(timekVA)
var timkW = Array.from(timekW)

//This section controls the slider on the page which shows the date selected.
	var slider = document.getElementById("dateslide")
 	var output = document.getElementById("date")
	output.innerHTML = JSON.stringify(timA[slider.value])

//This function pulls the value from the slider and updates the visualization with the new readings and shows what date you've selected on the website
	slider.oninput = function() {
		var current = this.value
		let datee = JSON.stringify(timA[current])
		updateforces()
		ticked()
		
	output.innerHTML = datee

	}
	
//this function is called when the slider is moved put code in here you want updated when the slider is moved.
function updateforces() {
	layout.force('link').distance(function (d) {
			var read = A[d.target.index].reading[slider.value]
			console.log(read)
			if (read == 'NA' || read ==0) {return 1}
			return read
		})
}
	
//Forces
    var layout = d3.forceSimulation(A)
		.force('center', d3.forceCenter(width / 2 , height / 2))
		.force('collisions', d3.forceCollide(10))
		.force('many', d3.forceManyBody())
		.force('link', d3.forceLink(link).distance(function (d) {
			var read = A[d.target.index].reading[slider.value]
			console.log(read)
			if (read == 'NA' || read ==0) {return 1}
			return read
		}))
		.on('tick', ticked) 

//Set color scale; needs to be change to grab the max and min values instead of these testing values	 
   var color =  d3.scaleLinear().domain([1,50, 100, 200]).range(['red', 'blue', 'green', 'orange']) 
   
//Print the visualization 
     var edges = svg.append("g")
                  .selectAll("line")
                  .data(link)
                  .enter()
                  .append("line")
                  .attr("stroke", function(d) {
					var val = A[d.target.index].reading[slider.value]					//to change what dataset this value is pulling from, change the .data attribute a few lines above
						if (val == 'NA') {return "#ccc"}
				return color(val)})
                  .attr("stroke-width", 1) 
     
    var node = svg.append("g")
                .selectAll("circle")
                .data(A)
                .enter()
                .append("circle") 
			    .attr("fill", function(d) {
					var val = d.reading[slider.value]					//to change what dataset this value is pulling from, change the .data attribute a few lines above
						if (val == 'NA') {return "#ccc"}
				return color(val)})
				.attr("r", function(d) {
					var val = d.reading[slider.value] //to change what dataset this value is pulling from, change the .data attribute a few lines above
					if (val == 0) {return 10}
					if (val == 'NA') {return 3}
				return val/5})
				.style('stroke', function(d) {
					var val = d.reading[slider.value] //to change what dataset this value is pulling from, change the .data attribute a few lines above
				if (val == 0) {return 'black'} })
				.attr('fill-opacity', 0.5)
		
    function ticked(){
      node
	    .attr('cx', d => d.x)
        .attr('cy', d => d.y)
			    .attr("fill", function(d) {
					var val = d.reading[slider.value]					//to change what dataset this value is pulling from, change the .data attribute a few lines above
						if (val == 'NA') {return "#ccc"}
				return color(val)})
				.attr("r", function(d) {
					var val = d.reading[slider.value] //to change what dataset this value is pulling from, change the .data attribute a few lines above
					if (val == 0) {return 3}
					if (val == 'NA') {return 3}
				return val/5})
				.style('stroke', function(d) {
					var val = d.reading[slider.value] //to change what dataset this value is pulling from, change the .data attribute a few lines above
				if (val == 0) {return 'black'} })		
      
      edges
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)
		.attr("stroke", function(d) {
			var val = A[d.target.index].reading[slider.value]					//to change what dataset this value is pulling from, change the .data attribute a few lines above
			if (val == 'NA') {return "#ccc"}
			return color(val)})
		}

				
 						})
					})
				})
			}) 
		}) 
	})
}) 
