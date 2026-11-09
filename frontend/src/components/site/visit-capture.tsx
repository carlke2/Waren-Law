'use client';

import { useEffect } from 'react';
import { captureVisit } from '@/lib/utils/attribution/visit';

export function VisitCapture() {
  useEffect(captureVisit, []);
  return null;
}
