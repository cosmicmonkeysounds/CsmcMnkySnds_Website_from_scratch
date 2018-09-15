// Change style of navbar on scroll -------//
// ----------------------------------------//
// ----------------------------------------//

window.onscroll = function() {
    myFunction();
  };
  function myFunction() {
    var navbar = document.getElementById("myNavbar");
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-white";
    } else {
      navbar.className = navbar.className.replace(
        " w3-card w3-animate-top w3-white",
        ""
      );
    }
  }
  
  // Menu toggle on small screens -----------//
  // ----------------------------------------//
  // ----------------------------------------//
  
  function toggleFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  }
  
  // Accordian show function ----------------//
  // ----------------------------------------//
  // ----------------------------------------//
  
  function accShow(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  }
  