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
//
// window.setInterval(function() {
//   basic_choropleth.updateChoropleth({
//     USA: colors(Math.random() * 10),
//     RUS: colors(Math.random() * 100),
//     AUS: { fillKey: 'authorHasTraveledTo' },
//     BRA: colors(Math.random() * 50),
//     CAN: colors(Math.random() * 50),
//     ZAF: colors(Math.random() * 50),
//     IND: colors(Math.random() * 50),
//   });
// }, 2000);
