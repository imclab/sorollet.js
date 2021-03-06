SOROLLET.KnobGUI = function( params ) {
	var params = params || {},
		labelTxt = params.label || '',
		minValue = params.min !== undefined ? params.min : 0.0,
		maxValue = params.max !== undefined ? params.max : 1.0,
		stepValue = params.step !== undefined ? params.step : 0.1,
		precisionValue = params.precision !== undefined ? params.precision : 2,
		knobWidth = params.knobWidth || 30,
		knobHeight = params.knobHeight || knobWidth,
		strokeStyle = params.strokeStyle || '#000000',
		value = 0,
		onChangeHandler = function() { },
		dom = document.createElement( 'div' ),
		canvas = document.createElement( 'canvas' ),
		ctx = canvas.getContext( '2d' ),
		label = document.createElement( 'div' ),
		scope = this;

	dom.className = 'control';

	dom.appendChild( canvas );
	canvas.width = knobWidth;
	canvas.height = knobHeight;

	label.className = 'label';
	label.innerHTML = labelTxt;
	dom.appendChild( label );

	//
	
	var distance = 0,
		onMouseDownValue = 0;

	function onMouseDown( e ) {
		e.preventDefault();
		distance = 0;
		onMouseDownValue = parseFloat( value );
		document.addEventListener( 'mouseup', onMouseUp, false );
		document.addEventListener( 'mousemove', onMouseMove, false );
	}

	function onMouseMove( e ) {
		var movementX = e.movementX || e.webkitMovementX || e.mozMovementX || 0,
			movementY = e.movementY || e.webkitMovementY || e.mozMovementY || 0;

		distance += movementX - movementY;

		var number = onMouseDownValue + ( distance / ( e.shiftKey ? 10 : 100 ) ) * scope.step;

		value = Math.min( scope.max, Math.max( scope.min, number ) ).toFixed( scope.precision ) * 1;

		if( onChangeHandler ) {
			onChangeHandler();
		}

		updateGraph();
	}

	function onMouseUp( e ) {
		document.removeEventListener( 'mouseup', onMouseUp, false );
		document.removeEventListener( 'mousemove', onMouseMove, false );
	}

	canvas.addEventListener( 'mousedown', onMouseDown, false);

	this.setValue = function( v ) {
		value = v;
		updateGraph();
	}

	this.getValue = function( ) {
		return value;
	}

	function updateGraph() {
		ctx.clearRect( 0, 0, knobWidth, knobHeight );

		ctx.strokeStyle = strokeStyle;
		ctx.lineWidth = 2;

		var cx = knobWidth * 0.5,
			cy = knobHeight * 0.5,
			r = Math.min( cx, cy ) * 0.8,
			minAngle = Math.PI / 3,
			maxAngle = Math.PI * 6 / 3,
			angle = ( SOROLLET.Math.map( value, scope.min, scope.max, minAngle, maxAngle )) + Math.PI / 3;

		ctx.beginPath();
		ctx.arc( cx, cy, r, 0, Math.PI * 2, true );
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo( cx, cy );
		ctx.lineTo( cx + r * Math.cos( angle ), cy + r * Math.sin( angle ) );
		ctx.stroke();
	}
	this.updateGraph = updateGraph;

	this.onChange = function( newOnChangeHandler ) {
		onChangeHandler = newOnChangeHandler;
		return this;
	}

	this.dom = dom;

	this.min = minValue;
	this.max = maxValue;
	this.step = stepValue;
	this.precision = precisionValue;

	return this;
}
