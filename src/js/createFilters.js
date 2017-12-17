class createFilters {
  constructor(objs) {   
     let a = this.filter_group(objs, this.recitalesGruop),
     b = this.filter_group(objs, this.salaGroup),
     c = this.filter_group(objs, this.talleresGroup),
     d = this.filter_group(objs, this.conciertosGroup),
     e = this.filter_group(objs, this.exposicionesGroup);
     Promise.all([a,b,c,d,e]).then(values => { 
        values.forEach(val =>{
            this.createFilter(val);
        })
      })
  }
  filter_group(objs, gruop){
      return new Promise((resolve, reject) => {
       let g = objs.filter(gruop)
       if(!g)
        reject('problem filtering')                
        resolve(g)
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
  createFilter(objs) {
    let _filter = new filter(100, 100, objs, 15);
    return _filter;
  }
}
