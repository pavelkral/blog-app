
function JseString() {

};

JseString.prototype.Urlreplace = function(txt) {

	var cz="áäčďéěíĺľňóôőöŕšťúůűüýřžÁÄČĎÉĚÍĹĽŇÓÔŐÖŔŠŤÚŮŰÜÝŘŽ";
	var nocz="aacdeeillnoooorstuuuuyrzAACDEEILLNOOOORSTUUUUYRZ";
	tx="";
	for(p=0;p<txt.length;p++){
		if (cz.indexOf(txt.charAt(p))!=-1){
			tx+=nocz.charAt(cz.indexOf(txt.charAt(p)));
		}		
		else{
			tx+=txt.charAt(p);
		} 
	}
	var string = tx.replace(/[^a-zA-Z0-9]/g,'-').toLowerCase();
	string = string.replace(/\-+/g, '-');
	if (string[0] == '-') {
		string = string.substring(1, string.length);
	}
	if (string[string.length - 1] == '-') {
		string = string.substring(0, string.length - 1);
	}
	return string;
};

module.exports = new JseString;

