import * as THREE from 'three';




export const getIntersectionsController = (camera, position) => {
  const raycaster    = new THREE.Raycaster();
  const tempMatrix   = new THREE.Matrix4();
  const objectsArray = [];
  
  tempMatrix.identity().extractRotation(camera.matrixWorld);
  raycaster.ray.origin.setFromMatrixPosition(camera.matrixWorld);
  raycaster.ray.direction.set(new THREE.Vector3(position).applyMatrix4(tempMatrix).normalize());
  return raycaster.intersectObjects(objectsArray);
}




export const getIntersectionsObject = (object, x, y, z) => {
  const raycaster    = new THREE.Raycaster();
  const objectsArray = [];
  
  let origin = new THREE.Vector3;
  origin.copy(object.position);
  let direction = new THREE.Vector3(x, y, z);
  direction.normalize();
  
  raycaster.set(origin, direction);
  return raycaster.intersectObjects(objectsArray);
}
