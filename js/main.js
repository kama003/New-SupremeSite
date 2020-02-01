var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
	document.querySelector(".guides-image").src = "./images/guides_mobile.png";
	document.querySelector(".guides-image").style.width = "100%";
	
}

var elem = document.querySelector('.sidenav');
var instance = M.Sidenav.init(elem, {
  inDuration: 350,
  outDuration: 350,
  edge: 'left' //or right
});
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
	var currentScrollPos = window.pageYOffset;
	if (prevScrollpos > currentScrollPos) {
		document.getElementById("navbar").style.top = "0";
	} else {
		document.getElementById("navbar").style.top = "-150px";
	}
	prevScrollpos = currentScrollPos;
}
document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelectorAll('.carousel');
	var instances = M.Carousel.init(elems);
});
$('.carousel.carousel-slider').carousel({
	fullWidth: true,
	indicators: false
});
// move next carousel
$('.moveNextCarousel').click(function (e) {
	e.preventDefault();
	e.stopPropagation();
	$('.carousel').carousel('next');
});
// move prev carousel
$('.movePrevCarousel').click(function (e) {
	e.preventDefault();
	e.stopPropagation();
	$('.carousel').carousel('prev');
});
$('.dropdown-trigger').dropdown();

$(document).ready(function(){
    $('.collapsible').collapsible();
  });

  var coll = document.getElementsByClassName("extend");
  var i;
  for (i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function() {
	  this.classList.toggle("active");
	  var content = this.previousElementSibling;
	  if (content.style.height === "70px") {
		content.style.height = "130px";
		
	  } else {
		content.style.height = "70px";
	  }
	 });

	// $(coll[i]).click(function(){
	// 	$(this).prev().slideToggle();
	// });

  }

  const container = document.getElementById("scene");
  const scale = document.getElementById("scale");
  const rotate = document.getElementById("rotate");

  let scene, camera, renderer;
  function init() {

	scene = new THREE.Scene();
	//scene.background = new THREE.Color(0xffffff0);
	camera = new THREE.PerspectiveCamera(90,container.clientHeight/container.clientWidth,100,5000);
	camera.rotation.y = 45/180*Math.PI;
	camera.position.x = 800;
	camera.position.y = 100;
	camera.position.z = 1000;
	
	//controls.addEventListener('change', renderer);
	hlight = new THREE.AmbientLight (0x404040,100);
	scene.add(hlight);
	directionalLight = new THREE.DirectionalLight(0xffffff,10);
	directionalLight.position.set(0,1,0);
	directionalLight.castShadow = true;
	scene.add(directionalLight);
	renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
	renderer.setSize(container.clientWidth,container.clientHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
	container.appendChild(renderer.domElement);
	let loader = new THREE.GLTFLoader();
	
	loader.load('./robot/scene.gltf', function(gltf){
	  model = gltf.scene.children[0];
	  model.scale.set(0.05,0.05,0.05);
	  model.rotation.z = 13.69;
	  scene.add(gltf.scene);
	  animate();
	});
  }

  function rotateMoodel(rotateValue){
	model.rotation.z = rotateValue;
	console.log(rotateValue);
  }
  function scaleMoodel(scaleValue){
	model.scale.set(scaleValue/100,scaleValue/100,scaleValue/100);
	
  }
  function animate() {

	//car.rotation.z += 0.005;
	
	renderer.render(scene,camera);
	requestAnimationFrame(animate);
  }
  init();
