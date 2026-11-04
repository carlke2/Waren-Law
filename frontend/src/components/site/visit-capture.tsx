'use client';

import { useEffect } from 'react';
import { captureVisit } from '@/lib/attribution/visit';

export function VisitCapture() {
  useEffect(captureVisit, []);
  return null;
}
