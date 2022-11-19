var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 1200 - margin.left - margin.right,
    height = 900 - margin.top - margin.bottom;

var fill = d3.scaleOrdinal().range(d3.schemeDark2);

var eventsdata=[];
var parseDate = d3.timeParse("%Y");

Promise.all([d3.csv("data/wordcloud.csv")])
    .then(function (values) {
    eventsdata = values[0];

     eventsdata.forEach(function(d) {
      d.size = +d.size;
  });

   

var eventName=["FIFA World Cup","Womens World Cup","ICAI"];

var svg = d3.select("#my_dataviz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


selectedWords=[]
arraytobehighlight=[]
eventsdata.map(function(d){
  if(eventName.includes(d.EventName) ){
    selectedWords.push(d);
    arraytobehighlight.push(d.Hashtags);
  }
})



createlayout(eventsdata);
             
function createlayout(eventsdata)
{
  console.log(arraytobehighlight);
var layout = d3.layout.cloud()
  .size([width, height])
  .words(eventsdata.map(function(d) { return {text: d.Hashtags, size:d.size+10}; }))
  .padding(5)        
  .rotate(function() { return ~~(Math.random() * 2) * 90; })
  .fontSize(function(d) { return d.size; })     
  .on("end", draw);
   layout.start();
  console.log("in draw");

}


function draw(words) {
  svg
      .append("g")
      .attr("transform", "translate(" + (width / 2) + "," + (height / 2) +")")
      .selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", function(d) { return d.size+ "px"; })   
      .style("fill", function(d, i) { 
        return arraytobehighlight.indexOf(d.text) >-1 ? "red" :fill(i); 
        })
      .style("font-family", "Impact")
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
}


});
