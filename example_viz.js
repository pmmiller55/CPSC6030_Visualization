//Everything is in a function which runs when you start. when you click reset it'll delete everything and rerun run to redo it.
run()

function run(){
//Load in the datasets
d3.json("example_kVA.json").then(function(e_kVA) { 
	d3.json("example_kW.json").then(function(e_kW) { 
		d3.json("example_links.json").then(function(e_links) {

//Set the size and select the svg.
var width = 600
var height= 400

var e_svg =  d3.select("#example_viz")
	.style("width", width)
	.style("height", height)

//set the variables
var link_e = Array.from(e_links)

//Forces - No weights
    var layout_example = d3.forceSimulation(e_kW)
		.force('center', d3.forceCenter(width / 2 , height / 2))
		.force('collisions', d3.forceCollide(10))
		.force('many', d3.forceManyBody())
		.force('link_e', d3.forceLink(link_e).distance(50)) //function(d) {return (+e_kW[d.target.index].reading[1])/50}
		.on('tick', ticked) 
  
//Print the visualization 
     var edges = e_svg.append("g")
                  .selectAll("line")
                  .data(link_e)
                  .enter()
                  .append("line")
                  .attr("stroke", "black")
                  .attr("stroke-width", 1) 
     
    var node = e_svg.append("g")
                .selectAll("circle")
                .data(e_kW)
                .enter()
                .append("circle") 
			    .attr("fill", "red")
				.attr("r", "5")
				.on('mouseover', function(d, i){
					d3.select(this).attr("stroke", "black")
					    var text = e_svg
							.append('text')
							.attr("id", 'nodetexta')
							.attr("x", 0)
							.attr("y", 200)
							.attr("dx", ".35em")
							.attr("dy", "0em")
							.attr("font-family", "sans-serif")
							.text("This node represents a bus in the real world power grid.")
              
						var text2 = e_svg 
							.append('text')
							.attr("id", 'nodetextb')
							.attr("x", 0)
							.attr("y", 200)
							.attr("dx", ".35em")
							.attr("dy", "1.2em")
							.attr("font-family", "sans-serif")
							.text("Busses are where readings, like watts, volts, and amperes are recorded.")

						var text3 = e_svg 
							.append('text')
							.attr("id", 'nodetextc')
							.attr("x", 0)
							.attr("y", 200)
							.attr("dx", ".35em")
							.attr("dy", "2.4em")
							.attr("font-family", "sans-serif")
							.text("If you want more details from a node, you can check here.")
				})
				.on('mouseout', function(d,i){
					d3.select(this).attr("stroke","none")
					d3.select("#nodetexta").remove()
					d3.select("#nodetextb").remove()
					d3.select("#nodetextc").remove()
				})
	var text = e_svg
				.append('text')
				.attr("id", 'dropdowntext')
				.attr("x", 50)
				.attr("y", 25)
				.attr("dx", ".35em")
				.attr("dy", "0em")
				.attr("font-family", "sans-serif")
				.text("No Added Weight" )
/*	var text2 = svg 
				.append('text')
				.attr("id", 'nodetext2')
				.attr("x", 50)
				.attr("y", 950)
				.attr("dx", ".35em")
				.attr("dy", "1.2em")
				.attr("font-family", "sans-serif")
				.text("Reading: " + i.reading[slider.value])
				*/

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
		layout_example.force('link_e').distance(function(d) {return (+e_kW[d.target.index].reading[1])/50})
		ticked()
	}
d3.select("#do").on("click", function() {

//Update Forces - With weights
	layout_example.force('collisions').radius(function(e_kW) {
			var read = +e_kW.reading[1]
			if(read == "NA") {return 1}
			return read/50})
	layout_example.force('link_e').distance(function(d) {return (+e_kW[d.target.index].reading[1])/50})
	console.log("weighted")
	ticked()
})

//Reset Forces
d3.select("#reset").on("click", function(){
	node.remove()
	edges.remove()
	delete(e_kVA)
	delete(e_kW)
	delete(e_links)
	run()

})
		})
	})
})
}