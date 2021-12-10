import Pie from "./Pie";


export default class Graph {
  constructor({ selector, width, height, type, colors, data, paddingX, paddingY }) {
    this.selector = selector;
    this.width = width;
    this.height = height;
    this.type = type;
    this.paddingX = paddingX || 0;
    this.paddingY = paddingY || 0;
    this.colors = colors || ['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c'];
    this.data = data;
    this.init();
  }

  init() {
    switch (this.type) {
      case 'PIE':
      default:
        Pie.init(this);
        break;
    }
  }

  resize({ height, width, paddingX, paddingY }) {
    this.width = width;
    this.height = height;
    this.paddingX = paddingX || 0;
    this.paddingY = paddingY || 0;
    switch (this.type) {
      case 'PIE':
      default:
        Pie.resize(this);
        break;
    }
  }
}