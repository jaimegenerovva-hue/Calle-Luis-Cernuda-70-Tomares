/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export interface SlideItem {
  id: number;
  image: string;
  label: string;
  title: string;
  subtitle: string;
}

export interface MetricItem {
  id: string;
  icon: string | React.ReactNode;
  label: string;
  value: string;
}

export interface AmenityItem {
  id: string;
  icon: string; // Lucide icon identifier
  name: string;
  description: string;
}

export interface GalleryItem {
  id: number;
  url: string;
  title: string;
  category: string;
}

export interface PointOfInterest {
  id: string;
  icon: string;
  name: string;
  distance: string;
}

export interface FloorLayout {
  floorId: string;
  title: string;
  tabLabel: string;
  description: string;
  image: string;
  metrics: string[];
  rooms: string[];
}
