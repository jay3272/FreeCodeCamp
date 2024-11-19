// Script.js

// 設置畫布大小和邊距
const margin = { top: 50, right: 20, bottom: 100, left: 100 };
const width = 1000 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// 創建 SVG 畫布
const svg = d3.select("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// 定義顏色比例尺
const colors = ["#4575b4", "#74add1", "#fdae61", "#d73027"];

// 獲取數據
d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json').then(data => {
  const baseTemp = data.baseTemperature;
  const monthlyData = data.monthlyVariance;

  // 獲取年份範圍
  const years = [...new Set(monthlyData.map(d => d.year))];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // 定義 x 和 y 比例尺
  const xScale = d3.scaleBand()
    .domain(years)
    .range([0, width])
    .padding(0.1);

  const yScale = d3.scaleBand()
    .domain(d3.range(12)) // 0-11 代表月份
    .range([0, height])
    .padding(0.1);

  const tempExtent = d3.extent(monthlyData, d => baseTemp + d.variance);

  const colorScale = d3.scaleQuantize()
    .domain(tempExtent)
    .range(colors);

  // 添加 x 軸
  const xAxis = d3.axisBottom(xScale)
    .tickValues(years.filter(year => year % 10 === 0))
    .tickFormat(d3.format("d"));

  svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  // 添加 y 軸
  const yAxis = d3.axisLeft(yScale)
    .tickFormat(month => months[month]);

  svg.append("g")
    .attr("id", "y-axis")
    .call(yAxis);

  // 添加熱圖單元格
  svg.selectAll(".cell")
    .data(monthlyData)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("x", d => xScale(d.year))
    .attr("y", d => yScale(d.month - 1))
    .attr("width", xScale.bandwidth())
    .attr("height", yScale.bandwidth())
    .attr("fill", d => colorScale(baseTemp + d.variance))
    .attr("data-month", d => d.month - 1)
    .attr("data-year", d => d.year)
    .attr("data-temp", d => baseTemp + d.variance)
    .on("mouseover", function(event, d) {
      const tooltip = d3.select("#tooltip");
      tooltip.style("visibility", "visible")
        .attr("data-year", d.year)
        .html(
          `Year: ${d.year}<br>Month: ${months[d.month - 1]}<br>Temp: ${(baseTemp + d.variance).toFixed(2)}℃`
        )
        .style("top", `${event.pageY - 50}px`)
        .style("left", `${event.pageX + 10}px`);
    })
    .on("mouseout", () => {
      d3.select("#tooltip").style("visibility", "hidden");
    });

  // 添加圖例
  const legendWidth = 300;
  const legendHeight = 20;
  const legendRectWidth = legendWidth / colors.length;

  const legend = svg.append("g")
    .attr("id", "legend")
    .attr("transform", `translate(${width / 2 - legendWidth / 2}, ${height + 40})`);

  legend.selectAll("rect")
    .data(colors)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * legendRectWidth)
    .attr("y", 0)
    .attr("width", legendRectWidth)
    .attr("height", legendHeight)
    .attr("fill", d => d);

  const legendScale = d3.scaleLinear()
    .domain(tempExtent)
    .range([0, legendWidth]);

  const legendAxis = d3.axisBottom(legendScale)
    .tickValues(colorScale.thresholds())
    .tickFormat(d3.format(".1f"));

  legend.append("g")
    .attr("transform", `translate(0, ${legendHeight})`)
    .call(legendAxis);
});
