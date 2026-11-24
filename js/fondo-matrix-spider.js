var lienzoFondo = document.getElementById("lienzoFondo");
var pincel = lienzoFondo.getContext("2d");

var tamañoCelda = 16;
var cantidadColumnas = 0;
var cantidadFilas = 0;

var caracteresPosibles = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFZ:.=*+-<>";

var caracterDeCadaCelda = [];
var brilloDeCadaCelda = [];
var filaDeLaCabezaDeCadaColumna = [];
var velocidadDeCadaColumna = [];

function ajustarTamañoYRejilla() {
    lienzoFondo.width = window.innerWidth;
    lienzoFondo.height = window.innerHeight;
    cantidadColumnas = Math.floor(lienzoFondo.width / tamañoCelda);
    cantidadFilas = Math.floor(lienzoFondo.height / tamañoCelda);
    crearEstructurasDeDatos();
}

function obtenerCaracterAleatorio() {
    var indiceAleatorio = Math.floor(Math.random() * caracteresPosibles.length);
    return caracteresPosibles.charAt(indiceAleatorio);
}

function crearEstructurasDeDatos() {
    caracterDeCadaCelda = [];
    brilloDeCadaCelda = [];
    filaDeLaCabezaDeCadaColumna = [];
    velocidadDeCadaColumna = [];

    for (var columna = 0; columna < cantidadColumnas; columna++) {
        caracterDeCadaCelda.push([]);
        brilloDeCadaCelda.push([]);
        for (var fila = 0; fila < cantidadFilas; fila++) {
            caracterDeCadaCelda[columna].push(obtenerCaracterAleatorio());
            brilloDeCadaCelda[columna].push(0);
        }
        filaDeLaCabezaDeCadaColumna.push(Math.floor(Math.random() * -cantidadFilas));
        velocidadDeCadaColumna.push(0.3 + Math.random() * 0.7);
    }
}

function apagarTodasLasCeldas() {
    var brillo;
    for (var columna = 0; columna < cantidadColumnas; columna++) {
        for (var fila = 0; fila < cantidadFilas; fila++) {
            brillo = brilloDeCadaCelda[columna][fila];
            brilloDeCadaCelda[columna][fila] = Math.max(0, brillo - 0.02);
        }
    }
}

function avanzarGotas() {
    var filaEnteraDeLaCabeza;
    for (var columna = 0; columna < cantidadColumnas; columna++) {
        filaDeLaCabezaDeCadaColumna[columna] += velocidadDeCadaColumna[columna];
        filaEnteraDeLaCabeza = Math.floor(filaDeLaCabezaDeCadaColumna[columna]);

        if (filaEnteraDeLaCabeza >= 0 && filaEnteraDeLaCabeza < cantidadFilas) {
            brilloDeCadaCelda[columna][filaEnteraDeLaCabeza] = 1;
            caracterDeCadaCelda[columna][filaEnteraDeLaCabeza] = obtenerCaracterAleatorio();
        }

        if (filaEnteraDeLaCabeza >= cantidadFilas) {
            filaDeLaCabezaDeCadaColumna[columna] = -Math.floor(Math.random() * 20);
        }
    }
}

function dibujarTodo() {
    pincel.fillStyle = "black";
    pincel.fillRect(0, 0, lienzoFondo.width, lienzoFondo.height);
    pincel.font = tamañoCelda + "px monospace";

    for (var columna = 0; columna < cantidadColumnas; columna++) {
        for (var fila = 0; fila < cantidadFilas; fila++) {
            var brillo = brilloDeCadaCelda[columna][fila];
            if (brillo > 0) {
                pincel.fillStyle = brillo === 1 ? "#d8ffe8" : "rgba(0, 255, 102, " + brillo + ")";
                dibujarCaracterEnCelda(caracterDeCadaCelda[columna][fila], columna, fila);
            }
        }
    }
}

function dibujarCaracterEnCelda(caracter, columna, fila) {
    var posicionHorizontalEnPixeles = columna * tamañoCelda;
    var posicionVerticalEnPixeles = (fila + 1) * tamañoCelda;
    pincel.fillText(caracter, posicionHorizontalEnPixeles, posicionVerticalEnPixeles);
}

function ejecutarUnFotograma() {
    apagarTodasLasCeldas();
    avanzarGotas();
    dibujarTodo();
}


/*  ^^^^^^ Lienzo normal ^^^^^^   */
/* Parte de la araña: */

var textoDelArteAscii = `                  -                     -                  
           :     :                       :     :           
          :     :                         :     :          
        :-     :                           :     -:        
       --     ::                           ::     --       
     ::-     -:                             :-     -::     
    :--     .:-                             -:.     -::    
    ---     :-:                             :-:     ---    
    ---     --::-                         -::--     ---    
    :--:.      ::::       :     :       ::::      .:--:    
     ::-:::::-    -::-   :: ::: ::   -::-    -:::::-::     
              --::-  -::  ::-:-::  ::-  -::--              
                     -:.::::::::-::.:-                     
       ::::--          -:::::::::::-          --::::       
  .:::::.        ::::     :::::::     .:::        .:::::.  
:::::       :::::        :::::::::        :::::       :::::
 :::     ::::-           .........           -::::     ::: 
  :::     ::-            .........            -::     :::  
   ::     :::-            .......            -:::     ::   
   :-.     :::            .......            :::     .-:   
    ::     :::             .....             :::     ::    
     :      ::-            .....            :::      :     
      :     :::             ...             :::     :      
       :     ::.            ...            .::     :       
        :     ::             .             ::     :        
         :     :-            .            -:     :         
                :                         :.               
                -:                       :-                
                 --                     --                 
                  -                     -                  
                   :                   :                   
                    :                 :                    `;
// Fíjate: el texto pegado no debe contener "${" ni acentos graves.

var lineasDelArteAscii = textoDelArteAscii.split("\n");
var celdaEsDeLaAraña = [];

function construirMascaraDeLaAraña() {
    // 1. MEDIR EL ARTE
    var cantidadDeLineasDelArte = lineasDelArteAscii.length;
    var anchoMaximoDelArte = 0;
    // TODO: recorrer lineasDelArteAscii y quedarte con la longitud (.length) más grande
    for (var i = 0; i < lineasDelArteAscii.length; i++) {
        var linea = lineasDelArteAscii[i];
        if (linea.length > anchoMaximoDelArte) {
            anchoMaximoDelArte = linea.length;
        }
    }

    // 2. DESPLAZAMIENTO PARA CENTRAR
    desplazamientoDeColumnas = Math.floor((cantidadColumnas - anchoMaximoDelArte) / 2)
    desplazamientoDeFilas = Math.floor((cantidadFilas - cantidadDeLineasDelArte) / 2)
    
    // 3. RELLENAR LA MÁSCARA
    celdaEsDeLaAraña = [];
    for (var columna = 0; columna < cantidadColumnas; columna++) {
        celdaEsDeLaAraña.push([]);
        for (var fila = 0; fila < cantidadFilas; fila++) {
            celdaEsDeLaAraña[columna].push(false);
        }
    }

    for (var numeroDeLinea = 0; numeroDeLinea < cantidadDeLineasDelArte; numeroDeLinea++) {
        var lineaActual = lineasDelArteAscii[numeroDeLinea];
        for (var posicionEnLinea = 0; posicionEnLinea < lineaActual.length; posicionEnLinea++) {
            if (lineaActual.charAt(posicionEnLinea) !== " ") {
                // TODO: columnaDeLaCelda = posicionEnLinea + desplazamientoDeColumnas
                // TODO: filaDeLaCelda = numeroDeLinea + desplazamientoDeFilas
                // TODO: si la celda está dentro de la rejilla
                //       (columna entre 0 y cantidadColumnas - 1, fila entre 0 y cantidadFilas - 1),
                //       ponerla a true
                var columnaDeLaCelda = posicionEnLinea + desplazamientoDeColumnas;
                var filaDeLaCelda = numeroDeLinea + desplazamientoDeFilas;
                if (columnaDeLaCelda >= 0 && columnaDeLaCelda < cantidadColumnas && filaDeLaCelda >= 0 && filaDeLaCelda < cantidadFilas) {
                    celdaEsDeLaAraña[columnaDeLaCelda][filaDeLaCelda] = true;
                }
            }
        }
    }
}

function dibujarMascaraDePrueba() {
    pincel.fillStyle = "rgba(255, 0, 0, 0.6)";
    for (var columna = 0; columna < cantidadColumnas; columna++) {
        for (var fila = 0; fila < cantidadFilas; fila++) {
            if (celdaEsDeLaAraña[columna][fila]) {
                // TODO: dibujar un "#" en esa celda con dibujarCaracterEnCelda
                dibujarCaracterEnCelda("#", columna, fila);
            }
        }
    }
}


ajustarTamañoYRejilla();
window.addEventListener("resize", ajustarTamañoYRejilla);
setInterval(ejecutarUnFotograma, 50);