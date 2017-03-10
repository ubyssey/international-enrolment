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

var colors = ['#ffffe5','#fff7bc','#fee391','#fec44f','#fe9929','#ec7014','#cc4c02','#993404','#662506'];

var colorScale = d3.scale.linear().range(colors);

d3.json('data/countries.json',
  function(error, data) {

    var countries = {};

    colorScale.domain(
      data.map(function(c) { return c.Students; })
    );

    data.map(function(c) {
      countries[c.Code] = {
        fillColor: colorScale(c.Students),
        students: c.Students
      }
    });

    worldMap.updateChoropleth(countries);

  }
);

// Chart

var facultyColors = {
 'enginnering': '#4f1c8b',
 'music': '#e1b952',
 'med': '#122544',
 'sauder': '#808080',
 'dentistry': '#9086ca',
 'science': '#304b9c',
 'arts': '#4f1c8b',
 'kin': '#61a025',
 'forestry': '#2c5509'
 'LFS': '#000000'
};

var svg = d3.select("#chart"),
    margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.time.format("%Y%m%d");

var x = d3.scale.linear().range([0, width]),
    y = d3.scale.linear().range([height, 0]),
    z = d3.scale.ordinal(d3.schemeCategory10);

var line = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.value); });

d3.json("data/faculties.json", function(error, faculties) {
  if (error) throw error;

  console.log(faculties);

  x.domain([2006, 2015]);

  y.domain([0, 0.4]);

  z.domain(faculties.map(function(c) { return c.faculty; }));

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.svg.axis().scale(x).orient('bottom').tickFormat(function(d) { return d; }));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.svg.axis().scale(y).orient('left'))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Percentage international students, %");

  var faculty = g.selectAll(".faculty")
    .data(faculties)
    .enter().append("g")
      .attr("class", function(d) { return "faculty faculty--" + d.faculty; });

  faculty.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return z(d.faculty); });

  faculty.append("text")
      .datum(function(d) { return {id: d.faculty, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.value) + ")"; })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .text(function(d) { return d.faculty; });
});

// function type(d, _, columns) {
//   d.date = parseTime(d.date);
//   for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
//   return d;
// }
