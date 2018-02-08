
var teclas = document.getElementsByClassName('tecla')
var num1 = 0
var resultado, oper, operador
var cont=0
var contador=''

for (var i = 0; i < teclas.length; i++) {
    teclas[i].addEventListener("mousedown", precionaTecla.bind())
    teclas[i].addEventListener("mouseup", liberaTecla.bind())
}

function precionaTecla(event) {
  //console.log(event.target.id)
    event.target.style.padding = "2px"
    var id = event.target.id
    //console.log(id)
    capturaNumeros(id, verificaOperacion(id))
    capturaOperadores(id)
}

function liberaTecla(event) {
    event.target.removeAttribute('style');
}

function verificaOperacion(id){
  //console.log('ingreso a verificarOperacion')
  var cadena = document.getElementById('display1').innerHTML
  if(cadena.indexOf('=') != -1) {
    if(!isNaN(id)){
      document.getElementById('display1').innerHTML =''
    }else{
      document.getElementById('display1').innerHTML = document.getElementById('display').innerHTML
    }
    document.getElementById('display').innerHTML = ''

    operador=''
    contador=document.getElementById('display1').innerHTML
    resultado = 0
  }
} //Fin verificaOperacion(id)

function capturaNumeros(id, verificaOperacion) {
//  console.log(document.getElementById('display').innerHTML)
  var num = document.getElementById('display').innerHTML
  //console.log(num)
  if (num.length < 8) {
    if (!isNaN(id)) {
      document.getElementById('display1').innerHTML += id
      if (num == '0') {
        document.getElementById('display').innerHTML = id;
        num1=id
      } else {
        document.getElementById('display').innerHTML += id;
        num1+=id
      }
    }
  }
} //Fin agrgaNumero


function capturaOperadores(id){
  //console.log(id)
  var numeroActual = document.getElementById('display').innerHTML

    switch (id) {
      case 'mas':
          operador = '+'
          capturarExpresion()
          break
      case 'por':
          operador = '*'
          capturarExpresion()
          break
      case 'menos':
          operador = '-'
          capturarExpresion()
          break
      case 'dividido':
          operador = '/'
          capturarExpresion()
          break
      case 'raiz':
          resultado = Math.sqrt(numeroActual).toString().substr(0, 8)
          document.getElementById('display').innerHTML = resultado
          document.getElementById('display1').innerHTML= '√' + numeroActual + ''
          operador=''
          break
      case 'on':
          document.getElementById('display').innerHTML = 0
          document.getElementById('display1').innerHTML = ''
          num1 = 0
          resultado = 0
          operador=''
          contador=''
          oper=''
          break
      case 'sign':
          if (document.getElementById('display1').innerHTML != ''){
            resultado = parseFloat(document.getElementById('display1').innerHTML) * -1;
            document.getElementById('display').innerHTML = resultado
            document.getElementById('display1').innerHTML = document.getElementById('display').innerHTML
          }
          break
      case 'igual':
          operador = '='
          capturarExpresion()
          var res = operacion()
          document.getElementById('display').innerHTML=res
          document.getElementById('display1').innerHTML+=res
          contador=res
          break
    case 'punto':
          if(numeroActual.indexOf('.') == -1) {
            document.getElementById('display').innerHTML += '.'
            document.getElementById('display1').innerHTML += '.'
            num1 += '.'
          }
          break
    }
} //Fin VisualizaNumero()

function capturarExpresion() {
  var cadena = document.getElementById('display1').innerHTML
  if(operador == '='){
    console.log(operador)
    cont += 1
  } else {
    console.log('ingreso')
    oper = operador
    cont = 0
  }

  if(isNaN(cadena.charAt(cadena.length-1))){
    document.getElementById('display1').innerHTML = cadena.slice(0,cadena.length-1)
  }
  contador = document.getElementById('display1').innerHTML
  document.getElementById('display1').innerHTML +=  operador
  document.getElementById('display').innerHTML = 0;
  //console.log(document.getElementById('display1').innerHTML)
  return

}//Fin capturarDatos()

function operacion(){
  var cadena = contador
  //console.log(cadena)
  if (cont <= 1){
    if(isNaN(cadena.charAt(cadena.length-1))){
      resultado = eval(cadena.slice(0,cadena.length-1)).toString().substr(0, 8)
    } else {
      resultado = eval(cadena).toString().substr(0, 8)
    }
  } else {
    resultado = eval(contador + oper + num1).toString().substr(0, 8)
  }
  contador=''
  return (resultado)
}
