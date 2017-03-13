'use strict';

//Importamos la funcionalidad de perceptron
let Perceptron = require('./Perceptron');

//Parametros estandar
let custom = {
	T   : 1,			
	Tol : 0.01,
	N   : 0.01, 
	//Definimos Entrada de datos
	X   : 
	[
		[ 0 , 0 ],
		[ 1 , 0 ],
		[ 0 , 1 ],
		[ 1 , 1 ]
	],
	//Peso aleatorio
	W : [ 0.1 , 0.1 ]
}


/* [Compuertas] */
let AND = [0,0,0,1],
	OR  = [0,1,1,1],
	XOR = [0,1,1,0];

/*  N , Y , T , Tol , X , W , ENV  */
let p_AND = new Perceptron(
	custom.N,
	AND,
	custom.T,
	custom.Tol,
	custom.X,
	custom.W
);

let p_OR = new Perceptron(
	custom.N,
	OR,
	custom.T,
	custom.Tol,
	custom.X,
	custom.W
);

p_AND.training();
p_OR.training();


/*
	0,0
	0,1
	0,1
	1,1
*/
let currX = custom.X.map( ( Xi ) =>{
	return [
		p_AND.output( Xi ),
		p_OR.output( Xi )
	]
});

let p_XOR = new Perceptron(
	custom.N,
	XOR,
	custom.T,
	custom.Tol,
	currX,
	custom.W,
	true
);

p_XOR.training();