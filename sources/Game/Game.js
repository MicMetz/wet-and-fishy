import * as THREE from 'three'
import Time from './Utils/Time.js'
import Sizes from './Utils/Sizes.js'
import Resources from './Resources.js'
import Renderer from './Renderer.js'
import Camera from './Camera.js'
import World from './World.js'
import assets from './assets.js'



export default class Game {
  static instance
  
  
  constructor(_options = {}) {
    if (Game.instance) {
      return Game.instance
    }
    Game.instance = this
    
    // Options
    this.targetElement = _options.targetElement
    
    if (!this.targetElement) {
      console.warn('Missing \'targetElement\' property')
      return
    }
    
    this.time  = new Time()
    this.sizes = new Sizes()
    this.setConfig()
    this.setScene()
    this.setCamera()
    this.setRenderer()
    this.setResources()
    this.setWorld()
    
    this.sizes.on('resize', () => {
      this.resize()
    })
    
    this.update()
  }
  
  
  setConfig() {
    this.config = {}
    
    // Pixel ratio
    this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)
    
    // Width and height
    const boundings    = this.targetElement.getBoundingClientRect()
    this.config.width  = boundings.width
    this.config.height = boundings.height || window.innerHeight
  }
  
  
  setScene() {
    this.scene = new THREE.Scene()
  }
  
  
  setCamera() {
    this.camera = new Camera()
  }
  
  
  setRenderer() {
    this.renderer = new Renderer({renderer: this.renderer})
    
    this.targetElement.appendChild(this.renderer.instance.domElement)
  }
  
  
  setResources() {
    this.resources = new Resources(assets)
  }
  
  
  setWorld() {
    this.world = new World(this.scene, this.resources, this.camera, this.renderer)
  }
  
  
  update() {
    
    this.camera.update()
    
    if (this.world) {
      this.world.update()
    }
    
    if (this.renderer) {
      this.renderer.update()
    }
    
    window.requestAnimationFrame(() => {
      this.update()
    })
  }
  
  
  resize() {
    // Config
    const boundings    = this.targetElement.getBoundingClientRect()
    this.config.width  = boundings.width
    this.config.height = boundings.height
    
    this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)
    
    if (this.camera) {
      this.camera.resize()
    }
    
    if (this.renderer) {
      this.renderer.resize()
    }
    
    if (this.world) {
      this.world.resize()
    }
  }
  
  
  destroy() {
  
  }
}
