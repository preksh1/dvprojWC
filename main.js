var fill = d3.scaleOrdinal().range(d3.schemeDark2);

var myWords = [{'Event Name':'Womens World Cup', 'Hashtags': '', 'size': 3},
              {'EventName':'Thanks Giving','Hashtags': 'transgender ', 'size': 1},
              {'EventName':'Thanks Giving','Hashtags': 'lgbtrights ', 'size': 1},
              {'EventName':'FIFA World Cup','Hashtags': 'parade', 'size': 1},
              {'EventName':'Womens World Cup','Hashtags': 'queerlove ', 'size': 1},
              {'EventName':'FIFA World Cup','Hashtags': 'trans', 'size': 1},
              {'EventName':'Womens World Cup','Hashtags': 'happy ', 'size': 1},
              {'EventName':'Womens World Cup','Hashtags': 'lgbtyouth ', 'size': 1},
              {'EventName':'Womens World Cup','Hashtags': 'lgbt ', 'size': 21},
              {'EventName':'FIFA World Cup','Hashtags': 'tbtfollowers ', 'size': 1},
              {'EventName':'FIFA World Cup','Hashtags': 'nonbinary ', 'size': 1},
              {'EventName':'FIFA World Cup','Hashtags': 'pridemakeup ', 'size': 1},
              {'EventName':'FIFA World Cup','Hashtags': 'prideandjoy ', 'size': 1},
              {'EventName':'FIFA World Cup','Hashtags': 'prideweek ', 'size': 1},
              {'EventName':'FIFA World Cup','Hashtags': 'music', 'size': 1}]
              

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 1200 - margin.left - margin.right,
    height = 900 - margin.top - margin.bottom;


    var eventName=["FIFA World Cup","Womens World Cup","Thanks Giving"];
// append the svg object to the body of the page
var svg = d3.select("#my_dataviz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
// Wordcloud features that are different from one word to the other must be here


selectedWords=[]
  console.log(myWords);
              myWords.map(function(d){
                if(eventName.includes(d.EventName) ){
                  selectedWords.push(d);
                }
              })
              console.log(selectedWords);
var layout = d3.layout.cloud()
  .size([width, height])
  .words(selectedWords.map(function(d) { return {text: d.Hashtags, size:d.size+10}; }))
  .padding(5)        //space between words
  .rotate(function() { return ~~(Math.random() * 2) * 90; })
  .fontSize(function(d) { return d.size; })      // font size of words
  .on("end", draw);
layout.start();


// This function takes the output of 'layout' above and draw the words
// Wordcloud features that are THE SAME from one word to the other can be here
function draw(words) {
  console.log("in draw");
  svg
    .append("g")
      .attr("transform", "translate(150,150)")
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