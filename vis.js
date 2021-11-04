//Load in the datasets
d3.json("A.json").then(function(A) { //load in each dataset on after the other so they all function in one
	d3.csv("timeA.csv").then(function(time) { //also load in each time file. The time files will be used to access the index values so the times match between datasets


//Set the size and select the svg.
	var width = 500
	var height= 500	
	var svg =  d3.select("#viz1")
		.style("width", width)
		.style("height", height)
	
	var link = [{ "source":  0,  "target":  1} ,  {"source":  0,  "target":  2}]	

	var time = Array.from(time)
	console.log(time[0])

//This section controls the slider on the page. This will allow us to slide trough the dates and ideally this will update the visualization as you slide.
	var slider = document.getElementById("dateslide")
 	var output = document.getElementById("date")
	output.innerHTML = JSON.stringify(time[slider.value])

//currently these functions work to pull the value from the slider.
	slider.oninput = function() {
		var current = this.value
		let datee = JSON.stringify(time[current])
		
	output.innerHTML = datee

	}
	
    var layout = d3.forceSimulation(A)
		.force('center', d3.forceCenter(width / 2 , height / 2))
		.force('collisions', d3.forceCollide(10))
		.force('many', d3.forceManyBody())
		.force('link', d3.forceLink(link).distance(50))
		.on('tick', ticked) 
	 
//   var color =  d3.scaleLinear().domain(nodes).range(red, blue, green, black) //TODO: create a color scale to map on the groups of the graph nodes
    
     var edges = svg.append("g")
                  .selectAll("line")
                  .data(link)
                  .enter()
                  .append("line")
                  .attr("stroke", "black")
                  .attr("stroke-width", 1) 
     
    var node = svg.append("g")
                .selectAll("circle")
                .data(A)
                .enter()
                .append("circle") 
			//	.attr("fill",
		/*		function(d) {
					  var reading = Array.from(d[1], d => d.reading)
					  console.log(d[1])
					  console.log(d[1].indexOf({node_id: 'WAF1A', time: '9/10/2020 14:00', reading: '0'}))  
					  return "black"
					  
				  })  */
			//  .attr("fill", function (d, group) {return color(group)} ) //TODO: set the appropriate color for each node depending on its group
				.attr("r", 7)
		
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