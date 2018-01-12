const recitaleGruop = form => {
  return form.getGroup() == "Recitales";
};
const roomGroup = form => {
  return form.getGroup() == "Sala";
};
const workshopGroup = form => {
  return form.getGroup() == "Talleres";
};
const concertGroup = form => {
  return form.getGroup() == "Conciertos";
};
const expositionGroup = form => {
  return form.getGroup() == "Exposiciones";
};
const maleGroup = form => {
  return form.getGender() == "Hombre";
};
const femaleGroup = form => {
  return form.getGender() == "Mujer";
};
const ageGroup = (objs, start) => {
  return objs.filter(form=> {
    return form.getAge()>= start && form.getAge()< start+10;
  });  
};