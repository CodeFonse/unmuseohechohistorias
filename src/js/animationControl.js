class animationControl {
  constructor(objs, positions) {
    this.objs = objs;
    this.create_all(objs, positions);
    this.animationPosition = false;
  }
  create_all(objs, positions) {
    this.filters = [];
    let recitales = this.filterGroup(objs, recitaleGruop);
    let sala = this.filterGroup(objs, roomGroup);
    let talleres = this.filterGroup(objs, workshopGroup);
    let conciertos = this.filterGroup(objs, concertGroup);
    let exposiciones = this.filterGroup(objs, expositionGroup);
    let men = this.filterGroup(objs, maleGroup);
    let women = this.filterGroup(objs, femaleGroup);
    let oneToTen = this.filterGroupAge(objs, 1);
    let elevenToTwenty = this.filterGroupAge(objs, 11);
    let twentyOneToThirty = this.filterGroupAge(objs, 21);
    let thirtyOneToForty = this.filterGroupAge(objs, 31);
    let fortyOneToFifty = this.filterGroupAge(objs, 41);
    let fiftyOneToSixty = this.filterGroupAge(objs, 51);
    let sixtyOneToSeventy = this.filterGroupAge(objs, 61);
    let titles = [
      "Asistentes a Recitales",
      "Asistentes al museo",
      "Participantes de Talleres",
      "Asistentes a Conciertos",
      "Asistentes a Exposiciones",
      "Hombres",
      "Mujeres",
      "1-10",
      "11-20",
      "21-30",
      "31-40",
      "41-50",
      "51-60",
      "61-70"
    ];
    Promise.all([
      recitales,
      sala,
      talleres,
      conciertos,
      exposiciones,
      men,
      women,
      oneToTen,
      elevenToTwenty,
      twentyOneToThirty,
      thirtyOneToForty,
      fortyOneToFifty,
      fiftyOneToSixty,
      sixtyOneToSeventy
    ]).then(values => {
      values.forEach((val, index, obj) => {
        let f = this.createFilter(val, index, positions[index], titles[index]);
        this.filters.push(f);
      });
    });
  }

  filterGroupAge(objs, range) {
    return new Promise((resolve, reject) => {
      let g = ageGroup(objs, range);
      if (!g) reject("problem filtering");
      resolve(g);
    });
  }

  filterGroup(objs, gruop, range) {
    return new Promise((resolve, reject) => {
      let g = objs.filter(gruop, range);
      if (!g) reject("problem filtering");
      resolve(g);
    });
  }

  createFilter(objs, i, pos, title) {
    let _filter = new filter(pos.x, pos.y, objs, title);
    return _filter;
  }
  show_form() {
    this.objs.forEach(form => {
      form.show();
    });
    this.filters.forEach((filter, index) => {
      this.showGroupFilterNumber(this.animationPosition, index, filter);
    });
  }
  showGroupFilterNumber(number, index, filter) {
    switch (number) {
      case 1:
        if (index <= 4) {
          filter.calculate_positions();
          filter.info();
        }
        break;
      case 2:
        if (index > 4 && index <= 6) {
          filter.calculate_positions();
          filter.info();
        }
        break;
      case 3:
        if (index > 6) {
          filter.calculate_positions();
          filter.info();
        }
        break;
      default:
        filter.initialPosition();
        break;
    }
  }
  move(animation) {
    this.animationPosition = animation;
  }
  getForms() {
    return this.objs;
  }
}
