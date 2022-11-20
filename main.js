var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 1200 - margin.left - margin.right,
    height = 900 - margin.top - margin.bottom;

var fill = d3.scaleOrdinal().range(d3.schemeDark2);

var eventsdata=[];
var locationwordcloud=[];
var parseDate = d3.timeParse("%Y");

Promise.all([d3.csv("data/wordcloud.csv"),d3.csv("data/locationwordcloud.csv")])
    .then(function (values) {
     eventsdata = values[0];
     locationwordcloud=values[1];
     eventsdata.forEach(function(d) {
     d.size = +d.size;
  });

  var svg = d3.select("#my_dataviz").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
 

  var Hashtags=["icai","convocation", "convocationindore","icai"] // hashtags list from event or map view
  var hashtaglist=eventsdata;
  createlayout(hashtaglist);
  //countOfHashtags(Hashtags);
 

  function countOfHashtags(Hashtags) // to create size for each Hashtag value
  {
      // d3.selectAll("#my_dataviz>*").remove();
      var hashtaglist=[];
      var wc={};
      for (const i of Hashtags){
        wc[i]=  wc[i] ? wc[i]+1:1;
        
      }
      for (const i of Object.keys(wc)){
        hashtagscount={};
        hashtagscount["Hashtags"]= i;
        hashtagscount["size"] =wc[i];
        hashtaglist.push(hashtagscount);

      }
      console.log(hashtaglist);
      createlayout(hashtaglist)


}

             
function createlayout(eventsdata)
{
  console.log(eventsdata);
       
        var layout = d3.layout.cloud()
        .size([width, height])
        .words(eventsdata.map(function(d) { return {text: d.Hashtags, size:d.size+10}; }))
        .padding(5)        
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .fontSize(function(d) { return d.size; })     
        .on("end", draw);
        layout.start();
        console.log("in draw");


        function draw(words) {
          svg
          .append("g")
          .attr("transform", "translate(" + (width / 2) + "," + (height / 2) +")")
          .selectAll("text")
          .data(words)
          .enter().append("text")
          .style("font-size", function(d) { return d.size+ "px"; })   
          .style("fill", function(d, i) { return fill(i); })
          .style("font-family", "Impact")
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d) { return d.text; });
        }

}



//highlightlayout(eventName);   // to be called from Event Calendar View when event hovered/ date clicked, highlight the keywords in word cloud as red

var eventName=["FIFA World Cup","Womens World Cup","ICAI"];
    
 function highlightlayout(eventName){

        selectedWords=[]
        arraytobehighlight=[]
        eventsdata.map(function(d){
          if(eventName.includes(d.EventName) ){
            selectedWords.push(d);
            arraytobehighlight.push(d.Hashtags);
          }
        })
        var layout = d3.layout.cloud()
        .size([width, height])
        .words(eventsdata.map(function(d) { return {text: d.Hashtags, size:d.size+10}; }))
        .padding(5)        
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .fontSize(function(d) { return d.size; })     
        .on("end", drawHighlight);
        layout.start();
        console.log("in draw");


        function drawHighlight(words) {
          svg
          .append("g")
          .attr("transform", "translate(" + (width / 2) + "," + (height / 2) +")")
          .selectAll("text")
          .data(words)
          .enter().append("text")
          .style("font-size", function(d) { return d.size+ "px"; })   
          .style("fill", function(d, i) { 
            return arraytobehighlight.indexOf(d.text) >-1 ? "red" :"black"; 
            })
          .style("font-family", "Impact")
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d) { return d.text; });
    }
    }
});
