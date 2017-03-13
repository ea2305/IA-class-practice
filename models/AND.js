'use strict';

//Definicion de librerias
let math = require('mathjs');

const 	//N = 0.001,  	//Constante de proporcionalidad
		N = 0.01, 
		Y = [0,0,0,1],	//Salidas esperadas
		T = 1,			//tetha
		Tolerancia = 0.01, // condicion de salida
		precision = 14;

//Definimos Entrada de datos
var X = [
	[ 0 , 0 ],
	[ 1 , 0 ],
	[ 0 , 1 ],
	[ 1 , 1 ]
];

//Peso aleatorio		//Peso rand
//var W = [ 0.5 , 0.5 ];
var W = [ 0.1 , 0.1 ];

//Soporte para iteracion
var total_err = Tolerancia * 2,
	iterator = 0;


while( total_err > Tolerancia  ){

	//Reiniciamos
	total_err = 0;

	X.forEach( ( Xi , index ) => {
		
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
		total_err += (error * error);
	});

	iterator++;
	//Obtenemos el promedio del error
	total_err = Math.sqrt(total_err);

	console.log( "\ni:" , iterator ,  ", e => " , math.format(total_err, precision) , " w => " , W  , "\n");
	
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