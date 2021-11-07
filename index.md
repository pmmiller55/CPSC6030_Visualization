<!DOCTYPE html>
<html>

<head>

<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="vis.js"></script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">

</head>

<style>
body,h1,h2,h3,h4,h5,button {font-family: "Raleway", sans-serif} 
h1 {text-align: center;
    font-family: "Arial", sans-serif;
    color: black}
h1.solid {border-style: "solid";}
h2 {font-weight: 200 ;
    color:red;}

</style>



<body style="background-color: beige;">


<h1 class= "solid">How Can Editing the Visualization Allow Us to Better Answer Questions Using Powergrid Analytics? </h1>

<h2> <strong> Research Article </strong></h2>
<p2> <strong> "A Novel Visualization Technique for Electric Power Grid Analytics" </strong> </p2>

<h2> <strong> Current State </strong> </h2>
<p style="font-family: Arial"> Current technical drawings show great detail for allowing engineers to wire 
<br> circuits correctly but the visualization techniques recommended in this paper will 
<br> allow for proper data comparisons and highlight trends or anomilies in power grid design or real world application. 
<br>
<br> The current use of powergrid analytics is difficult to read because it is all uniform size.
<br> This is fair when looking at small, non-complex grids.
</p>

<img align: "left">


<p style="font-family: Arial"> However, looking at a large grid id difficult to read
<br> If we wanted to identify where the highest voltage or wattage 
<br> is being pulled, you cant identify that information quickly. </i> </p>

<svg width ="400" height="400"></svg>

<h2> <strong>Improved Visualization</strong></h2>
<p> <i> Click to "Make It Better" </i> </p>

<button id="boring" onclick="swap();"> Make It Better </button>

<p>
    <br>
    <br>
    <br>
</p>

<div class = "dateSlide">
<p>Date Slider:</p>
<input id="dateslide" type="range" min="0" max="2726" value="100">
<p> Date: <span id="date"></span></p>
</div>

<svg id ='viz1' width="1000" height = "1000"></svg>
</body>
