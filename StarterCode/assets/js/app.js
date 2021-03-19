// @TODO: YOUR CODE HERE!

//svgWidth and svgHeight
let svgWidth = 860;
let svgHeight = 400;
//Set up margins
var margin = {
  top: 25,
  right: 40,
  bottom: 70,
  left: 150
};
//Define width and height 
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//svg wrapper
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Importing csv
d3.csv("assets/data/data.csv").then(function(timesdata){

	timesdata.forEach(function(data){
		data.healthcare = +data.healthcare;
		data.poverty = +data.poverty;
	});
 //Scales
	var xDataScale = d3.scaleLinear()
		.domain([d3.min(timesdata, d=> d.poverty)*.95,d3.max(timesdata,d=> d.poverty)*1])
		.range([0,width]);
	
	var yDataScale = d3.scaleLinear()
		.domain([d3.min(timesdata, d=> d.healthcare)*.95, d3.max(timesdata, d=> d.healthcare)*1])
		.range([height,0]);

	//Create axis
	var bottomAxis = d3.axisBottom(xDataScale);
	var leftAxis = d3.axisLeft(yDataScale);

 //Add x-axis
	chartGroup.append('g')
		.attr('transform', `translate(0,${height})`)
		.call(bottomAxis);

 //Add y-axis
	chartGroup.append('g').call(leftAxis);

 //Data Circles
	var circlesGroup = chartGroup.selectAll('circle')
		.data(timesdata)
		.enter()
		.append('circle')
		.attr('cx', d => xDataScale(d.poverty))
		.attr('cy', d => yDataScale(d.healthcare))
		.attr('r','13')
		.attr('fill','purple')
		.attr('opacity','.6');

 //Labels for markers
	var label = chartGroup.append('g').selectAll('text')
		.data(timesdata)
		.enter()
		.append('text')
		.attr('x', d => xDataScale(d.poverty))
		.attr('y', d => yDataScale(d.healthcare))
		.attr('font-family','lucida-sans')
		.attr('text-anchor','middle')
		.attr('font-size', '8px')
		.attr('fill','white')
		.classed('stateTest',true)
		.text(d => d.abbr);

 //Create axis
	chartGroup.append("text")
		.attr("transform", "rotate(-90)")	
		.attr('x', 0 - (height/2))
		.attr('y', 0 - margin.left + 90)
		.attr('dy','1em')
		.attr('class', 'axisText')
      	.text('Lacks of Healthcare %');
	
	chartGroup.append("text")
		.attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
		.attr("class", "axisText")
		.text('In Poverty %');
	  }).catch(function(error) {
		console.log(error);

});