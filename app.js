//Server
var server				=	require('express')();
var http				=	require('http').Server(server);
var net					=	require('net');
var io					=	require('socket.io')(http);
var express				=	require('express');
var fs					=	require('fs');
var bodyParser			=	require('body-parser');
var session				=	require('express-session');
var cookieParser		=	require('cookie-parser');
var crypto				=	require('crypto');

server.set('view engine','ejs');
server.set('views', [__dirname + '/views']);
server.use(express.static(__dirname + '/public'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());

http.listen(process.env.PORT || 3000, function(){
  console.log('Server Started');
});

var mainFileVersion	=	1.1;

var pageInfo	=	{};

pageInfo.fileVersion	=	mainFileVersion;

require('events').EventEmitter.prototype._maxListeners = 0;

function logError(err){
	if(!fs.existsSync('./errorLog.txt')){
		fs.writeFileSync('./errorLog.txt', 'ERROR LOG: \n \n \n', 'utf8');
	}
	var allErrors	=	fs.readFileSync('./errorLog.txt','utf-8');
	var dateOfError	=	new Date();
	allErrors += "------------------"+dateOfError+"\n"+err+"\n";
	var write	=	fs.writeFileSync('./errorLog.txt', allErrors, 'utf8');
}


/*io.on('connection', function(socket){
	
	socket.on('disconnect',function(){
		
	});
});*/


server.get('/',function(req,res){
	res.render('home',{
		pageInfo: pageInfo, 
	});
});

server.get('*',function(req,res){
	res.redirect('/');
});