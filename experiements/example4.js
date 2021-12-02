console.log("Hello")
//Load in the datasets
d3.json("example_kVA.json").then(function(e_kVA) { 
	d3.json("example_kW.json").then(function(e_kW) { 
		d3.json("example_links.json").then(function(e_links) {
			
			console.log(e_links)

//Set the size and select the svg.
var width = 500
var height= 250
var e_svg4 =  d3.select("#example_viz4")
	.style("width", width)
	.style("height", height)

//set the variables
var link_e = Array.from(e_links)	
	
//Forces
    var layout_example = d3.forceSimulation(e_kW)
		.force('center', d3.forceCenter(width / 2 , height / 2))
		.force('collisions', d3.forceCollide(function(d) {return (+e_kW[d.target.index].reading[1])/50})) //function(d) {return (+e_kW[d.target.index].reading[1])/50}
		.force('many', d3.forceManyBody())
		.force('link_e', d3.forceLink(link_e).distance(function(e_kVA) {return (+e_kVA.reading[1])/50})) //function(e_kVA) {return (+e_kVA.reading[1])/50}
		.on('tick', ticked) 
 
//Print the visualization 
     var edges = e_svg4.append("g")
                  .selectAll("line")
                  .data(link_e)
                  .enter()
                  .append("line")
                  .attr("stroke", "black")
                  .attr("stroke-width", 1) 
     
    var node = e_svg4.append("g")
                .selectAll("circle")
                .data(e_kW)
                .enter()
                .append("circle") 
			    .attr("fill", "black")
				.attr("r", "10")


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
	
	function updated(){
		layout_example4.force('link_e').distance(function(d) {return (+e_kW[d.target.index].reading[1])/50})	
		layout_example4.force('collisions').radius(function(e_kVA) {return (+e_kVA.reading[1])/50})
		ticked()
	}
	
		})
	})
})