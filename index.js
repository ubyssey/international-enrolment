// Map
var worldMap = new Datamap({
  element: document.getElementById("world-map"),
  projection: 'mercator',
  fills: {
    defaultFill: "#d9d9d9"
  },
  geographyConfig: {
    popupTemplate: function(geography, data) {
      return '<div class="hoverinfo"><strong>' + geography.properties.name + '</strong><br/>Students: ' +  data.students + '</div>';
    }
  }
});

var colorScale = d3.scale.linear().range([0.5, 1]);

d3.json('data/countries.json',
  function(error, data) {

    var countries = {};

    colorScale.domain([0, 185]);

    data.map(function(c) {
      countries[c.Code] = {
        fillColor: 'rgba(150, 0, 0, ' + colorScale(c.Students) + ')',
        students: c.Students
      }
    });

    console.log(countries);

    worldMap.updateChoropleth(countries);

  }
);
// Chart

var facultyColors = {
 "APSC": "#c22339",
 "ARTS": "#4f1c8b",
 "COMM": "#808080",
 "DENT": "#9086ca",
 "FRST": "#2c5509",
 "LFS": "#000000",
 "MEDI": "#122544",
 "SCIE": "#304b9c"
 //{"MUSC": "#e1b952"}  missing
 //{"KINS": "#61a025"} missing 
};

var facultyNames = {
  'APSC': 'Applied Science',
  'ARTS': 'Arts',
  'COMM': 'Commerce',
  'DENT': 'Detistry',
  'FRST': 'Forestry',
  'LFS': 'Land and Food System',
  'MEDI': 'Medicine',
  'SCIE': 'Science',
};

var svg = d3.select("#chart"),
    margin = {top: 20, right: 150, bottom: 30, left: 80},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.time.format("%Y%m%d");

var x = d3.scale.linear().range([0, width]),
    y = d3.scale.linear().range([height, 0]);
    //z = d3.scale.ordinal(d3.schemeCategory10);

var line = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.value); });

d3.json("data/faculties.json", function(error, faculties) {
  if (error) throw error;

  console.log(faculties);

  x.domain([2006, 2015]);

  y.domain([0, 0.4]);

  //z.domain(faculties.map(function(c) { return c.faculty; }));

  // w.domain(faculties.map(function(c){return c.colors;}));

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.svg.axis().scale(x).orient('bottom').tickFormat(function(d) { return d; }));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.svg.axis().scale(y).orient('left').tickFormat(d3.format(",%")))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("text-anchor", "end")
      .attr("dy", "-50px")
      .attr("fill", "#000")
      .text("Percentage international students, %");

  var faculty = g.selectAll(".faculty")
    .data(faculties)
    .enter().append("g")
      .attr("class", function(d) { return "faculty faculty--" + d.faculty; });

  faculty.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return facultyColors[d.faculty]; })
      .style("stroke-width", '3px');

  faculty.append("text")
      .datum(function(d) { return {faculty: d.faculty, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.value) + ")"; })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .text(function(d) { return facultyNames[d.faculty]; });


});

// function type(d, _, columns) {
//   d.date = parseTime(d.date);
//   for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
//   return d;
// }
