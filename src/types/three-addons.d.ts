declare module "three/examples/jsm/postprocessing/EffectComposer" {
  import { WebGLRenderer, WebGLRenderTarget, Vector2 } from "three";
  import { Pass } from "three/examples/jsm/postprocessing/Pass";

  export class EffectComposer {
    constructor(renderer: WebGLRenderer, renderTarget?: WebGLRenderTarget);
    render(delta?: number): void;
    reset(renderTarget?: WebGLRenderTarget): void;
    setSize(width: number, height: number): void;
    addPass(pass: Pass): void;
    removePass(pass: Pass): void;
    swapBuffers(): void;
    copyPass: Pass | undefined;
    renderTarget1: WebGLRenderTarget;
    renderTarget2: WebGLRenderTarget;
    passes: Pass[];
    writeBuffer: WebGLRenderTarget;
    readBuffer: WebGLRenderTarget;
  }
}

declare module "three/examples/jsm/postprocessing/RenderPass" {
  import { Scene, Camera, Color } from "three";
  import { Pass } from "three/examples/jsm/postprocessing/Pass";

  export class RenderPass extends Pass {
    constructor(scene: Scene, camera: Camera, overrideMaterial?: unknown, clearColor?: Color, clearAlpha?: number);
    scene: Scene;
    camera: Camera;
    overrideMaterial: unknown;
    clearColor: Color | undefined;
    clearAlpha: number;
    clearDepth: boolean;
  }
}

declare module "three/examples/jsm/postprocessing/UnrealBloomPass" {
  import { Vector2, Color } from "three";
  import { Pass } from "three/examples/jsm/postprocessing/Pass";

  export class UnrealBloomPass extends Pass {
    constructor(resolution: Vector2, strength: number, radius: number, threshold: number);
    strength: number;
    radius: number;
    threshold: number;
    resolution: Vector2;
    clearColor: Color;
    renderTargetsHorizontal: unknown[];
    renderTargetsVertical: unknown[];
    nMips: number;
    renderTargetBright: unknown;
    highPassUniforms: Record<string, { value: unknown }>;
    separableBlurMaterials: unknown[];
    compositeMaterial: unknown;
    bloomTintColors: Color[];
    copyUniforms: Record<string, { value: unknown }>;
    materialCopy: unknown;
    needsSwap: boolean;
    oldClearColor: Color;
    oldClearAlpha: number;
    basic: unknown;
    fsQuad: unknown;
  }
}

declare module "three/examples/jsm/postprocessing/ShaderPass" {
  import { ShaderMaterial } from "three";
  import { Pass } from "three/examples/jsm/postprocessing/Pass";

  export class ShaderPass extends Pass {
    constructor(shader: Record<string, unknown>, textureID?: string);
    textureID: string;
    uniforms: Record<string, { value: unknown }>;
    material: ShaderMaterial;
    fsQuad: unknown;
    renderToScreen: boolean;
  }
}

declare module "three/examples/jsm/shaders/CopyShader" {
  export const CopyShader: Record<string, unknown>;
}
