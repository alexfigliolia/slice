import * as D3 from 'd3';
import Store from 'Store';
import { onShardHover, onShardLeave } from 'Actions/Team';

const { dispatch, getState } = Store;

export default class Pie {

  static height = 0;
  static width = 0;
  static padding = 0;
  static radius = 0;
  static data = [];
  static group = null;
  static colors = [];
  static pie = null;
  static arc = null;
  static arcs = [];

  static init({
    height,
    width,
    colors,
    selector,
    data,
    paddingX,
    paddingY,
  }) {
    if (!!selector) {
      this.svg = D3.select(selector).attr('width', width + paddingX).attr('height', height + paddingY);
      this.height = height;
      this.width = width;
      this.paddingX = paddingX;
      this.paddingY = paddingY;
      this.data = data || [];
      this.radius = Math.min(width, height) / 2;
      this.generateArcs(colors);
    }
  }

  static generateArcs(colors) {
    this.group = this.svg.append('g')
      .attr('class', 'slices')
      .attr('transform', 'translate(' + (this.width + this.paddingX) / 2 + ',' + (this.height + this.paddingY) / 2 + ')');
    this.pie = D3.pie().value(({ capacity }) => capacity);
    this.arc = D3.arc().innerRadius(this.width / 7).outerRadius(this.radius);
    this.colors = D3.scaleOrdinal(colors);
    this.arcs = this.group.selectAll('arc')
      .data(this.pie(this.data))
      .enter()
      .append('g')
      .attr('class', 'arc')
    this.arcs.append('path')
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .attr('fill', (d, i) => this.colors(i))
      .attr('class', (d, i) => this.data[i]?.id)
      .attr('d', this.arc)
      .on('mouseenter mousemove', this.moveCard)
      .on('mouseleave', this.disableCard);
    this.arcs.append('text')
      .attr('transform', d => `translate(${this.arc.centroid(d)})`)
      .attr('font-family', 'sans-serif')
      .attr('font-size', this.width / 25)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .call(text => text.append('tspan')
        .attr('y', '-0.4em')
        .text(d => d.data.name))
  }

  static moveCard(e) {
    if (!getState().Backlog.draggable) {
      const { pageX, pageY, srcElement } = e;
      dispatch(onShardHover(pageX + 40, pageY, srcElement.__data__.data));
    }
  }

  static disableCard() {
    dispatch(onShardLeave());
  }

  static update() {
    this.arcs.selectAll('path')
      .transition()
      .duration(1000)
      .attrTween('d', function (d) {
        this._current = this._current || d;
        const interpolate = D3.interpolate(this._current, d);
        this._current = interpolate(0);
        return t => this.arc(interpolate(t));
      })
  }

  static resize({
    width,
    height,
    paddingX,
    paddingY,
  }) {
    this.height = height;
    this.width = width;
    this.paddingX = paddingX;
    this.paddingY = paddingY;
    if (this.svg) {
      this.svg.attr('width', width + paddingX).attr('height', height + paddingY);
      this.radius = Math.min(width, height) / 2;
      this.group.attr('transform', 'translate(' + (width + paddingX) / 2 + ',' + (height + paddingY) / 2 + ')');
      this.arc = D3.arc().innerRadius(width / 7).outerRadius(this.radius);
      this.svg.selectAll('path').attr('d', this.arc);
      this.arcs.selectAll('text')
        .attr('transform', d => `translate(${this.arc.centroid(d)})`)
        .attr('font-family', 'sans-serif')
        .attr('font-size', this.width / 25)
        .attr('text-anchor', 'middle')
        .attr('fill', '#fff')
        .call(text => text.append('tspan')
          .attr('y', '-0.4em')
        )
    }
  }
}