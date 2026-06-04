'use client';

import { useEffect, useRef } from 'react';
import CompositionIcon from '@/components/shapes/compositions/CompositionIcon';

type CompositionVariant = 'stacked-circles' | 'stacked-diamonds' | 'stacked-hexagons';

/**
 * Tweakable look of the silk wallpaper. Mirrors the CONFIG object from the
 * original Claude-design HTML prototype. All optional — sensible defaults below.
 */
export interface SilkConfig {
  /** colour of the dark silk ribbons (RGB 0–1) */
  veins?: [number, number, number];
  /** contrast band [low, high] — smaller gap = sharper veins */
  edges?: [number, number];
  /** overall brightness (higher = more yellow) */
  bias?: number;
  /** pattern scale (higher = smaller shapes) */
  freq?: number;
  /** centre glow strength */
  glow?: number;
  /** flow speed */
  speed?: number;
  /** internal render scale (lower = faster + softer) */
  blurScale?: number;
}

interface SilkBackgroundProps {
  /** Brand shape rendered centred on top of the silk (kept from AnimatedVisual). */
  composition: CompositionVariant;
  /** Icon size in px. */
  size?: number;
  /** Override any part of the look. */
  config?: SilkConfig;
  /** Set false to make the silk purely decorative (no mouse reaction). */
  interactive?: boolean;
}

const DEFAULT_CONFIG: Required<SilkConfig> = {
  veins: [0.09, 0.11, 0.0],
  edges: [0.28, 0.8],
  bias: 0.2,
  freq: 1.28,
  glow: 0.22,
  speed: 0.1,
  blurScale: 0.45,
};

const YELLOW: [number, number, number] = [0.937, 1.0, 0.0]; // #EFFF00
const FALLBACK_BG =
  'radial-gradient(120% 120% at 50% 35%, #EFFF00, #8f9900 55%, #2a2d00 100%)';

const VERT = `attribute vec2 a_pos; void main(){ gl_Position=vec4(a_pos,0.,1.); }`;
const FRAG = `precision mediump float;
uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse; uniform float u_inside; uniform vec3 u_rip[3];
uniform vec3 u_veins; uniform vec3 u_yellow; uniform vec2 u_edges; uniform float u_bias; uniform float u_freq; uniform float u_glow;
float hash21(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
float vnoise(vec2 p){ vec2 i=floor(p),f=fract(p);
  float a=hash21(i),b=hash21(i+vec2(1.,0.)),c=hash21(i+vec2(0.,1.)),d=hash21(i+vec2(1.,1.));
  vec2 u=f*f*(3.-2.*f); return mix(mix(a,b,u.x),mix(c,d,u.x),u.y); }
float fbm(vec2 p){ float v=0.,a=.5; for(int i=0;i<3;i++){ v+=a*vnoise(p); p=p*2.0+vec2(1.7,9.2); a*=.5; } return v; }
void main(){
  vec2 p=(gl_FragCoord.xy-0.5*u_res)/u_res.y;
  p*=u_freq;
  vec2 m=(u_mouse-0.5*u_res)/u_res.y;
  float t=u_time;
  vec2 toM=p-m;
  float infl=u_inside>0.5?exp(-dot(toM,toM)*2.0):0.0;
  vec2 q=vec2(fbm(p+vec2(0.0,t)), fbm(p+vec2(3.2,1.3)-t));
  vec2 r=vec2(fbm(p+1.6*q+infl*toM*1.5+t*0.8),
              fbm(p+1.6*q+vec2(4.3,2.8)-t*0.7));
  float f=fbm(p+2.2*r);
  for(int i=0;i<3;i++){ vec3 rr=u_rip[i]; if(rr.z<0.0) continue;
    vec2 rp=(rr.xy-0.5*u_res)/u_res.y; float d=length(p-rp);
    f+=sin(d*5.0-rr.z*4.5)*exp(-d*2.2)*exp(-rr.z*0.9)*0.40; }
  float v=clamp(f*1.05+u_bias,0.0,1.0);
  vec3 col=mix(u_veins,u_yellow,smoothstep(u_edges.x,u_edges.y,v));
  float rad=1.0-smoothstep(0.0,1.2,length(p));
  col=mix(col,u_yellow,rad*u_glow+infl*0.30);
  col*=0.92+0.08*rad;
  gl_FragColor=vec4(col,1.0);
}`;

const MAX_RIP = 3;
const RIP_LIFE = 2.8;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
  }
  return s;
}

/**
 * Mounts the WebGL silk into `host`. Returns a cleanup fn that tears down all
 * listeners, observers and the animation loop (important under React unmounts).
 */
function initSilk(host: HTMLElement, cfg: Required<SilkConfig>, interactive: boolean) {
  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, {
    display: 'block',
    width: '100%',
    height: '100%',
    filter: 'blur(2px) saturate(1.08)',
    transform: 'scale(1.06)',
    transformOrigin: 'center',
  } as Partial<CSSStyleDeclaration>);
  host.appendChild(canvas);

  const gl = canvas.getContext('webgl', {
    antialias: false,
    alpha: false,
    depth: false,
    powerPreference: 'low-power',
  });
  if (!gl) {
    canvas.remove();
    host.style.background = FALLBACK_BG;
    return () => {};
  }

  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const U: Record<string, WebGLUniformLocation | null> = {};
  [
    'u_res', 'u_time', 'u_mouse', 'u_inside', 'u_rip',
    'u_veins', 'u_yellow', 'u_edges', 'u_bias', 'u_freq', 'u_glow',
  ].forEach((n) => (U[n] = gl.getUniformLocation(prog, n)));

  gl.uniform3fv(U.u_veins, cfg.veins);
  gl.uniform3fv(U.u_yellow, YELLOW);
  gl.uniform2fv(U.u_edges, cfg.edges);
  gl.uniform1f(U.u_bias, cfg.bias);
  gl.uniform1f(U.u_freq, cfg.freq);
  gl.uniform1f(U.u_glow, cfg.glow);

  const st = {
    mouse: [0, 0],
    mouseT: [0, 0],
    inside: 0,
    insideT: 0,
    ripples: [] as { x: number; y: number; t: number }[],
    ripBuf: new Float32Array(MAX_RIP * 3),
  };

  function resize() {
    const w = Math.max(1, Math.round(host.clientWidth * cfg.blurScale));
    const h = Math.max(1, Math.round(host.clientHeight * cfg.blurScale));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();
  st.mouse = [canvas.width * 0.5, canvas.height * 0.55];
  st.mouseT = st.mouse.slice();

  function setM(e: PointerEvent) {
    const r = canvas.getBoundingClientRect();
    st.mouseT[0] = ((e.clientX - r.left) / r.width) * canvas.width;
    st.mouseT[1] = ((r.height - (e.clientY - r.top)) / r.height) * canvas.height;
  }
  // Click-only interaction: a ripple impulse on pointer-down. The cursor-follow
  // warp was removed — it lerped toward the pointer, which read as visible lag.
  const onDown = (e: PointerEvent) => {
    setM(e);
    st.ripples.push({ x: st.mouseT[0], y: st.mouseT[1], t: performance.now() / 1000 });
    if (st.ripples.length > MAX_RIP) st.ripples.shift();
  };
  if (interactive) {
    host.addEventListener('pointerdown', onDown);
  }

  let visible = true;
  const io = new IntersectionObserver(
    (es) => { visible = es[0].isIntersecting; if (visible) loop(); },
    { threshold: 0.01 }
  );
  io.observe(host);

  const start = performance.now() / 1000;
  let running = false;
  let lastRaf = 0;
  let rafId = 0;

  function render() {
    const now = performance.now() / 1000;
    st.mouse[0] += (st.mouseT[0] - st.mouse[0]) * 0.1;
    st.mouse[1] += (st.mouseT[1] - st.mouse[1]) * 0.1;
    st.inside += (st.insideT - st.inside) * 0.06;
    st.ripples = st.ripples.filter((r) => now - r.t < RIP_LIFE);
    st.ripBuf.fill(0);
    for (let i = 0; i < MAX_RIP; i++) {
      if (i < st.ripples.length) {
        const r = st.ripples[i];
        st.ripBuf[i * 3] = r.x;
        st.ripBuf[i * 3 + 1] = r.y;
        st.ripBuf[i * 3 + 2] = now - r.t;
      } else {
        st.ripBuf[i * 3 + 2] = -1;
      }
    }
    gl!.useProgram(prog);
    gl!.viewport(0, 0, canvas.width, canvas.height);
    gl!.uniform2f(U.u_res, canvas.width, canvas.height);
    gl!.uniform1f(U.u_time, (now - start) * cfg.speed);
    gl!.uniform2f(U.u_mouse, st.mouse[0], st.mouse[1]);
    gl!.uniform1f(U.u_inside, st.inside);
    gl!.uniform3fv(U.u_rip, st.ripBuf);
    gl!.drawArrays(gl!.TRIANGLES, 0, 3);
  }
  function loop() {
    if (running) return;
    running = true;
    tick();
  }
  function tick() {
    if (!visible) { running = false; return; }
    lastRaf = performance.now();
    render();
    rafId = requestAnimationFrame(tick);
  }
  // keep the silk gently alive even if rAF is throttled
  const keepAlive = setInterval(() => {
    if (visible && performance.now() - lastRaf > 200) render();
  }, 80);
  loop();

  return () => {
    cancelAnimationFrame(rafId);
    clearInterval(keepAlive);
    ro.disconnect();
    io.disconnect();
    if (interactive) {
      host.removeEventListener('pointerdown', onDown);
    }
    canvas.remove();
  };
}

export default function SilkBackground({
  composition,
  size = 96,
  config,
  interactive = true,
}: SilkBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  // Stable JSON key so the effect re-inits only when the look actually changes.
  const cfg: Required<SilkConfig> = { ...DEFAULT_CONFIG, ...config };
  const cfgKey = JSON.stringify(cfg) + interactive;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    return initSilk(host, cfg, interactive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cfgKey]);

  return (
    <div className="absolute inset-0">
      <div
        ref={hostRef}
        className="absolute inset-0 z-0 overflow-hidden [border-radius:inherit]"
        style={interactive ? undefined : { pointerEvents: 'none' }}
      />
      <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <CompositionIcon composition={composition} size={size} variant="light" />
      </div>
    </div>
  );
}
