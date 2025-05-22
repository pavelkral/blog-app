//Counter
if (document.cookie.indexOf("visited") >= 0) {
   // console.log('cookie exist');
}
else {
 //   expiry = new Date();
  //  expiry.setTime(expiry.getTime()+(10*60*1000)); // Ten minutes
  //  document.cookie = "visited=yes; path=/; expires=" + expiry.toGMTString();
   // console.log('new cookie');
}
// euCookie
if (document.cookie.indexOf("eu-cookies") >= 0) {
    console.log('cookie exist');
}
else {
    var str = '<div class = "navbar navbar-default navbar-fixed-bottom"> <div class = "container"> \
        <p class = "navbar-text pull-left"> \
          Tento web používá k poskytování služeb, personalizaci reklam a analýze \
        návštěvnosti soubory cookie. Používáním tohoto webu s tím souhlasíte. \
        <a target="_blank" href="https://www.google.com/policies/technologies/cookies/" >Další informace</a></p> \
        <button onclick="acceptcookie()" class = "navbar-btn btn-danger btn pull-right">V pořádku</button> \
        </div> \
        </div>';

    var str2 = '<div class = "navbar navbar-default navbar-fixed-bottom"> <div class = "container"> \
        <p class = "navbar-text pull-left"> \
        Cookies help us deliver our services. By using our services, you agree to our use of cookies.\
        <a target="_blank" href="https://www.google.com/policies/technologies/cookies/" >Learn more</a></p> \
        <button onclick="acceptcookie()" class = "navbar-btn btn-danger btn pull-right">Close</button> \
        </div> \
        </div>';

    var Display = document.getElementById('eucookie');
    Display.innerHTML = str;
    console.log('new cookie');
}

function acceptcookie(){
    var date = new Date();
    date.setFullYear(date.getFullYear() + 10);
    document.cookie = 'eu-cookies=1; path=/; expires=' + date.toGMTString();
   // $('.eu-cookies').hide();
    document.getElementById('eucookie').innerHTML = '';
}
