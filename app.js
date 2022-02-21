function main() {
  // scene camera renderer
  const canvas = document.querySelector("#container");

  const width = canvas.clientWidth;
  const height = canvas.clientHeight
  const aspect = width / height;
  const fov = 75;
  const near = 0.1;
  const far = 2000;

  
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 1;

  const renderer = new THREE.WebGLRenderer({ canvas });

  new THREE.OrbitControls(camera, canvas);

  const scene = new THREE.Scene();
  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    "https://freesvg.org/img/360-Degree-Tree.png",
    () => {
      const renderTarget = new THREE.WebGLCubeRenderTarget(
        texture.image.height
      );
      renderTarget.fromEquirectangularTexture(renderer, texture);
      scene.background = renderTarget.texture;
    }
  );

  const render = () => {
   
    camera.updateProjectionMatrix()
    renderer.setSize(width, height);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
}

main();
