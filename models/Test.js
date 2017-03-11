'use strict';
//Definicion de librerias
let math = require('mathjs');

const 	N = 0.0000001,  	//Toleracia
		Y = [0,1,1,1],	//Salida esperada
		T = 1,			//tetha
		Tolerancia = 0.01;

//Definimos Entrada de datos
var X = [
	[ 0 , 0 ],
	[ 1 , 0 ],
	[ 0 , 1 ],
	[ 1 , 1 ]
];

//Peso aleatorio	OR
//var W = [ 1.0000000000000004, 1.0000000000000004 ];
//Peso aleatorio	OR
var W = [  0.501, 0.501 ];

X.forEach( ( Xi , index ) => {

	console.log( "Fila: " , Xi , " W : " , W  );
	
	//Calculamos U
	var U = math.multiply( Xi , W );
	//console.log( "Multiplicacion de Xi * W: " , U );

	//Calculamos salida de neurona
	var Yi = f( U - T );
	console.log( "Yi <- " , Yi );

	//Calcular el error
	var error = Y[index] - Yi;

	//console.log( "Error -> " , error )

	//Calculo de elementos para actualizacion de pesos
				//Operacion N(constante de prop.) obtenido con Xi
	var op   = math.multiply( N , Xi  ),
				//Resultado obtenido con error
		op_1 = math.multiply( op , error  ),
				//Suma de Wi con Operacion previa
		res  = math.add( op_1 , W );


	console.log( "Wk + 1 -> " , res , "\n" )

});

console.log( "\n W final -> " , W );


function f( v ){
	return ( v <= 0)? 0 : 1;
}

/**
 * Helper function to output a value in the console. Value will be formatted.
 * @param {*} value
 */
function print (value) {
	var precision = 14;
	console.log(math.format(value, precision));
}