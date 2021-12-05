
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



