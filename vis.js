//Load in the datasets
d3.csv("create_data_v2/westA_A.csv").then(function(A) {
	d3.csv("create_data_v2/westA_kVA.csv").then(function(kVA) {
		
		//console.log(A)
	
	var width = 500
	var height= 500	
	var svg =  d3.select("#viz1")
		.style("width", width)
		.style("height", height)	
		
	
	var nodes = Array.from(d3.group(A, d => d.node_id))
	
	//console.log(nodes[1][1][1].reading)
	//console.log(Array.from(nodes[1][1], d => d.reading))

//the link data set will need to be done with the index numbers. Doing it by name won't work.	
	var link = [{ "source":  0,  "target":  1} ,  {"source":  0,  "target":  2}]	
	
	var times = d3.group(A, d => d.time)
	console.log(times)	
//	console.log(times.forEach())


    var layout = d3.forceSimulation(nodes)
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
                  .data(nodes)
                  .enter()
                  .append("circle")
 				  .attr("fill", function(d) {
					  var reading = Array.from(d[1], d => d.reading)
					  console.log(d[1])
					  console.log(d[1].indexOf({node_id: 'WAF1A', time: '9/10/2020 14:00', reading: '0'}))
					  
					  
					  
					  
					  return "black"
					  
				  }) 
              //    .attr("fill", function (d, group) {return color(group)} ) //TODO: set the appropriate color for each node depending on its group
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