import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import InputController from './InputController';




export class Player {
  constructor(world, camera) {
    this.world      = world;
    this.camera     = camera;
    this.character  = null;
    this.controller = null;
    this.loader     = new GLTFLoader();
    
    this.setPlayer();
    this.init();
    world.player = this;
  }
  
  
  init() {
    this.controller = new InputController(this, this.camera);
    
    
  }
  
  
  setPlayer() {
    this.loader.load(
      '../../assets/models/character/clog.glb',
      (gltf) => {
        this.character = gltf.scene;
        this.character.scale.set(0.1, 0.1, 0.1);
        this.character.position.set(0, 0, 0);
        this.character.rotation.set(0, 0, 0);
        this.character.castShadow    = true;
        this.character.receiveShadow = true;
        this.character.traverse((child) => {
          if (child.isMesh) {
            child.castShadow    = true;
            child.receiveShadow = true;
          }
        });
        this.world.scene.add(this.character);
      },
      (xhr) => {
        console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  
  rotateTo(intersect) {
    let target                = intersect.point;
    target.y                  = this.character.position.y;
    let angle                 = Math.atan2(target.x - this.character.position.x, target.z - this.character.position.z);
    this.character.rotation.y = angle;
  }
  
  
  moveLeft() {
    this.character.rotation.y = -Math.PI / 2;
    this.character.position.x -= 0.1;
    console.log(this.character.position);
  }
  
  
  moveRight() {
    this.character.rotation.y = Math.PI / 2;
    this.character.position.x += 0.1;
    console.log(this.character.position);
  }
  
  
  moveForward() {
    this.character.rotation.y = 0;
    this.character.position.z -= 0.1;
    console.log(this.character.position);
  }
  
  
  moveBackward() {
    this.character.rotation.y = Math.PI;
    this.character.position.z += 0.1;
    console.log(this.character.position);
  }
  
  
  jump() {
    this.character.rotation.y = 5;
    this.character.position.y += 0.1;
    console.log(this.character.position);
  }
  
  
  
  
  update() {
  
  }
  
}
