SOROLLET.Pattern = function( numTracks, length ) {
	'use strict';

	this.rows = [];

	for( var i = 0; i < length; i++ ) {
		
		var row = [];
		
		for( var j = 0; j < numTracks; j++ ) {

			row.push( new SOROLLET.PatternCell() );

		}

		this.rows.push( row );
	}
}

SOROLLET.PatternCell = function() {
	
	this.reset();

}

SOROLLET.PatternCell.prototype = {
	reset: function() {
		this.note = null;
		this.noteOff = false;
		this.volume = null;
	}
};
