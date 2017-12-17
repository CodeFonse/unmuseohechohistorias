class createFilters {
  constructor(objs) {   
    this.filters = []
     let a = this.filter_group(objs, this.recitalesGruop),
     b = this.filter_group(objs, this.salaGroup),
     c = this.filter_group(objs, this.talleresGroup),
     d = this.filter_group(objs, this.conciertosGroup),
     e = this.filter_group(objs, this.exposicionesGroup);
     Promise.all([a,b,c,d,e]).then(values => { 
        values.forEach((val, index, obj) =>{
           let filter= this.createFilter(val,index);
           this.filters.push(filter)
        })
        console.log(this.filters);
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
  createFilter(objs,i) {
    let _filter = new filter(200+(i*200), 100+(i*200), objs, 15);
    return _filter;
  }
  show_filters(){
    this.filters.forEach(filter =>{
      filter.show()
    })
  }
}
