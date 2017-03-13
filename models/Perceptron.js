'use strict';

/**
 * Implementacion basica de perceptron
 * Funcionalidad adaptada a compuertas AND, OR y XOR
 * @author Elihu A. Cruz Albores
 * @verison 0.1.0
 */

function Perceptron( N , Y , T , Tol , X , W , ENV ){

	//Definicion de librerias
	this.math = require('mathjs');
	
	this.N   =   N || 0.01;			//Constante de proporcionalidad
	this.Y   =   Y || [0,1,1,1];	//Salidas esperadas default(OR)
	this.T   =   T || 1;			//tetha
	this.Tol = Tol || 0.01;			//Tolerancia de error para salida
	
	this.ENV = ENV;			//Debug mode [false]
	this.TOP = 100000;		//Limite de iteraciones

	//Entrada de datos de prueba
	this.X = X || 	[	[ 0 , 0 ],
						[ 1 , 0 ],
						[ 0 , 1 ],
						[ 1 , 1 ]  ];
	//Pesos de entradas						
	this.W = W ||	[ 0.1 , 0.1 ];						

	//Soporte para iteracion
	this.total_err = this.Tol * 2;

	//Control de iteraciones
	this.iterator = 0;

	/**
	 * Busqueda de pesos segun los datos proporcionados
	 * en el constructor
	 * @return {List} : Lista resultados del calculo de pesos
	 */
	this.training = function(){
				
		//condicion de busqueda para pesos
		while( this.total_err > this.Tol && this.iterator <= this.TOP ){

			//Reiniciamos iterador
			this.total_err = 0;

			this.X.forEach( ( Xi , index ) => {
				
				//Salida de neurona
				let Yk = this.output( Xi );

				//Calcular el error
				let error = this.Y[ index ] - Yk;

				//Calculo de elementos para actualizacion de pesos
				//Operacion N(constante de prop.) obtenido con Xi

				let n_Xi = this.math.multiply( this.N , Xi  ),

					//Resultado obtenido con error
					n_Xi_error = this.math.multiply( n_Xi , error  ),

					//Suma de Wi con Operacion previa
					update = this.math.add( n_Xi_error , this.W );

				//Actualizamos elementos !importante
				this.W = update;

				//acumulamos el error [update^2]
				this.total_err += ( error * error );
			});
			//Incrementamos iterador
			this.iterator++;

			//Obtenemos el promedio del error raiz( err )
			this.total_err = Math.sqrt( this.total_err );


			if( this.ENV )
				console.log( "i[" , this.iterator ,  "], e => " , this.total_err , " w => " , this.W  , "\n");
			
		}
		//Retornamos vector de pesos
		return this.W;

	}

	/**
	 * Busqueda de pesos segun los datos proporcionados
	 * en el constructor
	 *
	 * @return {int} : Resultado del procesamiento del perceptron entrenado
	 * 					Utilizando pesos definidos en constructor
	 */
	this.output = function( Xi ){

		//Verificamos entrada de datos
		//Retornamos en caso de error
		if(! Xi.constructor === Array ) return false;

		//Calculamos U
		var U = this.math.multiply( Xi , this.W );
		
		//Calculamos salida de neurona
		var Yi = this.f( U - this.T );
		
		//Log
		if ( this.ENV ) console.log( "Xi -> " , Xi , ", Yi -> ", Yi , "\n" );

		//Retornamos el resultado obtenido.
		return Yi; 
	}

	/**
	 * Funcion de activacion
	 * @params {Double} : Valor a evaluar
	 * @return {Int}	: Resultado de evaluacion
	 */
	this.f = function( v ){ return ( v <= 0)? 0 : 1; }

}

module.exports = Perceptron;