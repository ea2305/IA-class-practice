'use strict';

//Definicion de librerias
let math = require('mathjs');

const 	N = 0.001,  	//Constante de proporcionalidad
		Y = [0,1,1,1],	//Salidas esperadas
		T = 1,			//tetha
		Tolerancia = 0.01; // condicion de salida

//Definimos Entrada de datos
var X = [
	[ 0 , 0 ],
	[ 1 , 0 ],
	[ 0 , 1 ],
	[ 1 , 1 ]
];

//Peso aleatorio		//Peso rand
var W = [ 0.5 , 0.5 ];

//Soporte para iteracion
var total_err = 1,
	iterator = 0;


while( Tolerancia < total_err ){

	//Reiniciamos
	total_err = 0;

	X.forEach( ( Xi , index ) => {

		console.log( "Fila: " , Xi , " W : " , W  );
		
		//Calculamos U
		var U = math.multiply( Xi , W );
		//console.log( "Multiplicacion de Xi * W: " , U );

		//Calculamos salida de neurona
		var Yk = f( U - T );
		//console.log( "Yk <- " , Yk );

		//Calcular el error
		var error = Y[index] - Yk;
		//console.log( "Error -> " , error )

//Fase 2

		//Calculo de elementos para actualizacion de pesos
					//Operacion N(constante de prop.) obtenido con Xi
		var op   = math.multiply( N , Xi  ),
					//Resultado obtenido con error
			op_1 = math.multiply( op , error  ),
					//Suma de Wi con Operacion previa
			res  = math.add( op_1 , W );


		//console.log( "Wk + 1 -> " , res , "\n" )

		//Actualizamos elementos !importante
		W = res;
		//acumulamos el error
		total_err += error;
	});
	
	//Obtenemos el promedio del error
	total_err = total_err / 4;

	iterator++;
	console.log( "\nTotal error -> " + total_err );

}

console.log( "\n W final -> " , W , " Iteraciones ->" , iterator);


function f( v ){
	return ( v <= 0 )? 0 : 1;
}

/**
 * Helper function to output a value in the console. Value will be formatted.
 * @param {*} value
 */
function print (value) {
	var precision = 14;
	console.log(math.format(value, precision));
}