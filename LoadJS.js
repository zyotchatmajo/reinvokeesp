// Used for loading content to the user

 $('.tab li:nth-child(1)').addClass('current');
    $('.tab li:nth-child(2)').addClass('unselected');
    $('.tab li').click(function() {
        if($(this).hasClass('current')){
            return;
        }
        
        if ($(this).parent().next().children('.tab_details').is(':animated')) {
            return;
        }
        
        var num = $(this).parent().children('li').index(this);
        $(this).parent('.tab').each(function(){
            $('>li',this).removeClass('current').addClass('unselected').eq(num).addClass('current').removeClass('unselected');
        });
        $(this).parent().next().children('.tab_details').stop(true, true).fadeOut(300,'linear').eq(num).delay(300).fadeIn(500,'linear');
    });

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

var db = firebase.firestore();
if(isMobileDevice()){
    document.getElementById("modal1").style.overflowY = "initial !important";
    document.getElementById("CharaIcons").style.height = "380px";
    document.getElementById("CharaIcons").style.overflowY = "auto";
    console.log("yes");
}else{
    document.getElementById("modal1").style.overflowY = "initial !important";
    document.getElementById("modal2").style.width = "110%";
    document.getElementById("CharaIcons").style.height = "450px";
    document.getElementById("CharaIcons").style.overflowY = "auto";
}
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the  document:*/
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}


var countries = ["Kaneki Ken", "Touka Kirishima", "Nishiki Nishio", "Tsukiyama Shu", "Hinami Fueguchi",
    "Ryoko Fueguchi", "Banjou Kazuichi", "Yomo Renji", "Uta", "Koma Enji", "Irimi Kaya",
    "Ayato Kirishima", "Yamori", "Naki", "Kurona Yasuhisa", "Nashiro Yasuhisa", "Rize Kamishiro",
    "Amon Kohtaro", "Akira Mado", "Kureo Mado", "Suzuya Juzo", "Shinohara Yukinori", "Kuroiwa Iwao", "Haise Sasaki", "Buho de un Ojo",
    "Houji Kohsuke", "Kohri Ui", "Hachikawa Chu", "Ayumu Hogi", "Hirako Take", "Kuramoto Ito", "Takizawa Seido", "Misato Gori", "Tatara", "Noro",
    "Sachi", "Arima Kisho", "Shirazu Ginshi", "Saiko Yonebayashi", "Mutsuki Toru", "Urie Kuki", "Hairu Ihei", "Kanae von Rosewald","Fura Taishi" , "Minami Uruka","Lantern",
    "Furuta Nimura"
];

autocomplete(document.getElementById("myInput"), countries);

async function setImage(id){
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var tangRef = storageRef.child('CharaIcons/' + id + '.png');
    let down = await tangRef.getDownloadURL().then(function(url) {
            document.querySelector('img[alt$="' + id + '"]').src =  url;
            console.log(url);
        })
}

function search() {
    document.getElementById('CharaIcons').innerHTML = "";
    var personajesDB = db.collection("PersonajesNew");
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var allhtml = "";
    var i = 0;
    var search = personajesDB.where("Nombre", "==", "" + document.getElementById('myInput').value).where("Tipo", "==", "" + document.getElementById('SearchTipo').value).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if(doc.data().Tipo == "Rojo"){allhtml += '<span data-dismiss="modal" onclick = "getInfo(' + doc.id + ')"> <img src="https://reinvokeesp.weebly.com/files/theme/typeSTR.png" style="position: absolute; z-index: 3;">';}
                else if(doc.data().Tipo == "Azul"){allhtml += '<span data-dismiss="modal" onclick = "getInfo(' + doc.id + ')"> <img src="https://reinvokeesp.weebly.com/files/theme/typeINT.png" style="position: absolute; z-index: 3;">';}
                else if(doc.data().Tipo == "Verde"){allhtml += '<span data-dismiss="modal" onclick = "getInfo(' + doc.id + ')"> <img src="https://reinvokeesp.weebly.com/files/theme/typeSPD.png" style="position: absolute; z-index: 3;">';}
                else if(doc.data().Tipo == "Luz"){allhtml += '<span data-dismiss="modal" onclick = "getInfo(' + doc.id + ')"> <img src="https://reinvokeesp.weebly.com/files/theme/typeLIT.png" style="position: absolute; z-index: 3;">';}
                else if(doc.data().Tipo == "Oscuridad"){allhtml += '<span data-dismiss="modal" onclick = "getInfo(' + doc.id + ')"> <img src="https://reinvokeesp.weebly.com/files/theme/typeDRK.png" style="position: absolute; z-index: 3;">';}
                
                if(doc.data().rate100 == "D"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trD.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "C"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trC.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "B"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trB.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "A"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trA.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "S"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trS.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "SS"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trSS.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "SSS"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trSSS.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "X"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trX.png" style="position: absolute; z-index: 4;">';}
                
                allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/charaBG1.png" style="position: absolute; z-index: 2;"><img style="background-image: url(https://reinvokeesp.weebly.com/files/theme/charaBG0.png);"  alt = "id' + doc.id + '" src = ""></span>';
                $('#CharaIcons').append(allhtml);
                var tangRef = storageRef.child('CharaIcons/' + doc.id + '.png');
                tangRef.getDownloadURL().then(function(url) {
                        document.querySelector('img[alt$="id' + doc.id + '"]').src = url;
                    })
                allhtml = "";
                i++;
                if(i == 2 && isMobileDevice() == true){$('#CharaIcons').append('<br>'); i = 0}
                if(i == 3){$('#CharaIcons').append('<br>'); i = 0}
            })
        })
}

function searchbyName() {
    document.getElementById('CharaIcons').innerHTML = "";
    var personajesDB = db.collection("PersonajesNew");
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var allhtml = "";
    var i = 0;
    var search = personajesDB.where("Nombre", "==", "" + document.getElementById('myInput').value).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if(doc.data().Tipo == "Rojo"){allhtml += '<span data-dismiss="modal" onclick = "getInfo(' + doc.id + ')"> <img src="https://reinvokeesp.weebly.com/files/theme/typeSTR.png" style="position: absolute; z-index: 3;">';}
                else if(doc.data().Tipo == "Azul"){allhtml += '<span data-dismiss="modal" onclick = "getInfo(' + doc.id + ')"> <img src="https://reinvokeesp.weebly.com/files/theme/typeINT.png" style="position: absolute; z-index: 3;">';}
                else if(doc.data().Tipo == "Verde"){allhtml += '<span data-dismiss="modal" onclick = "getInfo(' + doc.id + ')"> <img src="https://reinvokeesp.weebly.com/files/theme/typeSPD.png" style="position: absolute; z-index: 3;">';}
                else if(doc.data().Tipo == "Luz"){allhtml += '<span data-dismiss="modal" onclick = "getInfo(' + doc.id + ')"> <img src="https://reinvokeesp.weebly.com/files/theme/typeLIT.png" style="position: absolute; z-index: 3;">';}
                else if(doc.data().Tipo == "Oscuridad"){allhtml += '<span data-dismiss="modal" onclick = "getInfo(' + doc.id + ')"> <img src="https://reinvokeesp.weebly.com/files/theme/typeDRK.png" style="position: absolute; z-index: 3;">';}
                
                if(doc.data().rate100 == "D"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trD.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "C"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trC.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "B"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trB.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "A"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trA.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "S"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trS.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "SS"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trSS.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "SSS"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trSSS.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "X"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trX.png" style="position: absolute; z-index: 4;">';}
                
                allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/charaBG1.png" style="position: absolute; z-index: 2;"><img style="background-image: url(https://reinvokeesp.weebly.com/files/theme/charaBG0.png);"  alt = "id' + doc.id + '" src = ""></span>';
                $('#CharaIcons').append(allhtml);
                var tangRef = storageRef.child('CharaIcons/' + doc.id + '.png');
                tangRef.getDownloadURL().then(function(url) {
                        document.querySelector('img[alt$="id' + doc.id + '"]').src = url;
                    })
                allhtml = "";
                i++;
                if(i == 2 && isMobileDevice() == true){$('#CharaIcons').append('<br>'); i = 0}
                if(i == 3){$('#CharaIcons').append('<br>'); i = 0}
            })
        })
}

function searchAll() {
    document.getElementById('CharaIcons').innerHTML = "";
    var personajesDB = db.collection("PersonajesNew");
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var allhtml = "";
    var i = 0;
    var search = personajesDB.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if(doc.data().Tipo == "Rojo"){allhtml += '<span data-dismiss="modal" onclick = "getInfo(' + doc.id + ')"> <img src="https://reinvokeesp.weebly.com/files/theme/typeSTR.png" style="position: absolute; z-index: 3;">';}
                else if(doc.data().Tipo == "Azul"){allhtml += '<span data-dismiss="modal" onclick = "getInfo(' + doc.id + ')"> <img src="https://reinvokeesp.weebly.com/files/theme/typeINT.png" style="position: absolute; z-index: 3;">';}
                else if(doc.data().Tipo == "Verde"){allhtml += '<span data-dismiss="modal" onclick = "getInfo(' + doc.id + ')"> <img src="https://reinvokeesp.weebly.com/files/theme/typeSPD.png" style="position: absolute; z-index: 3;">';}
                else if(doc.data().Tipo == "Luz"){allhtml += '<span data-dismiss="modal" onclick = "getInfo(' + doc.id + ')"> <img src="https://reinvokeesp.weebly.com/files/theme/typeLIT.png" style="position: absolute; z-index: 3;">';}
                else if(doc.data().Tipo == "Oscuridad"){allhtml += '<span data-dismiss="modal" onclick = "getInfo(' + doc.id + ')"> <img src="https://reinvokeesp.weebly.com/files/theme/typeDRK.png" style="position: absolute; z-index: 3;">';}
                
                if(doc.data().rate100 == "D"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trD.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "C"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trC.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "B"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trB.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "A"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trA.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "S"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trS.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "SS"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trSS.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "SSS"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trSSS.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "X"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trX.png" style="position: absolute; z-index: 4;">';}
                
                allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/charaBG1.png" style="position: absolute; z-index: 2;"><img style="background-image: url(https://reinvokeesp.weebly.com/files/theme/charaBG0.png);"  alt = "id' + doc.id + '" src = ""></span>';
                $('#CharaIcons').append(allhtml);
                var tangRef = storageRef.child('CharaIcons/' + doc.id + '.png');
                tangRef.getDownloadURL().then(function(url) {
                        document.querySelector('img[alt$="id' + doc.id + '"]').src = url;
                    })
                allhtml = "";
                i++;
                if(i == 2 && isMobileDevice() == true){$('#CharaIcons').append('<br>'); i = 0}
                if(i == 3){$('#CharaIcons').append('<br>'); i = 0}
            })
        })
}

async function searchbyType() {
    document.getElementById('CharaIcons').innerHTML = "";
    var personajesDB = db.collection("PersonajesNew");
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var allhtml = "";
    var i = 0;
    var search = await personajesDB.where("Tipo", "==", "" + document.getElementById('SearchTipo').value).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                if(doc.data().Tipo == "Rojo"){allhtml += '<span data-dismiss="modal" onclick = "getInfo(' + doc.id + ')"> <img src="https://reinvokeesp.weebly.com/files/theme/typeSTR.png" style="position: absolute; z-index: 3;">';}
                else if(doc.data().Tipo == "Azul"){allhtml += '<span data-dismiss="modal" onclick = "getInfo(' + doc.id + ')"> <img src="https://reinvokeesp.weebly.com/files/theme/typeINT.png" style="position: absolute; z-index: 3;">';}
                else if(doc.data().Tipo == "Verde"){allhtml += '<span data-dismiss="modal" onclick = "getInfo(' + doc.id + ')"> <img src="https://reinvokeesp.weebly.com/files/theme/typeSPD.png" style="position: absolute; z-index: 3;">';}
                else if(doc.data().Tipo == "Luz"){allhtml += '<span data-dismiss="modal" onclick = "getInfo(' + doc.id + ')"> <img src="https://reinvokeesp.weebly.com/files/theme/typeLIT.png" style="position: absolute; z-index: 3;">';}
                else if(doc.data().Tipo == "Oscuridad"){allhtml += '<span data-dismiss="modal" onclick = "getInfo(' + doc.id + ')"> <img src="https://reinvokeesp.weebly.com/files/theme/typeDRK.png" style="position: absolute; z-index: 3;">';}

                if(doc.data().rate100 == "D"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trD.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "C"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trC.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "B"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trB.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "A"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trA.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "S"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trS.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "SS"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trSS.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "SSS"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trSSS.png" style="position: absolute; z-index: 4;">';}
                else if(doc.data().rate100 == "X"){allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/trX.png" style="position: absolute; z-index: 4;">';}
                
                allhtml += '<img src="https://reinvokeesp.weebly.com/files/theme/charaBG1.png" style="position: absolute; z-index: 2;"><img style="background-image: url(https://reinvokeesp.weebly.com/files/theme/charaBG0.png);"  alt = "id' + doc.id + '" src = ""></span>';
                $('#CharaIcons').append(allhtml);
                var tangRef = storageRef.child('CharaIcons/' + doc.id + '.png');
                var download = tangRef.getDownloadURL().then(function(url) {
                        document.querySelector('img[alt$="id' + doc.id + '"]').src = url;
                    })
                allhtml = "";
                i++;
                if(i == 2 && isMobileDevice() == true){$('#CharaIcons').append('<br>'); i = 0}
                if(i == 3){$('#CharaIcons').append('<br>'); i = 0}
            })
        })
}

function getSkill(id, quality, html, all) {
    var habilidadesDB = db.collection("Habilidades").doc("" + id);
    console.log(quality);
    habilidadesDB.get().then(function(doc) {
        var rarity = quality.replace("M", "-");
        rarity = rarity.replace("P", "+");
        document.getElementById("Boost" + html).innerHTML = doc.data().Name + " " + rarity;
        if (all == "yes") {
            if (quality == "A") { document.getElementById("Boost" + html + "D").innerHTML = doc.data().AA; }
            if (quality == "SM") { document.getElementById("Boost" + html + "D").innerHTML = doc.data().SMA; }
            if (quality == "SP") { document.getElementById("Boost" + html + "D").innerHTML = doc.data().SPA; }
            if (quality == "SSM") { document.getElementById("Boost" + html + "D").innerHTML = doc.data().SSMA; }
        } else {
            if (quality == "C") { document.getElementById("Boost" + html + "D").innerHTML = doc.data().C; }
            if (quality == "B") { document.getElementById("Boost" + html + "D").innerHTML = doc.data().B; }
            if (quality == "A") { document.getElementById("Boost" + html + "D").innerHTML = doc.data().A; }
            if (quality == "S") { document.getElementById("Boost" + html + "D").innerHTML = doc.data().S; }
            if (quality == "SM") { document.getElementById("Boost" + html + "D").innerHTML = doc.data().SM; }
            if (quality == "SP") { document.getElementById("Boost" + html + "D").innerHTML = doc.data().SP; }
            if (quality == "SSM") { document.getElementById("Boost" + html + "D").innerHTML = doc.data().SSM; }
            if (quality == "SSP") { document.getElementById("Boost" + html + "D").innerHTML = doc.data().SSP; }
            if (quality == "SSSM") { document.getElementById("Boost" + html + "D").innerHTML = doc.data().SSSM; }
            if (quality == "SSSP") { document.getElementById("Boost" + html + "D").innerHTML = doc.data().SSSP; }
            if (quality == "GS") { document.getElementById("Boost" + html + "D").innerHTML = doc.data().GS; }
        }
    });
}

function getInfo(id) {
    document.getElementById("MainWindow").style.display = "Block";
    document.getElementsByTagName("body")[0].style.paddingRight = "0px";
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var tangRef = storageRef.child('CharaIcons/' + id + '.png');
    tangRef.getDownloadURL().then(function(url) {
        document.querySelector('img[alt$="Personaje"]').src = url;
    })
    var personajesDB = db.collection("PersonajesNew").doc("" + id);
    personajesDB.get().then(function(doc) {
        if (doc.data().Tipo === 'Azul') { document.querySelector('img[alt$="icon_attribute_4"]').src = 'https://tkr-i18n-prd.channel.or.jp/tkr/assets/img/webview/icon_attribute_3.png'; } else if (doc.data().Tipo === 'Verde') { document.querySelector('img[alt$="icon_attribute_4"]').src = 'https://tkr-i18n-prd.channel.or.jp/tkr/assets/img/webview/icon_attribute_2.png'; } else if (doc.data().Tipo === 'Rojo') { document.querySelector('img[alt$="icon_attribute_4"]').src = 'https://tkr-i18n-prd.channel.or.jp/tkr/assets/img/webview/icon_attribute_1.png'; } else if (doc.data().Tipo === 'Luz') { document.querySelector('img[alt$="icon_attribute_4"]').src = 'https://tkr-i18n-prd.channel.or.jp/tkr/assets/img/webview/icon_attribute_5.png'; } else if (doc.data().Tipo === 'Oscuridad') { document.querySelector('img[alt$="icon_attribute_4"]').src = 'https://tkr-i18n-prd.channel.or.jp/tkr/assets/img/webview/icon_attribute_4.png'; }
        if (doc.data().Rareza === 'R') { document.querySelector('img[alt$="Rareza"]').src = 'https://tkr-i18n-prd.channel.or.jp/tkr/assets/img/webview/icon_rarity_3.png'; } else if (doc.data().Rareza === 'SR') { document.querySelector('img[alt$="Rareza"]').src = 'https://tkr-i18n-prd.channel.or.jp/tkr/assets/img/webview/icon_rarity_5.png'; } else if (doc.data().Rareza === 'SSR') { document.querySelector('img[alt$="Rareza"]').src = 'https://tkr-i18n-prd.channel.or.jp/tkr/assets/img/webview/icon_rarity_7.png'; }
        if (doc.data().HU < 10) { document.querySelector('img[alt$="HU"]').src = 'https://www.weebly.com/editor/uploads/4/7/3/0/4730780/custom_themes/807762515383465487/files/icon_ability/icon_ability_ia10000' + doc.data().HU + '_' + doc.data().HUR + '.png'; }
        if (doc.data().H1 < 10) { document.querySelector('img[alt$="H1"]').src = 'https://www.weebly.com/editor/uploads/4/7/3/0/4730780/custom_themes/807762515383465487/files/icon_ability/icon_ability_ia10000' + doc.data().H1 + '_' + doc.data().H1R + '.png'; }
        if (doc.data().H2 < 10) { document.querySelector('img[alt$="H2"]').src = 'https://www.weebly.com/editor/uploads/4/7/3/0/4730780/custom_themes/807762515383465487/files/icon_ability/icon_ability_ia10000' + doc.data().H2 + '_' + doc.data().H2R + '.png'; }
        if (doc.data().H3 < 10) { document.querySelector('img[alt$="H3"]').src = 'https://www.weebly.com/editor/uploads/4/7/3/0/4730780/custom_themes/807762515383465487/files/icon_ability/icon_ability_ia10000' + doc.data().H3 + '_' + doc.data().H3R + '.png'; }
        if (doc.data().H4 < 10) { document.querySelector('img[alt$="H4"]').src = 'https://www.weebly.com/editor/uploads/4/7/3/0/4730780/custom_themes/807762515383465487/files/icon_ability/icon_ability_ia10000' + doc.data().H4 + '_' + doc.data().H4R + '.png'; }
        if (doc.data().HU > 9 && doc.data().HU < 100) { document.querySelector('img[alt$="HU"]').src = 'https://www.weebly.com/editor/uploads/4/7/3/0/4730780/custom_themes/807762515383465487/files/icon_ability/icon_ability_ia1000' + doc.data().HU + '_' + doc.data().HUR + '.png'; }
        if (doc.data().H1 > 9 && doc.data().H1 < 100) { document.querySelector('img[alt$="H1"]').src = 'https://www.weebly.com/editor/uploads/4/7/3/0/4730780/custom_themes/807762515383465487/files/icon_ability/icon_ability_ia1000' + doc.data().H1 + '_' + doc.data().H1R + '.png'; }
        if (doc.data().H2 > 9 && doc.data().H2 < 100) { document.querySelector('img[alt$="H2"]').src = 'https://www.weebly.com/editor/uploads/4/7/3/0/4730780/custom_themes/807762515383465487/files/icon_ability/icon_ability_ia1000' + doc.data().H2 + '_' + doc.data().H2R + '.png'; }
        if (doc.data().H3 > 9 && doc.data().H3 < 100) { document.querySelector('img[alt$="H3"]').src = 'https://www.weebly.com/editor/uploads/4/7/3/0/4730780/custom_themes/807762515383465487/files/icon_ability/icon_ability_ia1000' + doc.data().H3 + '_' + doc.data().H3R + '.png'; }
        if (doc.data().H4 > 9 && doc.data().H4 < 100) { document.querySelector('img[alt$="H4"]').src = 'https://www.weebly.com/editor/uploads/4/7/3/0/4730780/custom_themes/807762515383465487/files/icon_ability/icon_ability_ia1000' + doc.data().H4 + '_' + doc.data().H4R + '.png'; }
        if (doc.data().HU > 99) { document.querySelector('img[alt$="HU"]').src = 'https://www.weebly.com/editor/uploads/4/7/3/0/4730780/custom_themes/807762515383465487/files/icon_ability/icon_ability_ia100' + doc.data().HU + '_' + doc.data().HUR + '.png'; }
        if (doc.data().H1 > 99) { document.querySelector('img[alt$="H1"]').src = 'https://www.weebly.com/editor/uploads/4/7/3/0/4730780/custom_themes/807762515383465487/files/icon_ability/icon_ability_ia100' + doc.data().H1 + '_' + doc.data().H1R + '.png'; }
        if (doc.data().H2 > 99) { document.querySelector('img[alt$="H2"]').src = 'https://www.weebly.com/editor/uploads/4/7/3/0/4730780/custom_themes/807762515383465487/files/icon_ability/icon_ability_ia100' + doc.data().H2 + '_' + doc.data().H2R + '.png'; }
        if (doc.data().H3 > 99) { document.querySelector('img[alt$="H3"]').src = 'https://www.weebly.com/editor/uploads/4/7/3/0/4730780/custom_themes/807762515383465487/files/icon_ability/icon_ability_ia100' + doc.data().H3 + '_' + doc.data().H3R + '.png'; }
        if (doc.data().H4 > 99) { document.querySelector('img[alt$="H4"]').src = 'https://www.weebly.com/editor/uploads/4/7/3/0/4730780/custom_themes/807762515383465487/files/icon_ability/icon_ability_ia100' + doc.data().H4 + '_' + doc.data().H4R + '.png'; }
        getSkill(doc.data().HU, doc.data().HUQ, 1, doc.data().HUA);
        getSkill(doc.data().H1, doc.data().H1Q, 2, doc.data().H1A);
        getSkill(doc.data().H2, doc.data().H2Q, 3, doc.data().H2A);
        getSkill(doc.data().H3, doc.data().H3Q, 4, doc.data().H3A);
        getSkill(doc.data().H4, doc.data().H4Q, 5, doc.data().H4A);
        if (doc.data().Awaken === 'on') {
            var text1 = document.getElementById("AwakenInfo");
            var text2 = document.getElementById("AwakenInfo2");
            var text3 = document.getElementById("AwakenInfo3");
            var text4 = document.getElementById("AwakenInfo4");
            text1.style.display = "block";
            text2.style.display = "block";
            text3.style.display = "block";
            text4.style.display = "block";
            document.getElementById("AwakenS1").innerHTML = doc.data().AwakenS1;
            document.getElementById("AwakenS2").innerHTML = doc.data().AwakenS2;
            document.getElementById("HabilidadN1").innerHTML = doc.data().AwakenN;
            document.getElementById("HabilidadN2").innerHTML = doc.data().AwakenN;
        } else {
            var text1 = document.getElementById("AwakenInfo");
            var text2 = document.getElementById("AwakenInfo2");
            var text3 = document.getElementById("AwakenInfo3");
            var text4 = document.getElementById("AwakenInfo4");
            text1.style.display = "none";
            text2.style.display = "none";
            text3.style.display = "none";
            text4.style.display = "none";
            document.getElementById("AwakenS1").innerHTML = "";
            document.getElementById("AwakenS2").innerHTML = "";
            document.getElementById("HabilidadN1").innerHTML = "";
            document.getElementById("HabilidadN2").innerHTML = "";
        }
        if(doc.data().tierList == 'yes'){
            document.getElementById('Tierlist').style.display = "Block";
            document.getElementById('Class1').innerHTML = doc.data().Class;
            document.getElementById('Class2').innerHTML = doc.data().mainClass;
            document.getElementById('Class3').innerHTML = doc.data().subClass;
            document.getElementById('CharaEval0').innerHTML = doc.data().rate0;
            document.getElementById('CharaEval40').innerHTML = doc.data().rate40;
            document.getElementById('CharaEval80').innerHTML = doc.data().rate80;
            document.getElementById('CharaEval100').innerHTML = doc.data().rate100;
            document.getElementById('CharaEvalStrike').innerHTML = 'Strike : ' +doc.data().rateRaid;
            document.getElementById('CharaEvalRaid').innerHTML = 'Raid : ' +doc.data().rateStrike;
            document.getElementById('trCredits').innerHTML = 'Evaluado por : ' +doc.data().valuedBy;
            
        }else{
            document.getElementById('Tierlist').style.display = "none";
        }
        document.getElementById("Nombre").innerHTML = doc.data().Nombre;
        document.getElementById("NombreC").innerHTML = doc.data().NombreC;
        document.getElementById("Creditos").innerHTML = ("Traduccion by : " + doc.data().Creditos);
        document.getElementById("HP").innerHTML = doc.data().HP;
        document.getElementById("Ataque").innerHTML = doc.data().Ataque;
        document.getElementById("Def").innerHTML = doc.data().Def;
        document.getElementById("conflictHP").innerHTML = doc.data().HP;
        document.getElementById("conflictATK").innerHTML = doc.data().Ataque;
        document.getElementById("conflictDEF").innerHTML = doc.data().Def;
        document.getElementById("AP").innerHTML = doc.data().AP;
        document.getElementById("BRD").innerHTML = doc.data().BRD;
        document.getElementById("QoK").innerHTML = doc.data().QoK;
        document.getElementById("HabilidadN").innerHTML = doc.data().HabilidadN;
        document.getElementById("conflictSK").innerHTML = doc.data().HabilidadN;
        document.getElementById("Habilidad").innerHTML = doc.data().Habilidad;

        document.getElementById("conflictAS").innerHTML = doc.data().conflictAS;
        document.getElementById("conflictMS").innerHTML = doc.data().conflictMS;
        document.getElementById("conflictSC").innerHTML = doc.data().conflictSC;
        document.getElementById("conflictST").innerHTML = doc.data().conflictST;
        document.getElementById("conflictRG").innerHTML = doc.data().conflictRG;
        document.getElementById("conflictSKD").innerHTML = doc.data().conflictSKD;
    });
}
