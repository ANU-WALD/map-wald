module.exports = function(fn){
	var res = true;
	['.ngfactory.','.ngsummary.','tpl.component'].forEach(function(p){
		res = res && fn.indexOf(p)===-1;
	});
	console.log(fn,res);
	return res;
};