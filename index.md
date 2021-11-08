<!DOCTYPE html>
<html>

<head>

<script src="https://d3js.org/d3.v7.min.js" type="text/javascript"></script>
<script src="vis.js" type="text/javascript"></script>

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
<p> Current technical drawings are arranged to allow electrical engineers to wire circuits correctly. <br> They are static which has certain utilities, but does not allow for quick assessment of trends or anomalies that may be occuring in circuits over time. 
<br> When an electrical engineer is trying to solve problems they use schematics that look like this: </p>

<img src="Clemson_Local_Grid.JPG" alt="Current State Local Grid"
        width="500" height="400" align: "left">
    
<p> The large grid includes all the information you may want when designing and implementing a power grid, but none of the real world usage data that is collected over time.
<br> If we wanted to identify where the highest voltage or wattage 
<br> is being pulled, you cant identify that information quickly. </p>

<br>Our paper discusses visualization techniques that allow for proper data comparison that highlights trends and anomilies in power grid design for real world application. 
<br> In current real world application, the nodes are arranged geographically, which means the links are static and provide no information. 
<br>Modeling our visualization off the techniques used in the paper, the links are changing length based on current. The higher the current, the longer the link will be. 
<br> To emphasize the relationships between the nodes (and for the purposes of testing the code while writing it), the link length, colors, and node size all represent the current between the nodes. 
<br> Other value options are kW and kVA which are derived from the current and voltage. Utilizing these values together in a node graph allows us to answer more electrical engineering questions. 
</p>

<h2> <strong>Improved Visualization</strong></h2>

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

<br>
<br>
<br>
<br>
<p> <i> Citation: P. C. Wong et al., "A Novel Visualization Technique for Electric Power Grid Analytics," 
    <br>in IEEE Transactions on Visualization and Computer Graphics, vol. 15, no. 3, pp. 410-423, 
    <br> May-June 2009, doi: 10.1109/TVCG.2008.197. </i> </p>
</body>
