import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TaskDependencyGraph = ({ tasks = [] }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!tasks || tasks.length === 0) return;

    const nodes = tasks.map(task => ({
      id: task.task_id,
      name: task.task_name
    }));

    const links = [];
    tasks.forEach(task => {
      task.dependencies.forEach(dep => {
        links.push({ source: dep, target: task.task_id });
      });
    });

    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Define arrow marker for directed edges
    svg.append("defs").append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 25)  // Adjust to change the position of the arrow
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#000");

    // Create a force simulation for the graph
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Create links (edges) with arrow markers and red color
    const link = svg.selectAll(".link")
      .data(links)
      .enter().append("line")
      .attr("class", "link")
      .attr("stroke", "red")  // Set line color to red
      .attr("stroke-width", 2)  // Optional: set line thickness
      .attr("marker-end", "url(#arrow)");  // Attach arrow to the link

    // Create nodes (vertices)
    const node = svg.selectAll(".node")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node")
      .call(d3.drag()
        .on("start", dragStart)
        .on("drag", dragging)
        .on("end", dragEnd));

    // Add circles to nodes
    node.append("circle")
      .attr("r", 20);

    // Add text to nodes
    node.append("text")
      .attr("dy", -30)
      .attr("text-anchor", "middle")
      .text(d => d.name);

    // Update simulation on each tick
    simulation.on("tick", function() {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // Functions for dragging the nodes
    function dragStart(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragging(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragEnd(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  }, [tasks]);

  return (
    <div>
      <h1>Task Dependency Graph</h1>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default TaskDependencyGraph;
