$(document).ready(function() {
    changeButton();
  });
  var icon = $('.play');
  var iconBackground = $('.playBackground');
  const changeButton = ()=>{
    
    icon.click(function() {
       icon.toggleClass('active');
       return false;
    });
  }

  const changeButtonBackground = ()=>{    
    iconBackground.toggleClass('activeBackground');
  }