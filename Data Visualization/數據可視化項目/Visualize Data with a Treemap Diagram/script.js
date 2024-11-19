const dataUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

const width = 1000;
const height = 600;

const svg = d3
  .select("#treemap")
  .attr("width", width)
  .attr("height", height);

const tooltip = d3
  .select("#tooltip")
  .style("display", "none") // 初始化為隱藏
  .style("position", "absolute")
  .style("background", "white")
  .style("border", "1px solid #ccc")
  .style("padding", "5px")
  .style("pointer-events", "none");

d3.json(dataUrl).then((data) => {
  const root = d3
    .hierarchy(data)
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);

  d3.treemap().size([width, height]).padding(1)(root);

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  // 清空圖表避免重複
  svg.selectAll("*").remove();

  // Tiles
  const tileGroup = svg
    .selectAll("g")
    .data(root.leaves())
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

  tileGroup
    .append("rect")
    .attr("class", "tile")
    .attr("data-name", (d) => d.data.name)
    .attr("data-category", (d) => d.data.category)
    .attr("data-value", (d) => d.data.value)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("fill", (d) => color(d.data.category))
    .on("mouseover", (event, d) => {
      tooltip
        .style("display", "block") // 顯示工具提示
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY - 20}px`)
        .attr("data-value", d.data.value)
        .html(
          `Name: ${d.data.name}<br>Category: ${d.data.category}<br>Value: ${d.data.value}`
        );
    })
    .on("mouseout", () => {
      tooltip.style("display", "none"); // 隱藏工具提示
    });

  // Add text to tiles
  tileGroup
    .append("text")
    .selectAll("tspan")
    .data((d) => d.data.name.split(/(?=[A-Z])/g))
    .enter()
    .append("tspan")
    .attr("x", 5)
    .attr("y", (d, i) => 15 + i * 10)
    .text((d) => d)
    .style("font-size", "10px");

  // Legend
  const categories = root
    .leaves()
    .map((d) => d.data.category)
    .filter((v, i, self) => self.indexOf(v) === i);

  const legend = d3
    .select("#legend")
    .append("svg")
    .attr("width", 500)
    .attr("height", categories.length * 25);

  const legendItemSize = 20;

  const legendGroup = legend
    .selectAll("g")
    .data(categories)
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(0, ${i * 25})`);

  legendGroup
    .append("rect")
    .attr("class", "legend-item")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", legendItemSize)
    .attr("height", legendItemSize)
    .attr("fill", (d) => color(d));

  legendGroup
    .append("text")
    .attr("x", legendItemSize + 5)
    .attr("y", legendItemSize / 1.5)
    .text((d) => d)
    .style("font-size", "12px");
});
