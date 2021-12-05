//Everything is in a function which runs when you start. when you click reset it'll delete everything and rerun run to redo it.
run()
var weight = false
console.log(weight)

function run(){
weight = false
console.log(weight)
//Load in the datasets
d3.json("example_kVA.json").then(function(e_kVA) { 
	d3.json("example_kW.json").then(function(e_kW) { 
		d3.json("example_links.json").then(function(e_links) {
			d3.csv("simtimeA.csv").then(function(stime) {

//Set the size and select the svg.
var width = 600
var height= 400

var e_svg =  d3.select("#example_viz")
	.style("width", width)
	.style("height", height)
var explainsvg = d3.select('#explain')

//set the variables
var link_e = Array.from(e_links)
var extime = Array.from(stime)
var exSelected = readex()
console.log(exSelected)

//Forces - No weights
    var layout_example = d3.forceSimulation(exSelected)
		.force('center', d3.forceCenter(width / 2 , height / 2))
		.force('collisions', d3.forceCollide(10))
		.force('many', d3.forceManyBody())
		.force('link_e', d3.forceLink(link_e).distance(50)) //function(d) {return (+e_kW[d.target.index].reading[1])/50}
		.on('tick', ticked) 
		
//This section controls the slider on the page which shows the date selected.
	var ex_slider = document.getElementById("dateslide_example")
 	var ex_output = document.getElementById("date_example")
	ex_output.innerHTML = JSON.stringify(extime[ex_slider.value])

//This function pulls the value from the slider and updates the visualization with the new readings and shows what date you've selected on the website
	ex_slider.oninput = function() {
		console.log('touch')
		if (weight) {
		var current3 = this.value
		console.log(current3)
		let ex_date = JSON.stringify(extime[current3])
		layout_example.force("collisions").radius(function(exSelected) {
			var read = exSelected.reading[current3]
			if(read == "NA") {return 1}
			console.log(read/100)
			return read/100}) 
		layout_example.force("link_e").distance(function(d) {
			var reader = exSelected[d.target.index].reading[current3]
			if (reader == "NA") {return 1}
			console.log(reader/100)
			return reader/100})
		ticked()

		
	ex_output.innerHTML = ex_date

	}}

function readex(){
	var get1 = document.getElementById("select_clem_example").value
	console.log(get1)
	if (get1 == "kVA_data") {var exread = e_kVA}
	if (get1 == "kW_data") {var exread = e_kW}
	return exread
}

d3.select("#select_clem_example").on("change", function(){
					d3.select("#explaintext").remove()
					d3.select("#explaintext2").remove()
					d3.select("#explaintext3").remove()
					d3.select("#explaintext4").remove()
					d3.select("#explaintext5").remove()
					d3.select("#explaintext6").remove()
					d3.select("#explaintext7").remove()
					d3.select("#explaintext8").remove()
					d3.select("#explaintext9").remove()
	resetex()	
	readex()
	console.log(exSelected)

})
  
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
                .data(exSelected)
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
							.attr("y", 350)
							.attr("dx", ".35em")
							.attr("dy", "0em")
							.attr("font-family", "sans-serif")
							.text("This node represents a bus in the real world power grid.")
              
						var text2 = e_svg 
							.append('text')
							.attr("id", 'nodetextb')
							.attr("x", 0)
							.attr("y", 350)
							.attr("dx", ".35em")
							.attr("dy", "1.2em")
							.attr("font-family", "sans-serif")
							.text("Busses are where readings, like watts, volts, and amperes are recorded.")

						var text3 = e_svg 
							.append('text')
							.attr("id", 'nodetextc')
							.attr("x", 0)
							.attr("y", 350)
							.attr("dx", ".35em")
							.attr("dy", "2.4em")
							.attr("font-family", "sans-serif")
							.text("If you want more details from a node in the simulation, you can check here.")
				})
				.on('mouseout', function(d,i){
					d3.select(this).attr("stroke","none")
					d3.select("#nodetexta").remove()
					d3.select("#nodetextb").remove()
					d3.select("#nodetextc").remove()
					d3.select("#explaintext").remove()
					d3.select("#explaintext2").remove()
					d3.select("#explaintext3").remove()
					d3.select("#explaintext4").remove()
					d3.select("#explaintext5").remove()
					d3.select("#explaintext6").remove()
					d3.select("#explaintext7").remove()
					d3.select("#explaintext8").remove()
					d3.select("#explaintext9").remove()
					var text_explain = explainsvg
							.append('text')
							.attr("id", 'explaintext')
							.attr("x", 25)
							.attr("y", 150)
							.attr("dx", ".35em")
							.attr("dy", "0em")
							.attr("font-family", "sans-serif")
							.text("Step 3: Lastly, moving the slider" )
					var text_explain2 = explainsvg
							.append('text')
										.attr("id", 'explaintext2')
							.attr("x", 25)
							.attr("y", 150)
							.attr("dx", ".35em")
							.attr("dy", "1em")
							.attr("font-family", "sans-serif")
							.text("allows you to veiw measurments" )
					var text_explain3 = explainsvg
							.append('text')
										.attr("id", 'explaintext3')
							.attr("x", 25)
							.attr("y", 150)
							.attr("dx", ".35em")
							.attr("dy", "2em")
							.attr("font-family", "sans-serif")
							.text("from different dates." )
					var text_explain4 = explainsvg
							.append('text')
										.attr("id", 'explaintext4')
							.attr("x", 25)
							.attr("y", 150)
							.attr("dx", ".35em")
							.attr("dy", "4em")
							.attr("font-family", "sans-serif")
							.text("However, the example is small" )	
					var text_explain5 = explainsvg
							.append('text')
										.attr("id", 'explaintext5')
							.attr("x", 25)
							.attr("y", 150)
							.attr("dx", ".35em")
							.attr("dy", "5em")
							.attr("font-family", "sans-serif")
							.text("and the values are similar," )
					var text_explain6 = explainsvg
							.append('text')
										.attr("id", 'explaintext6')
							.attr("x", 25)
							.attr("y", 150)
							.attr("dx", ".35em")
							.attr("dy", "6em")
							.attr("font-family", "sans-serif")
							.text("so it doesn't change much." )
							
					var text_explain7 = explainsvg
							.append('text')
										.attr("id", 'explaintext7')
							.attr("x", 25)
							.attr("y", 150)
							.attr("dx", ".35em")
							.attr("dy", "9em")
							.attr("font-family", "sans-serif")
							.text("Try different measurments" )
					var text_explain8 = explainsvg
							.append('text')
										.attr("id", 'explaintext8')
							.attr("x", 25)
							.attr("y", 150)
							.attr("dx", ".35em")
							.attr("dy", "10em")
							.attr("font-family", "sans-serif")
							.text("with the drop down menu." )
				})
var text4 = e_svg
				.append('text')
				.attr("id", 'dropdowntext')
				.attr("x", 250)
				.attr("y", 50)
				.attr("dx", ".35em")
				.attr("dy", "0em")
				.attr("font-family", "sans-serif")
				.text("No Added Weight" )
var text_explain = explainsvg
			.append('text')
			.attr("id", 'explaintext')			
			.attr("x", 25)
			.attr("y", 150)
			.attr("dx", ".35em")
			.attr("dy", "0em")
			.attr("font-family", "sans-serif")
			.text("Step 1: Notice how all the nodes" )
var text_explain2 = explainsvg
			.append('text')
			.attr("id", 'explaintext2')
			.attr("x", 25)
			.attr("y", 150)
			.attr("dx", ".35em")
			.attr("dy", "1em")
			.attr("font-family", "sans-serif")
			.text("are equally spaced." )
var text_explain3 = explainsvg
			.append('text')
			.attr("id", 'explaintext3')
			.attr("x", 25)
			.attr("y", 150)
			.attr("dx", ".35em")
			.attr("dy", "3.6em")
			.attr("font-family", "sans-serif")
			.text("Click 'Add Link and Node Weights'" )
	


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
		layout_example.force('link_e').distance(function(d) {return (exSelected[d.target.index].reading[1])/50})
		ticked()
	}
d3.select("#do").on("click", function() {

//Update Forces - With weights
	layout_example.force('collisions').radius(function(exSelected) {
			var read = exSelected.reading[ex_slider.value]
			if(read == "NA") {return 1}
			return read/100})
	layout_example.force('link_e').distance(function(d) {return (exSelected[d.target.index].reading[ex_slider.value])/100})
	console.log(ex_slider.value)
	text4.text("Weight Added")
	
	text_explain.text('Step 2: Notice the differences now.')
	text_explain2.text('Larger distance corresponds with')
	text_explain3.text('higher measurement values.')
	text_explain3.attr('dy', "2em")
	
	var text_explain4 = explainsvg
			.append('text')
			.attr("id", 'explaintext4')
			.attr("x", 25)
			.attr("y", 150)
			.attr("dx", ".35em")
			.attr("dy", "4em")
			.attr("font-family", "sans-serif")
			.text("In the watts example" )	
	var text_explain5 = explainsvg
			.append('text')
			.attr("id", 'explaintext5')
			.attr("x", 25)
			.attr("y", 150)
			.attr("dx", ".35em")
			.attr("dy", "5em")
			.attr("font-family", "sans-serif")
			.text("The left cluster shows an area" )
	var text_explain6 = explainsvg
			.append('text')
			.attr("id", 'explaintext6')
			.attr("x", 25)
			.attr("y", 150)
			.attr("dx", ".35em")
			.attr("dy", "6em")
			.attr("font-family", "sans-serif")
			.text("pulling little power." )
	var text_explain7 = explainsvg
			.append('text')
			.attr("id", 'explaintext7')
			.attr("x", 25)
			.attr("y", 150)
			.attr("dx", ".35em")
			.attr("dy", "7em")
			.attr("font-family", "sans-serif")
			.text("The right cluster shows an area" )
	var text_explain8 = explainsvg
			.append('text')
			.attr("id", 'explaintext8')
			.attr("x", 25)
			.attr("y", 150)
			.attr("dx", ".35em")
			.attr("dy", "8em")
			.attr("font-family", "sans-serif")
			.text("pulling more power." )

	var text_explain9 = explainsvg
			.append('text')
			.attr("id", 'explaintext9')
			.attr("x", 25)
			.attr("y", 150)
			.attr("dx", ".35em")
			.attr("dy", "10em")
			.attr("font-family", "sans-serif")
			.text("Hover on a node." )
			
	
	console.log("weighted")
	weight = true
	console.log(weight)
	ticked()
})

//Reset Forces
d3.select("#reset").on("click", function(){
	node.remove()
	edges.remove()
	text4.remove()
	text_explain.remove()
	text_explain2.remove()
	text_explain3.remove()
	text_explain4.remove()
	text_explain5.remove()
	text_explain6.remove()
	text_explain7.remove()
	text_explain8.remove()
	text_explain8.remove()
	delete(e_kVA)
	delete(e_kW)
	delete(e_links)
	run()
	console.log(weight)

})

function resetex() {
	node.remove()
	edges.remove()
	text4.remove()
	delete(e_kVA)
	delete(e_kW)
	delete(e_links)
	run()
}
			})
		})
	})
})
}