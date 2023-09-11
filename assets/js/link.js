const links = {
  whatsapp: "https://wa.me/qr/K4H2EVT5DGHZJ1",
  instagram: "https://instagram.com/yurytechx",
  linkedin: "https://www.linkedin.com/in/YuryTechX/",
  gmail : "mailto:yurytechX@gmail.com",
};

document.getElementById('first').href = links.linkedin;
document.getElementById('first').target = "_blank";
document.getElementById('second').href = links.whatsapp;
document.getElementById('second').target = "_blank";
document.getElementById('third').href = links.instagram;
document.getElementById('third').target = "_blank";
document.getElementById('forth').href = links.gmail;
document.getElementById('forth').target = "_blank";