# Where do UBC students come from?

We're working on a story about international students at UBC, and we want to add some data visualizations to provide additional context.

The project will consist of two parts:

a) **Which countries students come from** - we want to create heatmap of the world that shows which countries send the most students to UBC.

Basically a better version of this:

![screen shot 2017-02-08 at 8 26 33 pm](https://cloud.githubusercontent.com/assets/2547035/22769358/f5490ea4-ee3c-11e6-8471-5428f6382ce3.png)

b) **How has international enrolment changed over time?** - in addition to country of citizenship, we also want to see how the percentage of international students has changed over time. 

We should be able to accomplish this with a multi-series line chart, where each line represents a different faculty. Here's an example:

![screen shot 2017-02-08 at 8 29 55 pm](https://cloud.githubusercontent.com/assets/2547035/22769432/63217c04-ee3d-11e6-8688-ed7a294b8f81.png)


### Getting the data

The datasets for each part are in the data folder of this repo.

[Country of Citizenship](/data/country_of_citizenship.csv)

[International student enrolment (2007-2016)](/data/international_student_enrolment.csv)

### How do we build it?

The map and chart can both be built using [D3.js](https://d3js.org/).

[DataMaps](https://datamaps.github.io/) is a handy D3 extension for map visualizations. The second example on the homepage is very close to what we want to build.

![screen shot 2017-02-08 at 8 35 17 pm](https://cloud.githubusercontent.com/assets/2547035/22769527/200f1736-ee3e-11e6-979a-a2003b9a29b6.png)

Here's an example of a multi-series line chart build with D3: https://bl.ocks.org/mbostock/3884955
