import Game from './Game.js'
import {Player} from './Player';




export default class World {
  constructor(scene, resources, camera, config) {
    this.scene     = scene;
    this.resources = resources;
    this.camera    = camera;
    this.config    = config;
    this.resources = resources;
    
    this.player     = new Player(this, camera);
    this.characters = {}
  }
  
  
  
  
  resize() {
  }
  
  
  update() {
  }
  
  
  destroy() {
  }
}
