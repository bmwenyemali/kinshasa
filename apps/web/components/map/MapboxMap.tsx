"use client";

import React, { useRef, useEffect, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { LieuType } from "@kinservices/api";

// MapBox Access Token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

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
}

const typeColors: Record<LieuType, string> = {
  HOPITAL: "#EF4444", // red
  CLINIQUE: "#F87171", // light red
  CENTRE_SANTE: "#FB923C", // orange
  ADMINISTRATION: "#3B82F6", // blue
  MAIRIE: "#60A5FA", // light blue
  COMMISSARIAT: "#6366F1", // indigo
  TRIBUNAL: "#8B5CF6", // purple
  ECOLE: "#10B981", // green
  UNIVERSITE: "#34D399", // light green
  AUTRE: "#6B7280", // gray
};

export default function MapboxMap({
  lieux,
  viewport,
  onViewportChange,
  onMarkerClick,
  selectedLieuId,
}: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [viewport.longitude, viewport.latitude],
      zoom: viewport.zoom,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    // Add geolocation control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      "bottom-right",
    );

    // Update viewport on move
    map.current.on("moveend", () => {
      if (!map.current) return;
      const center = map.current.getCenter();
      onViewportChange({
        latitude: center.lat,
        longitude: center.lng,
        zoom: map.current.getZoom(),
      });
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update markers when lieux change
  useEffect(() => {
    if (!map.current) return;

    // Remove old markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    // Add new markers
    lieux.forEach((lieu) => {
      if (!lieu.latitude || !lieu.longitude) return;

      const el = document.createElement("div");
      el.className = "custom-marker";
      el.style.cssText = `
        width: 32px;
        height: 32px;
        background-color: ${typeColors[lieu.type]};
        border: 3px solid white;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        transition: transform 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      `;

      // Highlight selected marker
      if (selectedLieuId === lieu.id) {
        el.style.transform = "scale(1.3)";
        el.style.zIndex = "10";
      }

      el.addEventListener("mouseenter", () => {
        el.style.transform = "scale(1.2)";
      });

      el.addEventListener("mouseleave", () => {
        if (selectedLieuId !== lieu.id) {
          el.style.transform = "scale(1)";
        }
      });

      el.addEventListener("click", () => {
        onMarkerClick(lieu);
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([lieu.longitude, lieu.latitude])
        .addTo(map.current!);

      markersRef.current.set(lieu.id, marker);
    });
  }, [lieux, selectedLieuId, onMarkerClick]);

  // Fly to viewport when it changes externally
  useEffect(() => {
    if (!map.current) return;

    map.current.flyTo({
      center: [viewport.longitude, viewport.latitude],
      zoom: viewport.zoom,
      duration: 1000,
    });
  }, [viewport.latitude, viewport.longitude, viewport.zoom]);

  return <div ref={mapContainer} className="w-full h-full" />;
}
