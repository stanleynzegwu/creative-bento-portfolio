import gsap from "gsap";

export const animateToObject = (camera, controls) => {
  //     controls.enabled = false;
  const timeline = gsap.timeline();

  const mm = gsap.matchMedia();

  mm.add(
    {
      // Define breakpoints
      isSmall: "(max-width: 600px)",
      isMedium: "(min-width: 601px) and (max-width: 1200px)",
      isLarge: "(min-width: 1201px)"
    },
    (context) => {
      const { isSmall, isMedium, isLarge } = context.conditions;

      let targetZ;

      // if (isSmall) {
      //   targetZ = 80; // Example value for small screens
      // } else if (isMedium) {
      //   targetZ = 70; // Example value for medium screens
      // } else if (isLarge) {
      //   targetZ = 50; // Example value for large screens
      // }
      if (isSmall) {
        targetZ = camera.position.z - 70; // Example value for small screens
      } else if (isMedium) {
        targetZ = camera.position.z - 60; // Example value for medium screens
      } else if (isLarge) {
        targetZ = camera.position.z - 50; // Example value for large screens
      }

      timeline.to(camera.position, {
        duration: 1,
        z: targetZ,
        ease: "linear"
      });

      timeline.play();

      return () => {
        // Clean up if needed
      };
    }
  );
};

export const animateOutFromObject = (camera) => {
  const timeline = gsap.timeline();

  const mm = gsap.matchMedia();

  mm.add(
    {
      // Define breakpoints
      isSmall: "(max-width: 600px)",
      isMedium: "(min-width: 601px) and (max-width: 1200px)",
      isLarge: "(min-width: 1201px)"
    },
    (context) => {
      const { isSmall, isMedium, isLarge } = context.conditions;

      let targetZ;

      // if (isSmall) {
      //   targetZ = 80; // Example value for small screens
      // } else if (isMedium) {
      //   targetZ = 70; // Example value for medium screens
      // } else if (isLarge) {
      //   targetZ = 50; // Example value for large screens
      // }
      if (isSmall) {
        targetZ = camera.position.z + 70; // Example value for small screens
      } else if (isMedium) {
        targetZ = camera.position.z + 60; // Example value for medium screens
      } else if (isLarge) {
        targetZ = camera.position.z + 50; // Example value for large screens
      }

      timeline.to(camera.position, {
        duration: 1,
        z: targetZ,
        ease: "linear"
      });

      timeline.play();

      return () => {
        // Clean up if needed
      };
    }
  );
};

export const handleSceneChange = (nextScene,currentScene,updatCurrentAboutScene) => {
  const fadeOutElement = currentScene === "ocean" ? ".ocean-scene" : ".view360-scene";
  const fadeInElement = nextScene === "ocean" ? ".ocean-scene" : ".view360-scene";

  gsap.to(fadeOutElement, {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      updatCurrentAboutScene(nextScene);
      gsap.to(fadeInElement, { opacity: 1, duration: 1 });
    },
  });
};

///////////////////////////////////////////////////////////////////
import * as THREE from 'three'
import { extend } from '@react-three/fiber'

// Paul West @prisoner849 https://discourse.threejs.org/u/prisoner849
// https://discourse.threejs.org/t/simple-curved-plane/26647/10
class BentPlaneGeometry extends THREE.PlaneGeometry {
  constructor(radius, ...args) {
    super(...args)
    let p = this.parameters
    let hw = p.width * 0.5
    let a = new THREE.Vector2(-hw, 0)
    let b = new THREE.Vector2(0, radius)
    let c = new THREE.Vector2(hw, 0)
    let ab = new THREE.Vector2().subVectors(a, b)
    let bc = new THREE.Vector2().subVectors(b, c)
    let ac = new THREE.Vector2().subVectors(a, c)
    let r = (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac)))
    let center = new THREE.Vector2(0, radius - r)
    let baseV = new THREE.Vector2().subVectors(a, center)
    let baseAngle = baseV.angle() - Math.PI * 0.5
    let arc = baseAngle * 2
    let uv = this.attributes.uv
    let pos = this.attributes.position
    let mainV = new THREE.Vector2()
    for (let i = 0; i < uv.count; i++) {
      let uvRatio = 1 - uv.getX(i)
      let y = pos.getY(i)
      mainV.copy(c).rotateAround(center, arc * uvRatio)
      pos.setXYZ(i, mainV.x, y, -mainV.y)
    }
    pos.needsUpdate = true
  }
}

class MeshSineMaterial extends THREE.MeshBasicMaterial {
  constructor(parameters = {}) {
    super(parameters)
    this.setValues(parameters)
    this.time = { value: 0 }
  }
  onBeforeCompile(shader) {
    shader.uniforms.time = this.time
    shader.vertexShader = `
      uniform float time;
      ${shader.vertexShader}
    `
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `vec3 transformed = vec3(position.x, position.y + sin(time + uv.x * PI * 4.0) / 4.0, position.z);`
    )
  }
}

extend({ MeshSineMaterial, BentPlaneGeometry })


//////////////////////
/**  This material is use to flip the texture because i'm using Doubleside*/
import { ShaderMaterial, DoubleSide } from "three";

class FlipMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        map: { value: null },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        varying vec2 vUv;
        void main() {
          gl_FragColor = texture2D(map, vec2(1.0 - vUv.x, vUv.y));
        }
      `,
      side: DoubleSide,
    });
  }

  set map(value) {
    this.uniforms.map.value = value;
  }
}

extend({ FlipMaterial });
