class animationControl {
  constructor(objs, positions) {
    this.objs = objs;
    this.create_all(objs, positions);
    this.playAnimation = false;
    this.animated =false
  }
  create_all(objs, positions) {
    this.filters = [];
    let a = this.filter_group(objs, this.recitalesGruop),
      b = this.filter_group(objs, this.salaGroup),
      c = this.filter_group(objs, this.talleresGroup),
      d = this.filter_group(objs, this.conciertosGroup),
      e = this.filter_group(objs, this.exposicionesGroup);
    Promise.all([a, b, c, d, e]).then(values => {
      values.forEach((val, index, obj) => {
        let filter = this.createFilter(val, index, positions[index]);
        this.filters.push(filter);
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
  createFilter(objs, i, pos) {
    let _filter = new filter(pos.x, pos.y, objs, 15);
    return _filter;
  }
  show_form() {
      this.objs.forEach(form => {
       form.show();
      });

     if(this.animated) this.show_filters()
      
    if(this.playAnimation){
      this.animated = this.cheackPositions()
    }   
  }

  move(startAnimation) {
  this.playAnimation = startAnimation;
    if(!animated){
       this.animated = false
       this.restart()
      }
    this.objs.forEach(form => {
      form.changeTarget(startAnimation);
    });
  }

  cheackPositions() {
    let check = true;
    this.filters.forEach(filter => {
      check = filter.checkPositions();
    });
    return check;
  }
  restart(){
    this.filters.forEach(filter => {
      filter.restart();
    });
  }

  show_filters() {
    this.filters.forEach(filter => {
        filter.show();
    });
  }
  getForms (){
    return this.objs
  }
}
