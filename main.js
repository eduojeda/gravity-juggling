const G = 200000;
const DISTANCE_THRESHOLD = 50;
const INTERVAL = 10;
const TIMESCALE = 1;
const DEBUG = false;
const NUM_MASSES = 10;
const MOTION_BLUR = false;
const BOOST_FACTOR = 10;

var dt = null;
var canvas = null;
var ctx = null;
var world = null;

function init() {
	world = new World();
	world.populate(NUM_MASSES);
}
