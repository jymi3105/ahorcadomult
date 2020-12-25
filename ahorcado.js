var v = document.getElementsByTagName("audio")[0];
var v2 = document.getElementsByTagName("audio")[1];
var v3 = document.getElementsByTagName("audio")[2];
var v4 = document.getElementsByTagName("audio")[3];

var palabras = [["GUARGUERO", "LO DICE EL GOYO"], ["ABERRONCHO", "ES DE COMER, Y MARIDA CON LA ZARZAPOLLA"], ["ATROCHAR", "ATAJAR"], ["CEBADERA", "LA MASCARILLA"], ["BAR IZCARA", "CALERUEGA"], ["FRAY PERICO Y SU BORRICO", "LIBRO DE NIÑOS"], ["BOTAGUEÑA", "CHORI"], ["CALERUEGA", "UN GRAN LUGAR"], ["VALDEANDE", "UN GRAN LUGAR"], ["FUENTE RENDELUCAS", "UN BUEN LUGAR DENTRO DE OTRO GAN LUGAR"],
["BANZO", "LO DICE LOS PUCELANOS"], ["PALACIOS DE LA SIERRA", "PUEBLO DE BURGOS"], ["ARANDA DE DUERO", "NO HAY PISTA"], ["POMO", "CHUPARLOS EN ANTICOVID"], ["ATAULFO", "Fue nombrado rey durante la caida de Roma"], ["ESCALOFRIANTE", "Me la digiste yu ayer"], ["ESTERNOCLEIDOMASTOIDEO", "Es casi un trabalenguas"], ["POLLITO", "Asi se le llama a los peques"], ["GUIRNALDA", "NAVIDEÑO"], ["UVI MEDICALIZADA", "AMBULANCIA"],
["ALTO DE LAS CONTIENDAS", "GRAN PICO DE VALLADOLUID"]];
var aleatorio = Math.floor(Math.random() * palabras.length);
var palabra = palabras[aleatorio][0];
console.log(palabra);
var nueva = "";
var listaLetras = [];
var fallos = 6;
var aciertos = 0;
var letrasdichas = 0;

//Pongo una cookie en el caso de que no exista
if (leerCookie('puntuacion') == "") {
    ponerUnaCookie('puntuacion', 0, 30);
}

document.getElementById("puntos").value = leerCookie('puntuacion');



function IntroducirPalabra() {
    //  palabra = document.getElementById("palabraorigen").value.toUpperCase();
    if (palabra != "") {
        document.getElementById("cuadrojugador1").style.display = "none";
        document.getElementById("cuadrojugador2").style.display = "block";
        document.getElementById("cuadropalabra").style.display = "block";
        document.getElementById("imagen").style.display = "block";
        document.getElementById("oculta").innerHTML = nueva = palabra.replace(/(\w|Ñ|\s)/g, '* ');
        document.getElementById("intentos").innerHTML = "Tienes " + fallos + " oportunidades.";
        listaLetras = [];
        document.getElementById("letrasdichas").innerHTML = "";
        document.getElementById("volverJugar").disabled = true;
    }
}

function DecirLetra() {

    letra = document.getElementById("letra").value;
    if (listaLetras.indexOf(letra) == -1) {
        listaLetras.push(letra);
        document.getElementById("letrasdichas").innerHTML = listaLetras;
        letrasdichas++;

        if (palabra.indexOf(letra) == -1) {
            fallos = fallos - 1;
            document.getElementById("intentos").innerHTML = "Te quedan " + fallos + " opotunidades.";
            document.getElementById("imagen").setAttribute("src", "img/ahorcado_" + fallos + ".png");
            document.getElementById("acierto").innerHTML = "Fallo!";
            document.getElementById("acierto").className += "acierto rojo";
            v3.play();
            if (fallos == 4) {
                alert("Has vuelto a fallar. Te doy una pista\n" + palabras[aleatorio][1]);
            }
        } else {
            document.getElementById("acierto").innerHTML = "Bien!";
            document.getElementById("acierto").className += "acierto verde";
            v4.play();
        }
        posicion = palabra.indexOf(letra);
        while (posicion != -1) {
            aciertos++;
            posicionStart = posicion + 1;
            posicion = palabra.indexOf(letra, posicionStart);
        }

    } else {
        alert("La letra '" + letra + "' ya esta dicha.")
    }
    setTimeout(function () {
        document.getElementById("acierto").className = "";
    }, 800);

    nueva = "";
    for (let i = 0; i < palabra.length; i++) {
        if (listaLetras.indexOf(palabra[i]) != -1) {
            nueva += palabra[i] + " ";
            if (palabra[i] == " ") {
                //Esto es para hacer el espacio visible, ya que de otra manera, me lo acortaria
                nueva += "__";
            }
        } else {
            //y SI NO ESTA, QUE ME SIGA PONIENDO ESTO
            nueva += "* ";
        }
    }

    document.getElementById("oculta").innerHTML = nueva;

    if (fallos == 0) {
        document.getElementById("letra").disabled = true;
        document.getElementById("botondecirletra").disabled = true;
        document.getElementById("palabrasolucion").disabled = true;
        document.getElementById("botonresolver").disabled = true;
        document.getElementById("volverJugar").disabled = false;
        document.getElementById("palabrasolucion").value = "";
        v2.play();
        alert("Has perdido y te vamos a colgar.\nLa palabra era...\n¡JUEGA OTRA VEZ!");
    }

    if (aciertos == palabra.length) {
        document.getElementById("letra").disabled = true;
        document.getElementById("botondecirletra").disabled = true;
        document.getElementById("palabrasolucion").disabled = true;
        document.getElementById("botonresolver").disabled = true;
        document.getElementById("volverJugar").disabled = false;
        document.getElementById("acierto").innerHTML = "Felicidades !!";
        document.getElementById("acierto").className += "zoom-in encuadre";
        document.getElementById("letrasdichas").innerHTML = "";
        v.play();
        modificarCookie(4);
        //Esto lo pongo porque si no  me quita la clase con el setTimeOut que puse anteriormente
        //Y aqui le vuelvo a poner las clases, porque en el anterior se las quitaba
        setTimeout(function () {
            document.getElementById("acierto").className = "zoom-in encuadre";
        }, 800);
    }

    if (letrasdichas == 8) {
        alert("Ya has dicho 8 letras, y solo podras decir otras dos");
        modificarCookie(-1);
    }

    if (letrasdichas == 10) {
        document.getElementById("letra").disabled = true;
        document.getElementById("botondecirletra").disabled = true;
        document.getElementById("palabrasolucion").value = "";
        modificarCookie(-1);
    }
}

function Resolver() {
    if (document.getElementById("palabrasolucion").value == "") {
        alert("Tendras que meter algun valor!! Digo yo, no?? ;-(")
    } else {
        if (document.getElementById("palabrasolucion").value.toUpperCase() == palabra) {
            document.getElementById("letra").disabled = true;
            document.getElementById("botondecirletra").disabled = true;
            document.getElementById("palabrasolucion").disabled = true;
            document.getElementById("botonresolver").disabled = true;
            document.getElementById("volverJugar").disabled = false;
            document.getElementById("letrasdichas").innerHTML = "";
            document.getElementById("acierto").innerHTML = "Felicidades !!";
            document.getElementById("acierto").className += "zoom-in encuadre";
            modificarCookie(5);
            v.play();
        } else {
            if (fallos > 1) {
                v3.play();
                document.getElementById("acierto").innerHTML = "Fallo!";
                document.getElementById("acierto").className += "acierto rojo";
                document.getElementById("palabrasolucion").value = "";
                fallos--;
                document.getElementById("intentos").innerHTML = "Tienes " + fallos + " oportunidades.";
                document.getElementById("imagen").setAttribute("src", "img/ahorcado_" + fallos + ".png");
                alert("Has fallado, pero aun te queda algunas oportunidades");
            } else {
                v2.play();
                alert("Has perdido!! Has metido\n" + document.getElementById("palabrasolucion").value.toUpperCase() + "\ny era: " + palabra);
                document.getElementById("letra").disabled = true;
                document.getElementById("botondecirletra").disabled = true;
                document.getElementById("palabrasolucion").disabled = true;
                document.getElementById("botonresolver").disabled = true;
                document.getElementById("volverJugar").disabled = false;
            }
            setTimeout(function () {
                document.getElementById("acierto").className = "";
            }, 800);

        }
    }
    document.getElementById("palabrasolucion").value = "";
}

function volverJugar() {
    document.getElementById("letra").disabled = false;
    document.getElementById("botondecirletra").disabled = false;
    document.getElementById("palabrasolucion").disabled = false;
    document.getElementById("botonresolver").disabled = false;
    document.getElementById("cuadrojugador1").style.display = "block";
    document.getElementById("cuadrojugador2").style.display = "none";
    document.getElementById("cuadropalabra").style.display = "none";
    document.getElementById("imagen").style.display = "none";
    document.getElementById("palabrasolucion").value = "";
    document.getElementById("acierto").className = "";
    document.getElementById("acierto").innerHTML = "";
    reseteo();
}

function reseteo() {
    aleatorio = Math.floor(Math.random() * palabras.length);
    palabra = palabras[aleatorio][0];
    console.log(palabra);
    fallos = 6;
    aciertos = 0;
    letrasdichas = 0;
    document.getElementById("imagen").setAttribute("src", "img/ahorcado_" + fallos + ".png");
}

/*************FUNLCIONES PARA TRABAJAR CON COOKIES********************* */

function ponerUnaCookie(clave, valor, dias = 0) {
    var miCookie = "";
    if (dias > 0) {
        //Con el new Date vacio, le estamos dando la fecha del momento
        var fecha = new Date();
        fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
        //El formato de la fecha siempre tiene que ir en UTCString
        var expires = "expires=" + fecha.toUTCString();
        //Las cookies, siempre tienen un dormato clave=valor separandolor de otros con ;
        miCookie = clave + "=" + valor + ";" + expires; //PERMANENTE
    } else {
        miCookie = clave + "=" + valor; //SESIÓN
    }
    document.cookie = miCookie;
}

function leerCookie(clave) {
    var resultado = "";
    //Como el formato siempre tiene que llevar entre la clave y el valor, un =, pues ta se lo añadimos aqui
    var busqueda = clave + "=";
    //Leyendo todas las coockies, nos va a dar una cadena separando las diferentes cookies con ;
    //Asi que lo transfor a un array
    var listCookies = document.cookie.split(';');
    var par = "";

    for (var i = 0; i < listCookies.length; i++) {
        par = listCookies[i]; //Cada elemento del array de cookies: nombre de la cookie y carácter =

        //Se quitan los espacios en blanco del principio
        while (par.charAt(0) == ' ') {
            //Y en ese caso me quedo con la parte de la cadena desde la posicion 0
            par = par.substring(1);
        }

        //Se compara los que buscamos con el elemento del array. Si devuelve como índice 0 se ha encontrado
        if (par.indexOf(busqueda) == 0) {
            //Me quedo con la parte de la cadena desde la posicion tamaño de la cookie buscadas
            //hasta el final de la cadena, ya que el metodo substring acepta dos parametros
            resultado = par.substring(busqueda.length, par.length);
        }
    }
    return resultado;
}

function modificarCookie(puntos) {
    document.cookie = "puntuacion=" + (parseInt(leerCookie('puntuacion')) + puntos);
    document.getElementById("puntos").value = leerCookie('puntuacion');
}

