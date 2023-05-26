// noinspection JSUnresolvedReference

import * as THREE from 'three';




export default class InputController {
  constructor(actor, camera) {
    this.actor     = actor;
    this.camera    = camera;
    this.raycaster = null;
    this.init();
  }
  
  
  init() {
    this._keys     = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      space: false,
      shift: false,
    };
    this.raycaster = new THREE.Raycaster();
    document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
    document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
    document.addEventListener('mouseup', (e) => this._onMouseUp(e), false);
    
  }
  
  
  get keys() {
    return this._keys;
  }
  
  
  set keys(value) {
    this._keys = value;
  }
  
  
  _onKeyDown(event) {
    switch (event.keyCode) {
      case 87: // w
        this._keys.forward = true;
        break;
      case 65: // a
        this._keys.left = true;
        break;
      case 83: // s
        this._keys.backward = true;
        break;
      case 68: // d
        this._keys.right = true;
        break;
      case 32: // SPACE
        this._keys.space = true;
        break;
      case 16: // SHIFT
        this._keys.shift = true;
        break;
    }
  }
  
  
  _onKeyUp(event) {
    switch (event.keyCode) {
      case 87: // w
        this._keys.forward = false;
        break;
      case 65: // a
        this._keys.left = false;
        break;
      case 83: // s
        this._keys.backward = false;
        break;
      case 68: // d
        this._keys.right = false;
        break;
      case 32: // SPACE
        this._keys.space = false;
        break;
      case 16: // SHIFT
        this._keys.shift = false;
        break;
    }
  }
  
  
  _onMouseUp(event) {
    const rect = document.getElementById('game').getBoundingClientRect();
    const pos  = {
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((event.clientY - rect.top) / rect.height) * -2 + 1,
    };
    
    this.raycaster.setFromCamera(pos, this.camera);
    const intersects = this.raycaster.intersectObjects(this.actor.world.scene.children);
    if (intersects.length > 0) {
      const intersect = intersects[0];
      this.actor.rotateTo(intersect);
    }
  }
  
  
  update(delta) {
  
  }
  
  
};

