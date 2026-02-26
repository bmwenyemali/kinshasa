"use client";

import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { LieuType } from "@kinservices/api";
import {
  communeBoundaries,
  getCommuneCentroid,
  type CommuneFeature,
} from "@/data/kinshasa-communes";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

interface Lieu {
  id: string;
  nom: string;
  type: LieuType;
  latitude: number | null;
  longitude: number | null;
  adresse: string | null;
  verified: boolean;
  commune?: { name: string } | null;
}

interface Viewport {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface MapboxMapProps {
  lieux: Lieu[];
  viewport: Viewport;
  onViewportChange: (viewport: Viewport) => void;
  onMarkerClick: (lieu: Lieu) => void;
  selectedLieuId?: string;
  showBoundaries?: boolean;
  onCommuneClick?: (communeName: string) => void;
}

const typeColors: Record<LieuType, string> = {
  HOPITAL: "#EF4444",
  CLINIQUE: "#F87171",
  CENTRE_SANTE: "#FB923C",
  ADMINISTRATION: "#3B82F6",
  MAIRIE: "#2563EB",
  COMMISSARIAT: "#6366F1",
  TRIBUNAL: "#8B5CF6",
  ECOLE: "#10B981",
  UNIVERSITE: "#059669",
  AUTRE: "#6B7280",
};

const typeEmojis: Record<LieuType, string> = {
  HOPITAL: "🏥",
  CLINIQUE: "🏨",
  CENTRE_SANTE: "🏪",
  ADMINISTRATION: "🏛️",
  MAIRIE: "🏢",
  COMMISSARIAT: "👮",
  TRIBUNAL: "⚖️",
  ECOLE: "🏫",
  UNIVERSITE: "🎓",
  AUTRE: "📍",
};

export default function MapboxMap({
  lieux,
  viewport,
  onViewportChange,
  onMarkerClick,
  selectedLieuId,
  showBoundaries = true,
  onCommuneClick,
}: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const hoveredCommuneRef = useRef<string | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [viewport.longitude, viewport.latitude],
      zoom: viewport.zoom,
      minZoom: 9,
      maxZoom: 18,
      maxBounds: [
        [14.8, -4.65],
        [16.2, -4.05],
      ],
    });

    const m = map.current;

    m.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "bottom-right",
    );

    m.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      "bottom-right",
    );

    m.addControl(new mapboxgl.ScaleControl({ maxWidth: 120 }), "bottom-left");

    // On map load, add commune boundaries
    m.on("load", () => {
      if (!m) return;

      // Add commune boundary data with IDs for hover state
      const dataWithIds = {
        ...communeBoundaries,
        features: communeBoundaries.features.map(
          (f: CommuneFeature, i: number) => ({
            ...f,
            id: i,
          }),
        ),
      };

      m.addSource("communes", {
        type: "geojson",
        data: dataWithIds as unknown as GeoJSON.FeatureCollection,
      });

      // Fill layer — transparent by default, subtle on hover
      m.addLayer({
        id: "communes-fill",
        type: "fill",
        source: "communes",
        paint: {
          "fill-color": "#94a3b8",
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.08,
            0,
          ],
        },
      });

      // Border line layer — thin neutral lines
      m.addLayer({
        id: "communes-border",
        type: "line",
        source: "communes",
        paint: {
          "line-color": "#64748b",
          "line-width": [
            "interpolate",
            ["linear"],
            ["zoom"],
            9,
            0.6,
            12,
            1.2,
            15,
            1.8,
          ],
          "line-opacity": 0.55,
        },
      });

      // Labels source
      const labelFeatures = communeBoundaries.features.map(
        (f: CommuneFeature) => {
          const center = getCommuneCentroid(f);
          return {
            type: "Feature" as const,
            properties: { name: f.properties.name },
            geometry: { type: "Point" as const, coordinates: center },
          };
        },
      );

      m.addSource("commune-labels", {
        type: "geojson",
        data: { type: "FeatureCollection", features: labelFeatures },
      });

      m.addLayer({
        id: "commune-label-text",
        type: "symbol",
        source: "commune-labels",
        layout: {
          "text-field": ["get", "name"],
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            9,
            10,
            12,
            14,
            15,
            16,
          ],
          "text-font": ["DIN Pro Bold", "Arial Unicode MS Bold"],
          "text-transform": "uppercase",
          "text-letter-spacing": 0.05,
          "text-allow-overlap": false,
          "text-ignore-placement": false,
        },
        paint: {
          "text-color": "#1a2b3c",
          "text-halo-color": "rgba(255,255,255,0.9)",
          "text-halo-width": 2,
          "text-opacity": ["interpolate", ["linear"], ["zoom"], 9, 0.7, 12, 1],
        },
      });

      // Hover interaction
      let hoveredId: number | null = null;

      m.on("mousemove", "communes-fill", (e) => {
        if (!e.features || e.features.length === 0) return;
        m.getCanvas().style.cursor = "pointer";

        if (hoveredId !== null) {
          m.setFeatureState(
            { source: "communes", id: hoveredId },
            { hover: false },
          );
        }
        hoveredId = e.features[0].id as number;
        m.setFeatureState(
          { source: "communes", id: hoveredId },
          { hover: true },
        );

        const name = e.features[0].properties?.name;
        if (name && name !== hoveredCommuneRef.current) {
          hoveredCommuneRef.current = name;
          if (popupRef.current) popupRef.current.remove();
          popupRef.current = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            className: "commune-popup",
            offset: 10,
          })
            .setLngLat(e.lngLat)
            .setHTML(
              `<div style="padding:6px 12px;font-weight:600;font-size:13px;color:#1a2b3c;">${name}</div>`,
            )
            .addTo(m);
        } else if (popupRef.current) {
          popupRef.current.setLngLat(e.lngLat);
        }
      });

      m.on("mouseleave", "communes-fill", () => {
        m.getCanvas().style.cursor = "";
        if (hoveredId !== null) {
          m.setFeatureState(
            { source: "communes", id: hoveredId },
            { hover: false },
          );
          hoveredId = null;
        }
        hoveredCommuneRef.current = null;
        if (popupRef.current) {
          popupRef.current.remove();
          popupRef.current = null;
        }
      });

      m.on("click", "communes-fill", (e) => {
        if (!e.features || e.features.length === 0) return;
        const name = e.features[0].properties?.name;
        if (name && onCommuneClick) onCommuneClick(name);
      });
    });

    // Track viewport moves
    m.on("moveend", () => {
      if (!m) return;
      const center = m.getCenter();
      onViewportChange({
        latitude: center.lat,
        longitude: center.lng,
        zoom: m.getZoom(),
      });
    });

    return () => {
      m?.remove();
      map.current = null;
    };
  }, []);

  // Toggle boundary visibility
  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return;
    const visibility = showBoundaries ? "visible" : "none";
    try {
      map.current.setLayoutProperty("communes-fill", "visibility", visibility);
      map.current.setLayoutProperty(
        "communes-border",
        "visibility",
        visibility,
      );
      map.current.setLayoutProperty(
        "commune-label-text",
        "visibility",
        visibility,
      );
    } catch {
      // layers not yet added
    }
  }, [showBoundaries]);

  // Update markers when lieux change
  useEffect(() => {
    if (!map.current) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    lieux.forEach((lieu) => {
      if (!lieu.latitude || !lieu.longitude) return;

      const isSelected = selectedLieuId === lieu.id;
      const color = typeColors[lieu.type];
      const emoji = typeEmojis[lieu.type];

      const el = document.createElement("div");
      el.className = "lieu-marker";
      el.innerHTML = `
        <div style="
          width: ${isSelected ? "40px" : "34px"};
          height: ${isSelected ? "40px" : "34px"};
          background: ${color};
          border: 3px solid white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${isSelected ? "18px" : "14px"};
          z-index: ${isSelected ? "10" : "1"};
          transform: ${isSelected ? "scale(1.15)" : "scale(1)"};
        ">
          ${emoji}
        </div>
      `;

      el.addEventListener("mouseenter", () => {
        const inner = el.firstElementChild as HTMLElement;
        if (inner) {
          inner.style.transform = "scale(1.2)";
          inner.style.boxShadow = "0 4px 12px rgba(0,0,0,0.4)";
        }
      });

      el.addEventListener("mouseleave", () => {
        if (selectedLieuId !== lieu.id) {
          const inner = el.firstElementChild as HTMLElement;
          if (inner) {
            inner.style.transform = "scale(1)";
            inner.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
          }
        }
      });

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onMarkerClick(lieu);
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([lieu.longitude, lieu.latitude])
        .addTo(map.current!);

      markersRef.current.set(lieu.id, marker);
    });
  }, [lieux, selectedLieuId, onMarkerClick]);

  // Fly to viewport changes
  useEffect(() => {
    if (!map.current) return;

    map.current.flyTo({
      center: [viewport.longitude, viewport.latitude],
      zoom: viewport.zoom,
      duration: 1200,
      essential: true,
    });
  }, [viewport.latitude, viewport.longitude, viewport.zoom]);

  return <div ref={mapContainer} className="w-full h-full" />;
}
