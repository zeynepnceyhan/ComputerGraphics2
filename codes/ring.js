var gl;
var angle=radians(1);
var r=0.4;
var w=1;
var scalingFactor = 0.9;
var points = [vec2(r,0),vec2(w,0)];
var color = vec4(Math.random(),Math.random(),Math.random(),1.0);


window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    circle();
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    // console.log(points)
	
    var colorLoc = gl.getUniformLocation(program,"color");
	gl.uniform4fv(colorLoc,color);
    
    var scaleLoc = gl.getUniformLocation(program, "scale");
	gl.uniform1f(scaleLoc, scalingFactor);
    render();
};

function circle(){
    for(var i=0;i<360/angle;i++){
        points.push(vec2(points[0][0]*Math.cos(angle*i),points[0][0]*Math.sin(angle*i)))
        points.push(vec2(points[1][0]*Math.cos(angle*i),points[1][0]*Math.sin(angle*i)))
    }
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, points.length );
}
