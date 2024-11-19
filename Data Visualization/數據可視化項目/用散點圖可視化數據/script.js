// 設置畫布大小和邊距
const width = 800;
const height = 500;
const margin = { top: 50, right: 50, bottom: 50, left: 80 };

// 創建 SVG 畫布
const svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// 獲取數據
d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json').then(data => {
  
  // 解析數據
  data.forEach(d => {
    d.Year = new Date(d.Year, 0); // 將年份轉為 Date 對象
    const parsedTime = d.Time.split(":");
    d.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]); // 將時間轉為 Date 對象
  });

  // 定義縮放比例
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.Year)) // 使用年份的範圍
    .range([0, width]);

  const yScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.Time)) // 使用時間的範圍
    .range([0, height]);

  // 添加 X 軸
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y"));
  svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  // 添加 Y 軸
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));
  svg.append("g")
    .attr("id", "y-axis")
    .call(yAxis);

  // 添加點
  svg.selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", d => xScale(d.Year))
    .attr("cy", d => yScale(d.Time))
    .attr("r", 5)
    .attr("data-xvalue", d => d.Year.toISOString()) // 使用 ISO 格式作為 xvalue
    .attr("data-yvalue", d => d.Time.toISOString()) // 使用 ISO 格式作為 yvalue
    .on("mouseover", function(event, d) {
      const tooltip = d3.select("#tooltip");
      tooltip.style("visibility", "visible")
        .attr("data-year", d.Year.toISOString()) // 設置 tooltip 的 data-year
        .html(`Year: ${d3.timeFormat("%Y")(d.Year)}<br>Time: ${d3.timeFormat("%M:%S")(d.Time)}`);
    })
    .on("mousemove", function(event) {
      d3.select("#tooltip")
        .style("top", `${event.pageY + 10}px`)
        .style("left", `${event.pageX + 10}px`);
    })
    .on("mouseout", function() {
      d3.select("#tooltip").style("visibility", "hidden");
    });

  // 添加標題
  svg.append("text")
    .attr("id", "title")
    .attr("x", width / 2)
    .attr("y", -10)
    .attr("text-anchor", "middle")
    .text("Doping in Professional Cycling");

  // 添加圖例
  const legend = svg.append("g")
    .attr("id", "legend");

  legend.append("rect")
    .attr("x", width - 150)
    .attr("y", 50)
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", "red");

  legend.append("text")
    .attr("x", width - 135)
    .attr("y", 60)
    .text("Doping allegations");

  legend.append("rect")
    .attr("x", width - 150)
    .attr("y", 70)
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", "green");

  legend.append("text")
    .attr("x", width - 135)
    .attr("y", 80)
    .text("No doping allegations");
});

// 添加 tooltip
d3.select("body")
  .append("div")
  .attr("id", "tooltip")
  .style("visibility", "hidden")
  .style("position", "absolute")
  .style("background-color", "white")
  .style("border", "1px solid black")
  .style("padding", "5px")
  .style("border-radius", "5px");
