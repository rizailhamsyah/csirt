"use client";
import { useEffect, useRef, useState } from "react";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

// Dynamic imports untuk Three.js modules - hanya di-load di client-side
let ThreeGlobe: any;
let Color: any;
let Scene: any;
let Fog: any;
let PerspectiveCamera: any;
let Vector3: any;

// Lazy load Three.js modules
async function loadThreeModules() {
  if (typeof window === "undefined") return false;
  
  try {
    const threeModule = await import("three");
    const globeModule = await import("three-globe");
    
    Color = threeModule.Color;
    Scene = threeModule.Scene;
    Fog = threeModule.Fog;
    PerspectiveCamera = threeModule.PerspectiveCamera;
    Vector3 = threeModule.Vector3;
    ThreeGlobe = globeModule.default;
    
    return true;
  } catch (error) {
    console.error("Failed to load Three.js modules:", error);
    return false;
  }
}

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElements["mesh"] & {
      new (): any;
    };
  }
}

// Flag untuk memastikan extend hanya dipanggil sekali
let isExtended = false;
let modulesLoaded = false;

// Function untuk load modules dan extend ThreeGlobe dengan pengecekan WebGL
// Dipanggil hanya setelah WebGL context tersedia
async function ensureExtended() {
  if (isExtended) return true;
  
  if (typeof window === "undefined") return false;
  
  try {
    // Check WebGL availability sebelum extend
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      return false;
    }
    
    // Load Three.js modules jika belum di-load
    if (!modulesLoaded) {
      const loaded = await loadThreeModules();
      if (!loaded) {
        return false;
      }
      modulesLoaded = true;
    }
    
    // Pastikan ThreeGlobe tersedia sebelum extend
    if (!ThreeGlobe) {
      return false;
    }
    
    // Extend ThreeGlobe - ini akan mengakses Three.js constants
    // Pastikan ini dipanggil setelah Three.js fully loaded dan WebGL context tersedia
    extend({ ThreeGlobe: ThreeGlobe });
    isExtended = true;
    return true;
  } catch (error) {
    console.warn("Failed to extend ThreeGlobe:", error);
    // Jika error, coba lagi setelah delay
    if (!isExtended) {
      setTimeout(async () => {
        try {
          if (!modulesLoaded) {
            await loadThreeModules();
            modulesLoaded = true;
          }
          if (ThreeGlobe) {
            extend({ ThreeGlobe: ThreeGlobe });
            isExtended = true;
          }
        } catch (retryError) {
          console.warn("Failed to extend ThreeGlobe on retry:", retryError);
        }
      }, 100);
    }
    return false;
  }
}

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

let numbersOfRings = [0];

export function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<any | null>(null);
  const groupRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  // Initialize globe only once
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Function to initialize globe after ensuring ThreeGlobe is extended
    const initGlobe = async () => {
      if (!isExtended || !modulesLoaded) {
        // Try to extend first and load modules
        const extended = await ensureExtended();
        if (!extended) {
          // If extend failed, retry after a short delay
          setTimeout(initGlobe, 50);
          return;
        }
      }
      
      if (!globeRef.current && groupRef.current && ThreeGlobe) {
        try {
          globeRef.current = new ThreeGlobe();
          (groupRef.current as any).add(globeRef.current);
          setIsInitialized(true);
        } catch (error) {
          console.error("Failed to initialize ThreeGlobe:", error);
          // Retry after delay if initialization failed
          setTimeout(initGlobe, 100);
        }
      }
    };
    
    // Start initialization
    initGlobe();
  }, []);

  // Build material when globe is initialized or when relevant props change
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!globeRef.current || !isInitialized || !Color) return;

    try {
      const globeMaterial = globeRef.current.globeMaterial() as unknown as {
        color: any;
        emissive: any;
        emissiveIntensity: number;
        shininess: number;
      };
      globeMaterial.color = new Color(globeConfig.globeColor);
      globeMaterial.emissive = new Color(globeConfig.emissive);
      globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
      globeMaterial.shininess = globeConfig.shininess || 0.9;
    } catch (error) {
      console.error("Failed to set globe material:", error);
    }
  }, [
    isInitialized,
    globeConfig.globeColor,
    globeConfig.emissive,
    globeConfig.emissiveIntensity,
    globeConfig.shininess,
  ]);

  // Build data when globe is initialized or when data changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!globeRef.current || !isInitialized || !data) return;

    try {
      const arcs = data;
    let points = [];
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      const rgb = hexToRgb(arc.color) as { r: number; g: number; b: number };
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }

    // remove duplicates for same lat and lng
    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) =>
          ["lat", "lng"].every(
            (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"],
          ),
        ) === i,
    );

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.polygonColor);

    // Generate deterministic stroke values based on order property to avoid hydration mismatch
    const strokeValues = [0.32, 0.28, 0.3];
    
    globeRef.current
      .arcsData(data)
      .arcStartLat((d: any) => (d as { startLat: number }).startLat * 1)
      .arcStartLng((d: any) => (d as { startLng: number }).startLng * 1)
      .arcEndLat((d: any) => (d as { endLat: number }).endLat * 1)
      .arcEndLng((d: any) => (d as { endLng: number }).endLng * 1)
      .arcColor((e: any) => (e as { color: string }).color)
      .arcAltitude((e: any) => (e as { arcAlt: number }).arcAlt * 1)
      .arcStroke((e: any) => {
        // Use order property to get deterministic value
        const order = (e as { order: number }).order || 0;
        return strokeValues[order % strokeValues.length];
      })
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((e: any) => (e as { order: number }).order * 1)
      .arcDashGap(15)
      .arcDashAnimateTime(() => defaultProps.arcTime);

    globeRef.current
      .pointsData(filteredPoints)
      .pointColor((e: any) => (e as { color: string }).color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    globeRef.current
      .ringsData([])
      .ringColor(() => defaultProps.polygonColor)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings,
      );
    } catch (error) {
      console.error("Failed to build globe data:", error);
    }
  }, [
    isInitialized,
    data,
    defaultProps.pointSize,
    defaultProps.showAtmosphere,
    defaultProps.atmosphereColor,
    defaultProps.atmosphereAltitude,
    defaultProps.polygonColor,
    defaultProps.arcLength,
    defaultProps.arcTime,
    defaultProps.rings,
    defaultProps.maxRings,
  ]);

  // Handle rings animation with cleanup
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!globeRef.current || !isInitialized || !data) return;

    const interval = setInterval(() => {
      if (!globeRef.current) return;

      try {
        const newNumbersOfRings = genRandomNumbers(
          0,
          data.length,
          Math.floor((data.length * 4) / 5),
        );

        const ringsData = data
          .filter((d, i) => newNumbersOfRings.includes(i))
          .map((d) => ({
            lat: d.startLat,
            lng: d.startLng,
            color: d.color,
          }));

        globeRef.current.ringsData(ringsData);
      } catch (error) {
        console.error("Failed to update rings data:", error);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [isInitialized, data]);

  return <group ref={groupRef} />;
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    if (typeof window === "undefined" || !gl) return;
    
    try {
      gl.setPixelRatio(window.devicePixelRatio || 1);
      gl.setSize(size.width, size.height);
      gl.setClearColor(0xffaaff, 0);
    } catch (error) {
      console.warn("WebGL configuration error:", error);
    }
  }, [gl, size]);

  return null;
}

// Helper function to check WebGL support
function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch (e) {
    return false;
  }
}

export function World(props: WorldProps) {
  const { globeConfig } = props;
  const [webglAvailable, setWebglAvailable] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [modulesReady, setModulesReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const init = async () => {
      setMounted(true);
      
      // Load Three.js modules first
      const loaded = await loadThreeModules();
      if (loaded) {
        setModulesReady(true);
      }
      
      // Ensure ThreeGlobe is extended before checking WebGL
      await ensureExtended();
      
      const available = isWebGLAvailable();
      setWebglAvailable(available);
    };
    
    init();
  }, []);

  // Don't render until mounted and modules are ready
  if (!mounted || !modulesReady) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[400px]">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!webglAvailable) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">WebGL tidak tersedia</p>
        </div>
      </div>
    );
  }

  // Create scene and camera only after WebGL is confirmed available and modules are loaded
  if (!Scene || !Fog || !PerspectiveCamera || !Vector3) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">Memuat modul Three.js...</p>
        </div>
      </div>
    );
  }

  let scene: any;
  let camera: any;
  
  try {
    scene = new Scene();
    scene.fog = new Fog(0xffffff, 400, 2000);
    camera = new PerspectiveCamera(50, aspect, 180, 1800);
  } catch (error) {
    console.error("Failed to create Three.js scene/camera:", error);
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">Gagal memuat globe</p>
        </div>
      </div>
    );
  }
  
  return (
    <Canvas 
      scene={scene} 
      camera={camera}
      gl={{ 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      }}
      onCreated={async ({ gl }) => {
        // Ensure WebGL context is properly initialized
        // Extend ThreeGlobe after Canvas is created and WebGL context is available
        try {
          if (gl && gl.getContext()) {
            await ensureExtended();
          }
        } catch (error) {
          console.error("WebGL context error:", error);
        }
      }}
    >
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={1}
        autoRotate={true}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

export function hexToRgb(hex: string) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}
