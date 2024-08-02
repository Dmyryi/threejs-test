import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({
	color: 0xff6347,
})
const torus = new THREE.Mesh(geometry, material)
scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff, 100, 100)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24)
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
	const star = new THREE.Mesh(geometry, material)

	const [x, y, z] = Array(3)
		.fill()
		.map(() => THREE.MathUtils.randFloatSpread(100))
	star.position.set(x, y, z)
	scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('./ABSTRACT (12).jpg')
scene.background = spaceTexture

function moveCamera() {
	const t = document.body.getBoundingClientRect().left // Change to horizontal scrolling
	moon.rotation.x += 0.05
	moon.rotation.y += 0.075
	moon.rotation.z += 0.05

	jeff.rotation.y += 0.01
	jeff.rotation.z += 0.01

	camera.position.z = t * -0.01
	camera.position.x = t * -0.002
}

document.body.onscroll = moveCamera

function animate() {
	requestAnimationFrame(animate)

	torus.rotation.x += 0.01
	torus.rotation.y += 0.005
	torus.rotation.z += 0.01
	controls.update()
	renderer.render(scene, camera)
}

animate()

const jeffTexture = new THREE.TextureLoader().load(
	'./photo_2024-06-16_22-52-04 (2).jpg'
)

const jeff = new THREE.Mesh(
	new THREE.BoxGeometry(3, 3, 3),
	new THREE.MeshBasicMaterial({ map: jeffTexture })
)

scene.add(jeff)

const moonTexture = new THREE.TextureLoader().load(
	'./black-white-details-moon-texture-concept (1).jpg'
)

const normalTexture = new THREE.TextureLoader().load('./7493-normal.jpg')

const moon = new THREE.Mesh(
	new THREE.SphereGeometry(3, 32, 32),
	new THREE.MeshStandardMaterial({
		map: moonTexture,
		normalMap: normalTexture,
	})
)

scene.add(moon)
moon.position.z = 30
moon.position.setX(-10)

function handleWheel(event) {
	event.preventDefault()
	document.documentElement.scrollLeft += event.deltaY
}

window.addEventListener('wheel', handleWheel)
