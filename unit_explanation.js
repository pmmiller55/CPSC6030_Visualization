
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

var voltslide = s1.value;
var ampslide = s2.value;
var slider3 = s3.value;

var r = voltslide/ampslide;
var rp = voltslide*ampslide;


var sample = [
    {
      Unit: 'Voltage (V)',
      amount: voltslide,
      color: '#ff0000'
    },
    {
      Unit: 'Current (A)',
      amount: ampslide,
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
   
  d3.select("input[type = range]#voltslide").on("input", function(){
    voltslide = this.value;
    d3.select("output#voltslide").text(voltslide);
    r = voltslide/ampslide
    rp = ampslide*voltslide
    d3.selectAll(".bar")
      .filter(function(d){return d.Unit == 'Resistance (Ohms)'})
      .attr("y", yScale(r))
      .attr("height", dimensions.height - yScale(r)-dimensions.margin.bottom);

    d3.selectAll(".bar")
      .filter(function(d){return d.Unit == 'Real Power (W)'})
      .attr("y", yScale(rp))
      .attr("height", dimensions.height-yScale(rp)-dimensions.margin.bottom);
  
    return (
    d3.selectAll(".bar")
      .filter(function(d){return d.Unit == 'Voltage (V)'})
      .attr("y", yScale(voltslide))
      .attr("height", dimensions.height - yScale(voltslide)-dimensions.margin.bottom));
  })
  d3.select("input[type = range]#ampslide").on("input", function(){
    var ampslide;
    ampslide = this.value;
    //console.log(ampslide)
    d3.select("output#ampslide").text(ampslide);
    if(ampslide == 0){
      r = 0;
    }
    else{
      r = voltslide/ampslide;
    }
    rp = ampslide*voltslide;
    d3.selectAll(".bar")
      .filter(function(d){return d.Unit == 'Resistance (Ohms)'})
      .attr("y", yScale(r))
      .attr("height", dimensions.height - yScale(r)-dimensions.margin.bottom);

    d3.selectAll(".bar")
      .filter(function(d){return d.Unit == 'Real Power (W)'})
      .attr("y", yScale(rp))
      .attr("height", dimensions.height-yScale(rp)-dimensions.margin.bottom);
  
    return (
    d3.selectAll(".bar")
      .filter(function(d){return d.Unit == 'Current (A)'})
      .attr("y", yScale(ampslide))
      .attr("height", dimensions.height-yScale(ampslide)-dimensions.margin.bottom));
  })
  d3.selectAll(".bar")
      .filter(function(d){return d.Unit == 'Resistance (R)'})
      .attr("y", yScale(r))
      .attr("height", dimensions.height - yScale(r)-dimensions.margin.bottom);

  d3.selectAll(".bar")
      .filter(function(d){return d.Unit == 'Real Power (W)'})
      .attr("y", yScale(rp))
      .attr("height", dimensions.height-yScale(rp)-dimensions.margin.bottom);
  
  d3.select("input[type = range]#vaslide").on("input", function(){
    var vaslide;
    vaslide = this.value;
    var eff = vaslide*100/rp
    //console.log(vaslide)
    d3.select("output#vaslide").text(vaslide + " Volt-Amps and the system is " + eff + "% efficient.");
    return (
      d3.selectAll(".bar")
      .filter(function(d){return d.Unit == 'Apparent Power (VA)'})
      .attr("y", yScale(vaslide))
      .attr("height", dimensions.height-yScale(vaslide)-dimensions.margin.bottom));
  })



