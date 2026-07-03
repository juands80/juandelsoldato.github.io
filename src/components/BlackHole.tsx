"use client";

import { useEffect, useRef } from "react";

export default function BlackHole() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cleanup: (() => void) | undefined;

    const init = async () => {
      try {
        const THREE = await import("three/webgpu");

        const tsl = await import("three/tsl");
        const {
          pass,
          uniform,
          Fn,
          Loop,
          Break,
          If,
          screenUV,
          vec2,
          vec3,
          vec4,
          float,
          length,
          normalize,
          cross,
          dot,
          sin,
          cos,
          atan,
          asin,
          sqrt,
          pow,
          fract,
          clamp,
          smoothstep,
          mix,
          floor,
          step,
          sign,
        } = tsl;

        const { bloom } = await import(
          "three/examples/jsm/tsl/display/BloomNode.js"
        );

        // ====================================================================
        // CONFIG
        // ====================================================================
        const config = {
          blackHoleMass: 0.4,
          diskInnerRadius: 4.1,
          diskOuterRadius: 14.5,
          diskTemperature: 49.78,
          temperatureFalloff: 5.22,
          diskBrightness: 5,
          diskRotationSpeed: -8.7,
          turbulenceScale: 1.81,
          turbulenceStretch: 0.75,
          turbulenceSharpness: 7.4,
          turbulenceCycleTime: 5,
          turbulenceLacunarity: 2.5,
          turbulencePersistence: 0.8,
          diskEdgeSoftnessInner: 0.18,
          diskEdgeSoftnessOuter: 0.5,
          gravitationalLensing: 2.4,
          dopplerStrength: 1.0,
          stepSize: 1,
          starsEnabled: true,
          starDensity: 0.1,
          starSize: 1.2,
          starBrightness: 0.1,
          nebulaEnabled: true,
          nebula1Scale: 2,
          nebula1Density: 0.5,
          nebula1Brightness: 0.01,
          nebula1Color: "#071f44",
          nebula2Scale: 5.5,
          nebula2Density: 0.05,
          nebula2Brightness: 0.21,
          nebula2Color: "#010615",
          bloomStrength: 0.68,
          bloomRadius: 0,
          bloomThreshold: 0.45,
        };

        // ====================================================================
        // SHADER UTILITIES (TSL)
        // ====================================================================
        const hash21 = Fn(([p]: [any]) => {
          const n = sin(dot(p, vec2(127.1, 311.7))).mul(43758.5453);
          return fract(n);
        });

        const hash31 = Fn(([p]: [any]) => {
          const n = sin(dot(p, vec3(127.1, 311.7, 74.7))).mul(43758.5453);
          return fract(n);
        });

        const hash22 = Fn(([p]: [any]) => {
          const px = fract(
            sin(dot(p, vec2(127.1, 311.7))).mul(43758.5453)
          );
          const py = fract(
            sin(dot(p, vec2(269.5, 183.3))).mul(43758.5453)
          );
          return vec2(px, py);
        });

        const noise3D = Fn(([p]: [any]) => {
          const i = floor(p);
          const f = fract(p);
          const u = f
            .mul(f)
            .mul(float(3.0).sub(f.mul(2.0)));
          const a = hash31(i);
          const b = hash31(i.add(vec3(1, 0, 0)));
          const c = hash31(i.add(vec3(0, 1, 0)));
          const d = hash31(i.add(vec3(1, 1, 0)));
          const e = hash31(i.add(vec3(0, 0, 1)));
          const f2 = hash31(i.add(vec3(1, 0, 1)));
          const g = hash31(i.add(vec3(0, 1, 1)));
          const h = hash31(i.add(vec3(1, 1, 1)));
          return mix(
            mix(mix(a, b, u.x), mix(c, d, u.x), u.y),
            mix(mix(e, f2, u.x), mix(g, h, u.x), u.y),
            u.z
          );
        });

        const fbm = Fn(
          ([p, lacunarity, persistence]: [any, any, any]) => {
            const value = float(0.0).toVar();
            const amplitude = float(0.5).toVar();
            const pos = p.toVar();
            value.addAssign(noise3D(pos).mul(amplitude));
            pos.mulAssign(lacunarity);
            amplitude.mulAssign(persistence);
            value.addAssign(noise3D(pos).mul(amplitude));
            pos.mulAssign(lacunarity);
            amplitude.mulAssign(persistence);
            value.addAssign(noise3D(pos).mul(amplitude));
            pos.mulAssign(lacunarity);
            amplitude.mulAssign(persistence);
            value.addAssign(noise3D(pos).mul(amplitude));
            return value;
          }
        );

        const blackbodyColor = Fn(([tempK]: [any]) => {
          const t = clamp(
            tempK.sub(1000.0).div(9000.0),
            float(0.0),
            float(1.0)
          );
          const red = clamp(
            float(1.0).sub(t.sub(0.8).mul(2.0)),
            float(0.5),
            float(1.0)
          );
          const green = smoothstep(float(0.0), float(0.5), t).mul(
            float(1.0).sub(t.sub(0.7).mul(0.3).max(0.0))
          );
          const blue = smoothstep(float(0.3), float(1.0), t).mul(t);
          return vec3(red, green, blue);
        });

        // ====================================================================
        // UNIFORMS
        // ====================================================================
        const u = {
          blackHoleMass: uniform(config.blackHoleMass),
          diskInnerRadius: uniform(config.diskInnerRadius),
          diskOuterRadius: uniform(config.diskOuterRadius),
          diskTemperature: uniform(config.diskTemperature),
          temperatureFalloff: uniform(config.temperatureFalloff),
          diskBrightness: uniform(config.diskBrightness),
          diskRotationSpeed: uniform(config.diskRotationSpeed),
          turbulenceScale: uniform(config.turbulenceScale),
          turbulenceStretch: uniform(config.turbulenceStretch),
          turbulenceSharpness: uniform(config.turbulenceSharpness),
          turbulenceCycleTime: uniform(config.turbulenceCycleTime),
          turbulenceLacunarity: uniform(config.turbulenceLacunarity),
          turbulencePersistence: uniform(config.turbulencePersistence),
          diskEdgeSoftnessInner: uniform(config.diskEdgeSoftnessInner),
          diskEdgeSoftnessOuter: uniform(config.diskEdgeSoftnessOuter),
          gravitationalLensing: uniform(config.gravitationalLensing),
          dopplerStrength: uniform(config.dopplerStrength),
          stepSize: uniform(config.stepSize),
          starsEnabled: uniform(config.starsEnabled ? 1.0 : 0.0),
          starDensity: uniform(config.starDensity),
          starSize: uniform(config.starSize),
          starBrightness: uniform(config.starBrightness),
          nebulaEnabled: uniform(config.nebulaEnabled ? 1.0 : 0.0),
          nebula1Scale: uniform(config.nebula1Scale),
          nebula1Density: uniform(config.nebula1Density),
          nebula1Brightness: uniform(config.nebula1Brightness),
          nebula1Color: uniform(new THREE.Color(config.nebula1Color)) as any,
          nebula2Scale: uniform(config.nebula2Scale),
          nebula2Density: uniform(config.nebula2Density),
          nebula2Brightness: uniform(config.nebula2Brightness),
          nebula2Color: uniform(new THREE.Color(config.nebula2Color)) as any,
          time: uniform(0),
          resolution: uniform(
            new THREE.Vector2(
              mount.clientWidth,
              mount.clientHeight
            )
          ),
          cameraPosition: uniform(
            new THREE.Vector3(0, 5, 20)
          ),
          cameraTarget: uniform(new THREE.Vector3(0, 0, 0)),
        };

        // ====================================================================
        // STAR FIELD
        // ====================================================================
        const starField = Fn(([rayDir]: [any]) => {
          const theta = atan(rayDir.z, rayDir.x);
          const phi = asin(
            clamp(rayDir.y, float(-1.0), float(1.0))
          );
          const gridScale = float(60.0).div(u.starSize);
          const scaledCoord = vec2(theta, phi).mul(gridScale);
          const cell = floor(scaledCoord);
          const cellUV = fract(scaledCoord);
          const cellHash = hash21(cell);
          const starProb = step(
            float(1.0).sub(u.starDensity),
            cellHash
          );
          const starPos = hash22(cell.add(42.0))
            .mul(0.8)
            .add(0.1);
          const distToStar = length(cellUV.sub(starPos));
          const baseSizeVar = hash21(cell.add(100.0))
            .mul(0.03)
            .add(0.01);
          const finalStarSize = baseSizeVar.mul(u.starSize);
          const starCore = smoothstep(
            finalStarSize,
            float(0.0),
            distToStar
          );
          const starGlow = smoothstep(
            finalStarSize.mul(3.0),
            float(0.0),
            distToStar
          ).mul(0.3);
          const starIntensity = starCore.add(starGlow).mul(starProb);
          const colorTemp = hash21(cell.add(200.0));
          const starColor = mix(
            vec3(0.8, 0.9, 1.0),
            vec3(1.0, 0.95, 0.8),
            colorTemp
          );
          return starColor
            .mul(starIntensity)
            .mul(u.starBrightness);
        });

        // ====================================================================
        // NEBULA
        // ====================================================================
        const nebulaField = Fn(([rayDir]: [any]) => {
          const noisePos1 = rayDir.mul(u.nebula1Scale);
          const n1 = fbm(noisePos1, float(2.0), float(0.5))
            .mul(2.0)
            .sub(1.0);
          const layer1 = clamp(
            n1.add(u.nebula1Density),
            float(0.0),
            float(1.0)
          );
          const color1 = u.nebula1Color
            .mul(layer1)
            .mul(u.nebula1Brightness);
          const noisePos2 = rayDir.mul(u.nebula2Scale);
          const n2 = fbm(noisePos2, float(2.0), float(0.5))
            .mul(2.0)
            .sub(1.0);
          const layer2 = clamp(
            n2.add(u.nebula2Density),
            float(0.0),
            float(1.0)
          );
          const color2 = u.nebula2Color
            .mul(layer2)
            .mul(u.nebula2Brightness);
          return color1.add(color2);
        });

        // ====================================================================
        // ACCRETION DISK
        // ====================================================================
        const accretionDiskColor = Fn(
          ([hitR, hitAngle, time, rayDir]: [any, any, any, any]) => {
            const innerR = u.diskInnerRadius;
            const outerR = u.diskOuterRadius;
            const normR = clamp(
              hitR.sub(innerR).div(outerR.sub(innerR)),
              float(0.0),
              float(1.0)
            );

            const peakTempK = u.diskTemperature.mul(1000.0);
            const outerTempK = float(1500.0);
            const tempFalloff = pow(
              innerR.div(hitR),
              u.temperatureFalloff
            );
            const tempK = mix(outerTempK, peakTempK, tempFalloff);
            const diskColor = blackbodyColor(tempK).toVar();

            const rotationSign = sign(u.diskRotationSpeed);
            const velocityDir = vec3(
              sin(hitAngle).negate().mul(rotationSign),
              float(0.0),
              cos(hitAngle).mul(rotationSign)
            );
            const velocityMagnitude = float(1.0).div(
              sqrt(hitR.div(innerR))
            );
            const beta = velocityMagnitude.mul(0.3);
            const cosTheta = dot(velocityDir, rayDir);
            const dopplerFactor = float(1.0).div(
              float(1.0).sub(beta.mul(cosTheta))
            );
            const dopplerBoost = pow(
              dopplerFactor,
              float(3.0).mul(u.dopplerStrength)
            );
            diskColor.mulAssign(
              clamp(dopplerBoost, float(0.1), float(5.0))
            );

            const edgeFalloff = smoothstep(
              float(0.0),
              u.diskEdgeSoftnessInner,
              normR
            ).mul(
              smoothstep(
                float(1.0),
                float(1.0).sub(u.diskEdgeSoftnessOuter),
                normR
              )
            );

            const ringOpacity = float(1.0).toVar();
            const cycleLength = u.turbulenceCycleTime;
            const cyclicTime = time.mod(cycleLength);
            const blendFactor = cyclicTime.div(cycleLength);
            const keplerianPhase1 = cyclicTime
              .mul(u.diskRotationSpeed)
              .div(pow(hitR, float(1.5)));
            const keplerianPhase2 = cyclicTime
              .add(cycleLength)
              .mul(u.diskRotationSpeed)
              .div(pow(hitR, float(1.5)));
            const rotatedAngle1 = hitAngle.add(keplerianPhase1);
            const rotatedAngle2 = hitAngle.add(keplerianPhase2);
            const noiseCoord1 = vec3(
              hitR.mul(u.turbulenceScale),
              cos(rotatedAngle1).div(
                u.turbulenceStretch.max(0.1)
              ),
              sin(rotatedAngle1).div(
                u.turbulenceStretch.max(0.1)
              )
            );
            const noiseCoord2 = vec3(
              hitR.mul(u.turbulenceScale),
              cos(rotatedAngle2).div(
                u.turbulenceStretch.max(0.1)
              ),
              sin(rotatedAngle2).div(
                u.turbulenceStretch.max(0.1)
              )
            );
            const turbulence1 = fbm(
              noiseCoord1,
              u.turbulenceLacunarity,
              u.turbulencePersistence
            );
            const turbulence2 = fbm(
              noiseCoord2,
              u.turbulenceLacunarity,
              u.turbulencePersistence
            );
            const turbulence = mix(turbulence2, turbulence1, blendFactor);
            ringOpacity.assign(
              pow(
                clamp(turbulence, float(0.0), float(1.0)),
                u.turbulenceSharpness
              )
            );

            const finalOpacity = ringOpacity.mul(edgeFalloff);
            const finalColor = diskColor.mul(u.diskBrightness);
            return vec4(finalColor, finalOpacity);
          }
        );

        // ====================================================================
        // MAIN RAYMARCHING SHADER
        // ====================================================================
        const blackHoleShader = Fn(() => {
          const rs = u.blackHoleMass.mul(2.0);
          const uv = screenUV.sub(0.5).mul(2.0);
          const aspect = u.resolution.x.div(u.resolution.y);
          const screenPos = vec2(uv.x.mul(aspect), uv.y);

          const camPos = u.cameraPosition;
          const camTarget = u.cameraTarget;
          const camForward = normalize(camTarget.sub(camPos));
          const worldUp = vec3(0.0, 1.0, 0.0);
          const camRight = normalize(
            cross(worldUp, camForward)
          );
          const camUp = cross(camForward, camRight);

          const fov = float(1.0);
          const rayDir = normalize(
            camForward
              .mul(fov)
              .add(camRight.mul(screenPos.x))
              .add(camUp.mul(screenPos.y))
          ).toVar();

          const rayPos = camPos.toVar();
          const prevPos = camPos.toVar();
          const color = vec3(0.0, 0.0, 0.0).toVar();
          const alpha = float(0.0).toVar();
          const escaped = float(0.0).toVar();
          const captured = float(0.0).toVar();
          const innerR = u.diskInnerRadius;
          const outerR = u.diskOuterRadius;

          Loop(24, () => {
            If(
              escaped
                .greaterThan(0.5)
                .or(captured.greaterThan(0.5))
                .or(alpha.greaterThan(0.99)),
              () => {
                Break();
              }
            );

            const r = length(rayPos);

            If(r.lessThan(rs.mul(1.01)), () => {
              captured.assign(1.0);
              Break();
            });

            If(r.greaterThan(100.0), () => {
              escaped.assign(1.0);
              Break();
            });

            const toCenter = rayPos.negate().div(r);
            const bendStrength = rs
              .div(r.mul(r))
              .mul(u.stepSize)
              .mul(u.gravitationalLensing);
            rayDir.addAssign(toCenter.mul(bendStrength));
            rayDir.assign(normalize(rayDir));

            prevPos.assign(rayPos);
            rayPos.addAssign(rayDir.mul(u.stepSize));

            const crossedPlane = prevPos.y
              .mul(rayPos.y)
              .lessThan(0.0);
            If(
              crossedPlane.and(alpha.lessThan(0.99)),
              () => {
                const t = prevPos.y
                  .negate()
                  .div(rayPos.y.sub(prevPos.y));
                const hitPos = mix(prevPos, rayPos, t);
                const hitR = sqrt(
                  hitPos.x
                    .mul(hitPos.x)
                    .add(hitPos.z.mul(hitPos.z))
                );
                const inDisk = hitR
                  .greaterThan(innerR)
                  .and(hitR.lessThan(outerR));
                If(inDisk, () => {
                  const hitAngle = atan(hitPos.z, hitPos.x);
                  const diskResult = accretionDiskColor(
                    hitR,
                    hitAngle,
                    u.time,
                    rayDir
                  );
                  const remainingAlpha = float(1.0).sub(alpha);
                  color.addAssign(
                    diskResult.xyz
                      .mul(diskResult.w)
                      .mul(remainingAlpha)
                  );
                  alpha.addAssign(
                    remainingAlpha.mul(diskResult.w)
                  );
                });
              }
            );
          });

          If(captured.lessThan(0.5), () => {
            escaped.assign(1.0);
          });

          If(escaped.greaterThan(0.5).and(alpha.lessThan(0.99)), () => {
            const bgColor = vec3(0.0, 0.0, 0.0).toVar();
            If(u.starsEnabled.greaterThan(0.5), () => {
              bgColor.addAssign(starField(rayDir));
            });
            If(u.nebulaEnabled.greaterThan(0.5), () => {
              bgColor.addAssign(nebulaField(rayDir));
            });
            color.addAssign(
              bgColor.mul(float(1.0).sub(alpha))
            );
          });

          const finalColor = pow(color, vec3(1.0 / 2.2));
          return vec4(finalColor, 1.0);
        })();

        // ====================================================================
        // SCENE SETUP
        // ====================================================================
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        const camera = new THREE.PerspectiveCamera(
          60,
          mount.clientWidth / mount.clientHeight,
          0.1,
          1000
        );
        camera.position.set(0, -2, -18);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGPURenderer({
          antialias: true,
        });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setPixelRatio(
          Math.min(window.devicePixelRatio, 1)
        );
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        mount.appendChild(renderer.domElement);

        // Auto-orbit: slowly rotate camera around
        let angle = 0;
        const orbitRadius = 18;

        // Create black hole mesh
        const geometry = new THREE.SphereGeometry(100, 32, 32);
        geometry.scale(-1, 1, 1);
        const material =
          new THREE.MeshBasicNodeMaterial();
        material.colorNode = blackHoleShader;
        const mesh = new THREE.Mesh(geometry, material);
        mesh.frustumCulled = false;
        scene.add(mesh);

        // ====================================================================
        // ANIMATION
        // ====================================================================
        let postProcessing: any = null;
        let lastFrameTime = performance.now();
        let stopped = false;
        let currentStepSize = config.stepSize;

        // Performance monitoring
        const frameBudgets: number[] = [];
        let qualityReduced = false;

        function updateCamera(deltaTime: number) {
          angle += deltaTime * 0.12;
          const cx = Math.sin(angle) * orbitRadius;
          const cz = Math.cos(angle) * orbitRadius;
          camera.position.set(cx, -2, cz);
          camera.lookAt(0, 0, 0);

          u.cameraPosition.value.copy(camera.position);
          const dir = new THREE.Vector3(0, 0, -1);
          dir.applyQuaternion(camera.quaternion);
          const target = camera.position
            .clone()
            .add(dir.multiplyScalar(10));
          u.cameraTarget.value.copy(target);
        }

        function animate() {
          if (stopped) return;
          requestAnimationFrame(animate);
          const currentTime = performance.now();
          const deltaTime = Math.min(
            (currentTime - lastFrameTime) / 1000,
            0.033
          );
          lastFrameTime = currentTime;

          // Adaptive quality: if FPS < 30 for 2s, increase stepSize
          if (!qualityReduced && deltaTime > 0) {
            frameBudgets.push(deltaTime);
            if (frameBudgets.length >= 60) {
              const avgMs = frameBudgets.reduce((a, b) => a + b) / frameBudgets.length * 1000;
              frameBudgets.length = 0;
              if (avgMs > 33) {
                qualityReduced = true;
                currentStepSize = 1.5;
                u.stepSize.value = currentStepSize;
              }
            }
          }

          u.time.value += deltaTime;
          updateCamera(deltaTime);

          if (postProcessing) {
            postProcessing.render();
          } else {
            renderer.render(scene, camera);
          }
        }

        const onResize = () => {
          const w = mount.clientWidth;
          const h = mount.clientHeight;
          if (w === 0 || h === 0) return;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
          u.resolution.value.set(w, h);
        };
        window.addEventListener("resize", onResize);

        await renderer.init();
        postProcessing = new THREE.PostProcessing(renderer);
        const scenePass = pass(scene, camera);
        const scenePassColor = scenePass.getTextureNode();
        const bloomPass = bloom(scenePassColor);
        bloomPass.threshold.value = config.bloomThreshold;
        bloomPass.strength.value = config.bloomStrength;
        bloomPass.radius.value = config.bloomRadius;
        postProcessing.outputNode = scenePassColor.add(bloomPass);
        animate();

        cleanup = () => {
          stopped = true;
          window.removeEventListener("resize", onResize);
          if (mount.contains(renderer.domElement)) {
            mount.removeChild(renderer.domElement);
          }
          renderer.dispose();
        };
      } catch (err) {
        console.error("BlackHole WebGPU init failed:", err);
        cleanup = () => {};
      }
    };

    init();

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 25%, rgba(3,3,10,0.35) 45%, rgba(3,3,10,0.65) 65%, #03030A 85%)",
        }}
      />
    </div>
  );
}
