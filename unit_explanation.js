
var dimensions = {
    width: 500,
    height: 500,
    margin: {
        top: 50,
        bottom: 100,
        right: 100,
        left: 50
    }
}




var s1 = document.getElementById("voltslide");
var s2 = document.getElementById("ampslide");
var s3 = document.getElementById("vaslide");

var slider1 = s1.value;
var slider2 = s2.value;
var slider3 = s3.value;

var r = slider1/slider2;
var rp = slider1*slider2;


var sample = [
    {
      Unit: 'Voltage (V)',
      amount: slider1,
      color: '#ff0000'
    },
    {
      Unit: 'Current (A)',
      amount: slider2,
      color: '#002aff'
    },
    {
      Unit: 'Resistance (Ohms)',
      amount: r,
      color: '#f700ff'
    },
    {
      Unit: 'Real Power (W)',
      amount: rp,
      color: '#000000'
    },
    {
      Unit: 'Apparent Power (VA)',
      amount: slider3,
      color: '#00ff26'
    }
  ];


var svg = d3.select("#unit")
                 .style("width", dimensions.width)
                 .style("height", dimensions.height)
    var xScale = d3.scaleBand()
                 .domain(sample.map((s) => s.Unit))
                 .range([dimensions.margin.left,dimensions.width - dimensions.margin.right])
    var yScale = d3.scaleLinear()
                 .domain([0, 500])
                 .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])        
    var bars = svg.selectAll(".bar")
                    .data(sample)
                    .enter()
                    .append('g')
                    .append("rect")
                    .attr("class", "bar")
                    .attr("x", function(d) { return xScale(d.Unit); })
                    .attr("y", function(d) { return yScale(d.amount); })
                    .attr("width", xScale.bandwidth())
                    .attr("height", d => dimensions.height - dimensions.margin.bottom - yScale(d.amount))
                    .attr("fill", function(d) { return d.color; })
					.on('mouseover', function(){
						d3.select(this).attr("stroke", "black")
					    var text22 = defsvg
							.append('text')
							.attr("id", 'deftext')
							.attr("x", 10)
							.attr("y", 150)
							.attr("dx", ".35em")
							.attr("dy", "0em")
							.attr("font-family", "sans-serif")	
						var val = d3.select(this).attr('x')
						if (val == 330) {
							text22.text("Volt-Ampere (VA): V * A, represents apparent power.")
							
							var text23 = defsvg
							.append('text')
							.attr("id", 'deftext2')
							.attr("x", 10)
							.attr("y", 150)
							.attr("dx", ".35em")
							.attr("dy", "1em")
							.attr("font-family", "sans-serif")
							.text("In contrast, Watts are real power.")}
							
						if (val == 260) {
							text22.text("Watt (W): The amount of power/electricity consumed.")
							
							var text23 = defsvg
							.append('text')
							.attr("id", 'deftext2')
							.attr("x", 10)
							.attr("y", 150)
							.attr("dx", ".35em")
							.attr("dy", "1em")
							.attr("font-family", "sans-serif")
							.text("A higher watt value will indicate more power being used.")}

						if (val == 50) {
							text22.text("Volts (V): Difference of potential that drives")
							
							var text23 = defsvg
							.append('text')
							.attr("id", 'deftext2')
							.attr("x", 10)
							.attr("y", 150)
							.attr("dx", ".35em")
							.attr("dy", "1em")
							.attr("font-family", "sans-serif")
							.text("the current against the resistance.")	
							var text24 = defsvg
							.append('text')
							.attr("id", 'deftext3')
							.attr("x", 10)
							.attr("y", 150)
							.attr("dx", ".35em")
							.attr("dy", "2em")
							.attr("font-family", "sans-serif")
							.text("If it were water, it would be the water pressure.")}	

						if (val == 190) {
							text22.text("Resistance is a measurement of the")
							
							var text23 = defsvg
							.append('text')
							.attr("id", 'deftext2')
							.attr("x", 10)
							.attr("y", 150)
							.attr("dx", ".35em")
							.attr("dy", "1em")
							.attr("font-family", "sans-serif")
							.text("opposition to current seen in a circuit.")
							var text24 = defsvg
							.append('text')
							.attr("id", 'deftext3')
							.attr("x", 10)
							.attr("y", 150)
							.attr("dx", ".35em")
							.attr("dy", "2em")
							.attr("font-family", "sans-serif")
							.text("If it were water, it would be the narrowing of the pipe.")}	

						if (val == 120) {
							text22.text("Resistance is a measurement of the")
							
							var text23 = defsvg
							.append('text')
							.attr("id", 'deftext2')
							.attr("x", 10)
							.attr("y", 150)
							.attr("dx", ".35em")
							.attr("dy", "1em")
							.attr("font-family", "sans-serif")
							.text("The intensity of an electrical current.")
							var text24 = defsvg
							.append('text')
							.attr("id", 'deftext3')
							.attr("x", 10)
							.attr("y", 150)
							.attr("dx", ".35em")
							.attr("dy", "2em")
							.attr("font-family", "sans-serif")
							.text("If it were water it would be the amount of water flowing.")}								
					})
					.on('mouseout', function(){
						d3.select(this).attr("stroke","none")
						d3.select("#deftext").remove()
						d3.select("#deftext2").remove()
						d3.select("#deftext3").remove()
					})
    var xAxisgen = d3.axisBottom().scale(xScale)
    var yAxisgen = d3.axisLeft().scale(yScale)
    var xAxis = svg.append("g")
                       .call(xAxisgen)
                       .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)
                       .selectAll("text")
                       .style("text-anchor", "end")
                       .attr("dx", "-.8em")
                       .attr("dy", ".15em")
                       .attr("transform", "rotate(-55)");
    var yAxis = svg.append("g")
                       .call(yAxisgen)
                       .style("transform", `translateX(${dimensions.margin.left}px)`)
    bars = svg.selectAll(".bar")
                    .data(sample)
                    .enter()
                    .select('rect')
                    .attr("height", d => dimensions.height - dimensions.margin.bottom - yScale(d.amount))

var defsvg = d3.select("#definitions")

