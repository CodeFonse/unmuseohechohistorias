class animationControl {
  constructor(objs, positions) {
    this.objs = objs;
    this.create_all(objs, positions);
    this.animated = false;
  }
  create_all(objs, positions) {
    this.filters = [];
    this.a = this.filter_group(objs, this.recitalesGruop);
    this.b = this.filter_group(objs, this.salaGroup);
    this.c = this.filter_group(objs, this.talleresGroup);
    this.d = this.filter_group(objs, this.conciertosGroup);
    this.e = this.filter_group(objs, this.exposicionesGroup);
    let titles = [
      "Recitales",
      "Sala",
      "Talleres",
      "Conciertos",
      "Exposiciones"
    ];
    Promise.all([this.a, this.b, this.c, this.d, this.e]).then(values => {
      values.forEach((val, index, obj) => {
        let f = this.createFilter(val, index, positions[index], titles[index]);
        this.filters.push(f);
      });
    });
  }
  filter_group(objs, gruop) {
    return new Promise((resolve, reject) => {
      let g = objs.filter(gruop);
      if (!g) reject("problem filtering");
      resolve(g);
    });
  }
  recitalesGruop(form) {
    return form.getGroup() == "Recitales";
  }
  salaGroup(form) {
    return form.getGroup() == "Sala";
  }
  talleresGroup(form) {
    return form.getGroup() == "Talleres";
  }
  conciertosGroup(form) {
    return form.getGroup() == "Conciertos";
  }
  exposicionesGroup(form) {
    return form.getGroup() == "Exposiciones";
  }
  createFilter(objs, i, pos, title) {
    let _filter = new filter(pos.x, pos.y, objs, title);
    return _filter;
  }
  show_form() {
    this.objs.forEach(form => {
      form.show();
    });

    this.filters.forEach(filter => {
      if (this.animated) {
        filter.calculate_positions();
        filter.info();
      } else filter.initialPosition();
    });    
  }
  move(startAnimation) {
    this.animated = startAnimation;
  }
  getForms() {
    return this.objs;
  }
}
