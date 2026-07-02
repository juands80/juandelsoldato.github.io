"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader";

const vertexShader = [
  "void main() {",
  "  gl_Position = vec4(position, 1.0);",
  "}",
].join("\n");

const TEXTURE_BASE = "/juandelsoldato.github.io/textures/";

const fragmentShader = [
  "#define PI 3.141592653589793238462643383279",
  "#define DEG_TO_RAD (PI/180.0)",
  "#define ROT_Y(a) mat3(1, 0, 0, 0, cos(a), sin(a), 0, -sin(a), cos(a))",
  "#define ROT_Z(a) mat3(cos(a), -sin(a), 0, sin(a), cos(a), 0, 0, 0, 1)",
  "",
  "uniform float time;",
  "uniform vec2 resolution;",
  "",
  "uniform vec3 cam_pos;",
  "uniform vec3 cam_dir;",
  "uniform vec3 cam_up;",
  "uniform float fov;",
  "uniform vec3 cam_vel;",
  "",
  "const float MIN_TEMPERATURE = 1000.0;",
  "const float TEMPERATURE_RANGE = 39000.0;",
  "",
  "uniform bool accretion_disk;",
  "uniform bool use_disk_texture;",
  "const float DISK_IN = 2.0;",
  "const float DISK_WIDTH = 4.0;",
  "",
  "uniform bool doppler_shift;",
  "uniform bool lorentz_transform;",
  "uniform bool beaming;",
  "",
  "uniform sampler2D bg_texture;",
  "uniform sampler2D star_texture;",
  "uniform sampler2D disk_texture;",
  "",
  "vec2 square_frame(vec2 screen_size){",
  "  vec2 position = 2.0 * (gl_FragCoord.xy / screen_size.xy) - 1.0;",
  "  return position;",
  "}",
  "",
  "vec2 to_spherical(vec3 cartesian_coord){",
  "  vec2 uv = vec2(atan(cartesian_coord.z,cartesian_coord.x), asin(cartesian_coord.y));",
  "  uv *= vec2(1.0/(2.0*PI), 1.0/PI);",
  "  uv += 0.5;",
  "  return uv;",
  "}",
  "",
  "vec3 lorentz_transform_velocity(vec3 u, vec3 v){",
  "  float speed = length(v);",
  "  if (speed > 0.0){",
  "    float gamma = 1.0/sqrt(1.0-dot(v,v));",
  "    float denominator = 1.0 - dot(v,u);",
  "    vec3 new_u = (u/gamma - v + (gamma/(gamma+1.0)) * dot(u,v)*v)/denominator;",
  "    return new_u;",
  "  }",
  "  return u;",
  "}",
  "",
  "vec3 temp_to_color(float temp_kelvin){",
  "  vec3 color;",
  "  temp_kelvin = clamp(temp_kelvin, 1000.0, 40000.0) / 100.0;",
  "  if (temp_kelvin <= 66.0){",
  "    color.r = 255.0;",
  "    color.g = temp_kelvin;",
  "    color.g = 99.4708025861 * log(color.g) - 161.1195681661;",
  "    if (color.g < 0.0) color.g = 0.0;",
  "    if (color.g > 255.0)  color.g = 255.0;",
  "  } else {",
  "    color.r = temp_kelvin - 60.0;",
  "    if (color.r < 0.0) color.r = 0.0;",
  "    color.r = 329.698727446 * pow(color.r, -0.1332047592);",
  "    if (color.r < 0.0) color.r = 0.0;",
  "    if (color.g > 255.0) color.r = 255.0;",
  "    color.g = temp_kelvin - 60.0;",
  "    if (color.g < 0.0) color.g = 0.0;",
  "    color.g = 288.1221695283 * pow(color.g, -0.0755148492);",
  "    if (color.g > 255.0)  color.g = 255.0;",
  "  }",
  "  if (temp_kelvin >= 66.0){",
  "    color.b = 255.0;",
  "  } else if (temp_kelvin <= 19.0){",
  "    color.b = 0.0;",
  "  } else {",
  "    color.b = temp_kelvin - 10.0;",
  "    color.b = 138.5177312231 * log(color.b) - 305.0447927307;",
  "    if (color.b < 0.0) color.b = 0.0;",
  "    if (color.b > 255.0) color.b = 255.0;",
  "  }",
  "  color /= 255.0;",
  "  return color;",
  "}",
  "",
  'void main() {',
  "  float uvfov = tan(fov / 2.0 * DEG_TO_RAD);",
  "  vec2 uv = square_frame(resolution);",
  "  uv *= vec2(resolution.x/resolution.y, 1.0);",
  "  vec3 forward = normalize(cam_dir);",
  "  vec3 up = normalize(cam_up);",
  "  vec3 nright = normalize(cross(forward, up));",
  "  up = cross(nright, forward);",
  "  vec3 pixel_pos = cam_pos + forward + nright*uv.x*uvfov + up*uv.y*uvfov;",
  "  vec3 ray_dir = normalize(pixel_pos - cam_pos);",
  "",
  "  if (lorentz_transform)",
  "    ray_dir = lorentz_transform_velocity(ray_dir, cam_vel);",
  "",
  "  vec4 color = vec4(0.0,0.0,0.0,1.0);",
  "",
  "  vec3 point = cam_pos;",
  "  vec3 velocity = ray_dir;",
  "  vec3 c = cross(point,velocity);",
  "  float h2 = dot(c,c);",
  "",
  "  float ray_gamma = 1.0/sqrt(1.0-dot(cam_vel,cam_vel));",
  "  float ray_doppler_factor = ray_gamma * (1.0 + dot(ray_dir, -cam_vel));",
  "",
  "  float ray_intensity = 1.0;",
  "  if (beaming)",
  "    ray_intensity /= pow(ray_doppler_factor, 3.0);",
  "",
  "  vec3 oldpoint;",
  "  float pointsqr;",
  "  float distance = length(point);",
  "",
  "  for (int i=0; i<NSTEPS; i++){",
  "    oldpoint = point;",
  "    point += velocity * STEP;",
  "    vec3 accel = -1.5 * h2 * point / pow(dot(point,point),2.5);",
  "    velocity += accel * STEP;",
  "    distance = length(point);",
  "    if (distance < 0.0) break;",
  "    bool horizon_mask = distance < 1.0 && length(oldpoint) > 1.0;",
  "    if (horizon_mask) {",
  "      vec4 black = vec4(0.0,0.0,0.0,1.0);",
  "      color += black;",
  "      break;",
  "    }",
  "    if (accretion_disk){",
  "      if (oldpoint.y * point.y < 0.0){",
  "        float lambda = -oldpoint.y/velocity.y;",
  "        vec3 intersection = oldpoint + lambda*velocity;",
  "        float r = length(intersection);",
  "        if (DISK_IN <= r && r <= DISK_IN+DISK_WIDTH ){",
  "          float phi = atan(intersection.x, intersection.z);",
  "          vec3 disk_velocity = vec3(-intersection.x, 0.0, intersection.z)/sqrt(2.0*(r-1.0))/(r*r);",
  "          phi -= time;",
  "          phi = mod(phi, PI*2.0);",
  "          float disk_gamma = 1.0/sqrt(1.0-dot(disk_velocity, disk_velocity));",
  "          float disk_doppler_factor = disk_gamma*(1.0+dot(ray_dir/distance, disk_velocity));",
  "          if (use_disk_texture){",
  "            vec2 tex_coord = vec2(mod(phi,2.0*PI)/(2.0*PI),1.0-(r-DISK_IN)/(DISK_WIDTH));",
  "            vec4 disk_color = texture2D(disk_texture, tex_coord) / (ray_doppler_factor * disk_doppler_factor);",
  "            float disk_alpha = clamp(dot(disk_color,disk_color)/4.5,0.0,1.0);",
  "            if (beaming)",
  "              disk_alpha /= pow(disk_doppler_factor,3.0);",
  "            color += vec4(disk_color)*disk_alpha;",
  "          } else {",
  "            float disk_temperature = 10000.0*(pow(r/DISK_IN, -3.0/4.0));",
  "            if (doppler_shift)",
  "              disk_temperature /= ray_doppler_factor*disk_doppler_factor;",
  "            vec3 disk_color = temp_to_color(disk_temperature);",
  "            float disk_alpha = clamp(dot(disk_color,disk_color)/3.0,0.0,1.0);",
  "            if (beaming)",
  "              disk_alpha /= pow(disk_doppler_factor,3.0);",
  "            color += vec4(disk_color, 1.0)*disk_alpha;",
  "          }",
  "        }",
  "      }",
  "    }",
  "  }",
  "",
  "  if (distance > 1.0){",
  "    ray_dir = normalize(point - oldpoint);",
  "    vec2 tex_coord = to_spherical(ray_dir * ROT_Z(45.0 * DEG_TO_RAD));",
  "    vec4 star_color = texture2D(star_texture, tex_coord);",
  "    if (star_color.g > 0.0){",
  "      float star_temperature = (MIN_TEMPERATURE + TEMPERATURE_RANGE*star_color.r);",
  "      float star_velocity = star_color.b - 0.5;",
  "      float star_doppler_factor = sqrt((1.0+star_velocity)/(1.0-star_velocity));",
  "      if (doppler_shift)",
  "        star_temperature /= ray_doppler_factor*star_doppler_factor;",
  "      color += vec4(temp_to_color(star_temperature),1.0)* star_color.g;",
  "    }",
  "    color += texture2D(bg_texture, tex_coord) * 0.25;",
  "  }",
  "  gl_FragColor = color*ray_intensity;",
  "}",
].join("\n");

export default function BlackHole() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cleanup: (() => void) | undefined;

    const init = async () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setClearColor(0x03030a, 1);
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const dummyCam = new THREE.Camera();
      dummyCam.position.z = 1;

      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, dummyCam));
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(w, h),
        0.6,
        2.0,
        0.0
      );
      composer.addPass(bloomPass);
      const copyPass = new ShaderPass(CopyShader);
      copyPass.renderToScreen = true;
      composer.addPass(copyPass);

      const loader = new THREE.TextureLoader();

      const loadTex = (
        name: string,
        filter: THREE.MagnificationTextureFilter | THREE.MinificationTextureFilter
      ): Promise<THREE.Texture> =>
        new Promise((resolve) => {
          const tex = loader.load(TEXTURE_BASE + name, () => resolve(tex));
          tex.magFilter = filter as THREE.MagnificationTextureFilter;
          tex.minFilter = filter as THREE.MinificationTextureFilter;
          tex.wrapS = THREE.ClampToEdgeWrapping;
          tex.wrapT = THREE.ClampToEdgeWrapping;
        });

      const [bgTexture, starTexture, diskTexture] = await Promise.all([
        loadTex("milkyway.jpg", THREE.NearestFilter),
        loadTex("star_noise.png", THREE.LinearFilter),
        loadTex("accretion_disk.png", THREE.LinearFilter),
      ]);

      let animId: number;
      let lastTime = performance.now();
      let theta = 0;
      let ow = 0;
      const ORBIT_R = 8;
      const INC = -5 * Math.PI / 180;
      const MAX_W =
        1 / Math.sqrt(2.0 * (ORBIT_R - 1.0)) / ORBIT_R;

      const uniforms = {
        time: { value: 0.0 },
        resolution: { value: new THREE.Vector2(w, h) },
        cam_pos: { value: new THREE.Vector3() },
        cam_dir: { value: new THREE.Vector3() },
        cam_up: { value: new THREE.Vector3() },
        cam_vel: { value: new THREE.Vector3() },
        fov: { value: 60.0 },
        accretion_disk: { value: true },
        use_disk_texture: { value: true },
        lorentz_transform: { value: true },
        doppler_shift: { value: true },
        beaming: { value: true },
        bg_texture: { value: bgTexture },
        star_texture: { value: starTexture },
        disk_texture: { value: diskTexture },
      };

      const defines = "#define STEP 0.05\n#define NSTEPS 600\n";
      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader: defines + fragmentShader,
      });

      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        material
      );
      scene.add(mesh);

      let isDragging = false;
      let lastMX = 0;
      let lastMY = 0;
      let pitch = 0;
      let yaw = 0;
      let ox = 0;
      let oy = 0;

      const onDown = (e: MouseEvent) => {
        isDragging = true;
        lastMX = e.clientX;
        lastMY = e.clientY;
      };
      const onMove = (e: MouseEvent) => {
        if (!isDragging) return;
        ox += e.clientX - lastMX;
        oy += e.clientY - lastMY;
        lastMX = e.clientX;
        lastMY = e.clientY;
      };
      const onUp = () => {
        isDragging = false;
      };

      renderer.domElement.addEventListener("mousedown", onDown);
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);

      const onResize = () => {
        const nw = mount.clientWidth;
        const nh = mount.clientHeight;
        if (nw === 0 || nh === 0) return;
        renderer.setSize(nw, nh);
        composer.setSize(nw, nh);
        uniforms.resolution.value.set(nw, nh);
      };
      window.addEventListener("resize", onResize);

      const loop = (now: number) => {
        const delta = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;

        if (ow < MAX_W) ow += delta / ORBIT_R;
        else ow = MAX_W;
        theta += ow * delta;

        const cos = Math.cos(theta);
        const sin = Math.sin(theta);
        const pos = new THREE.Vector3(
          ORBIT_R * sin,
          0,
          ORBIT_R * cos
        );
        const vel = new THREE.Vector3(
          cos * ow,
          0,
          -sin * ow
        );
        const incMat = new THREE.Matrix4().makeRotationX(INC);
        pos.applyMatrix4(incMat);
        vel.applyMatrix4(incMat);

        yaw += ox * 0.003;
        ox *= 0.85;
        pitch += oy * 0.003;
        pitch = Math.max(
          -Math.PI / 2.1,
          Math.min(Math.PI / 2.1, pitch)
        );
        oy *= 0.85;

        const toward = new THREE.Vector3()
          .copy(pos)
          .negate()
          .normalize();
        const right = new THREE.Vector3()
          .crossVectors(toward, new THREE.Vector3(0, 1, 0))
          .normalize();
        const up = new THREE.Vector3().crossVectors(
          right,
          toward
        );
        const dir = new THREE.Vector3()
          .copy(toward)
          .applyAxisAngle(right, pitch)
          .applyAxisAngle(up, yaw);

        uniforms.time.value = now / 1000;
        uniforms.cam_pos.value.copy(pos);
        uniforms.cam_vel.value.copy(vel);
        uniforms.cam_dir.value.copy(dir);
        uniforms.cam_up.value.copy(up);

        composer.render();
        animId = requestAnimationFrame(loop);
      };

      animId = requestAnimationFrame(loop);

      cleanup = () => {
        cancelAnimationFrame(animId);
        renderer.domElement.removeEventListener("mousedown", onDown);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
        window.removeEventListener("resize", onResize);
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    };

    init().catch(console.error);

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full pointer-events-none">
      <div
        className="relative pointer-events-auto"
        style={{
          width: "70vw",
          maxWidth: 900,
          aspectRatio: "1.4 / 1",
        }}
      >
        <div
          ref={mountRef}
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}
