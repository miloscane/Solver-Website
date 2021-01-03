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
var viewArray	=	[__dirname+'/views'];
var viewFolder	=	fs.readdirSync('views');
for(var i=0;i<viewFolder.length;i++){
	if(viewFolder[i].split(".").length==1){
		viewArray.push(__dirname+'/'+viewFolder[i])
	}
}
//server.set('views', [__dirname + '/views']);
server.set('views', viewArray);
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
pageInfo.siteName		=	"Solver - Optimizacija poslovanja";

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

//Minify resources
var htmlModulesList	=	fs.readdirSync('./public/html-modules');
for(var i=0;i<htmlModulesList.length;i++){
	if(htmlModulesList[i].split('.').length>1){
		var code	=	fs.readFileSync('./public/html-modules/'+htmlModulesList[i],'utf-8');
		code	=	code.replace(/[\t\n\r]/gm,'');
		fs.writeFileSync('./public/html-modules/minified/'+htmlModulesList[i].split('.')[0]+'.min.'+htmlModulesList[i].split('.')[1],code);
	}
}

function fetchPageInfo(pageName,subdir){
	var pageInfoObject	=	JSON.parse(JSON.stringify(pageInfo));
	var path	=	(subdir) ? subdir+'/'+pageName+'.json':pageName+'.json';
	if(fs.existsSync('./info/'+ path)){
		var pageJson	=	JSON.parse(fs.readFileSync('./info/'+ path,'utf-8'));
	}else{
		var pageJson	=	JSON.parse(fs.readFileSync('./info/home.json','utf-8'));
	}
	for(var i=0;i<Object.keys(pageJson).length;i++){
		pageInfoObject[Object.keys(pageJson)[i]]	=	pageJson[Object.keys(pageJson)[i]].toString();
	}

	return pageInfoObject
}

/*io.on('connection', function(socket){
	
	socket.on('disconnect',function(){
		
	});
});*/


server.get('/',function(req,res){
	res.render('home',{
		pageInfo: fetchPageInfo('home','')
	});
});


server.get('/:pageName',function(req,res){
	res.render(req.params.pageName,{
		pageInfo: fetchPageInfo(req.params.pageName,'')
	},function(err){
		if(err){
			//logError("Couldn't load "+req.params.pageName+":\n"+err.toString());
			res.redirect('/');
		}
	});
});

server.get('*',function(req,res){
	res.redirect('/');
});