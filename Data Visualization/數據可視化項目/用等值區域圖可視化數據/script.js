// script.js

// 定義畫布尺寸和邊距
const width = 960;
const height = 600;
const margin = { top: 50, right: 50, bottom: 100, left: 50 };

// 創建 SVG
const svg = d3.select("svg")
  .attr("width", width)
  .attr("height", height);

// 定義顏色比例尺
const colors = ["#edf8fb", "#b3cde3", "#8c96c6", "#8856a7", "#810f7c"];

// 定義 Tooltip
const tooltip = d3.select("#tooltip");

// 加載數據
const educationDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const countyDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

Promise.all([
  d3.json(countyDataUrl),
  d3.json(educationDataUrl)
]).then(([countyData, educationData]) => {
  const educationMap = new Map(educationData.map(d => [d.fips, d]));

  const path = d3.geoPath();

  // 定義顏色比例尺
  const minEdu = d3.min(educationData, d => d.bachelorsOrHigher);
  const maxEdu = d3.max(educationData, d => d.bachelorsOrHigher);

  const colorScale = d3.scaleQuantize()
    .domain([minEdu, maxEdu])
    .range(colors);

  // 畫地圖
  svg.selectAll("path")
    .data(topojson.feature(countyData, countyData.objects.counties).features)
    .enter()
    .append("path")
    .attr("class", "county")
    .attr("d", path)
    .attr("fill", d => {
      const eduData = educationMap.get(d.id);
      return eduData ? colorScale(eduData.bachelorsOrHigher) : "#ccc";
    })
    .attr("data-fips", d => d.id)
    .attr("data-education", d => {
      const eduData = educationMap.get(d.id);
      return eduData ? eduData.bachelorsOrHigher : 0;
    })
    .on("mouseover", function (event, d) {
      const eduData = educationMap.get(d.id);
      tooltip.style("visibility", "visible")
        .attr("data-education", eduData ? eduData.bachelorsOrHigher : 0)
        .html(`
          <strong>${eduData ? eduData.area_name : "Unknown"}</strong>, ${eduData ? eduData.state : ""}
          <br>Bachelor's Degree: ${eduData ? eduData.bachelorsOrHigher : "N/A"}%
        `)
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY - 30}px`);
    })
    .on("mouseout", () => {
      tooltip.style("visibility", "hidden");
    });

  // 添加圖例
  const legendWidth = 300;
  const legendHeight = 20;
  const legendX = width / 2 - legendWidth / 2;
  const legendY = height - 50;

  const legend = svg.append("g")
    .attr("id", "legend")
    .attr("transform", `translate(${legendX}, ${legendY})`);

  legend.selectAll("rect")
    .data(colors)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * (legendWidth / colors.length))
    .attr("y", 0)
    .attr("width", legendWidth / colors.length)
    .attr("height", legendHeight)
    .attr("fill", d => d);

  // 圖例刻度標籤
  const legendScale = d3.scaleLinear()
    .domain([minEdu, maxEdu])
    .range([0, legendWidth]);

  const legendAxis = d3.axisBottom(legendScale)
    .tickValues(colorScale.thresholds())
    .tickFormat(d3.format(".1f"));

  legend.append("g")
    .attr("transform", `translate(0, ${legendHeight})`)
    .call(legendAxis);
});
