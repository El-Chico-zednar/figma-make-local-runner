// Utilidades para cálculo de contraste de colores

import { WCAGType } from './ContentColorEditor';

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Limpiar el input y asegurar formato correcto
  const cleanHex = hex.replace('#', '').trim();
  
  // Manejar hex de 3 caracteres (ej: #fff)
  if (cleanHex.length === 3) {
    const expandedHex = cleanHex.split('').map(char => char + char).join('');
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(expandedHex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
  // Manejar hex de 6 caracteres (ej: #ffffff)
  if (cleanHex.length === 6) {
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
  // Manejar hex de 8 caracteres con alpha (ej: #ffffffff, #e6f0edff)
  // Ignoramos los últimos 2 caracteres (canal alpha) y extraemos solo RGB
  if (cleanHex.length === 8) {
    const rgbHex = cleanHex.substring(0, 6); // Extraer solo los primeros 6 caracteres (RGB)
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(rgbHex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
  // Manejar hex de 4 caracteres con alpha (ej: #ffff)
  if (cleanHex.length === 4) {
    const rgbHex = cleanHex.substring(0, 3); // Extraer solo los primeros 3 caracteres
    const expandedHex = rgbHex.split('').map(char => char + char).join('');
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(expandedHex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
  console.warn(`Unsupported hex color format: ${hex} (length: ${cleanHex.length})`);
  return null;
}

export function getLuminance(r: number, g: number, b: number): number {
  // Asegurar que los valores están en el rango correcto
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastRatio(color1: string, color2: string): number {
  try {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    if (!rgb1 || !rgb2) {
      console.warn('Invalid color format:', { color1, color2 });
      return 1;
    }
    
    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    // Verificar que las luminancias son válidas
    if (isNaN(lum1) || isNaN(lum2)) {
      console.warn('Invalid luminance calculated:', { lum1, lum2, rgb1, rgb2 });
      return 1;
    }
    
    const lightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    const ratio = (lightest + 0.05) / (darkest + 0.05);
    
    // Verificar que el ratio es válido
    if (isNaN(ratio) || !isFinite(ratio) || ratio < 1) {
      console.warn('Invalid contrast ratio calculated:', { ratio, lightest, darkest });
      return 1;
    }
    
    return ratio;
  } catch (error) {
    console.error('Error in getContrastRatio:', error, { color1, color2 });
    return 1;
  }
}

// Función para obtener el nivel de accesibilidad según el tipo WCAG
export function getAccessibilityLevel(ratio: number, wcagType: WCAGType = 'text'): 'AAA' | 'AA' | 'AALarge' | 'FAIL' {
  // Asegurar que el ratio es un número válido
  if (isNaN(ratio) || !isFinite(ratio)) {
    return 'FAIL';
  }
  
  if (wcagType === 'interactive') {
    // WCAG 1.4.11 - Elementos interactivos: 3:1 mínimo
    if (ratio >= 3) return 'AA'; // Para elementos interactivos, 3:1 es suficiente
    return 'FAIL';
  } else {
    // WCAG 1.4.3 - Texto normal: niveles granulares
    if (ratio >= 7) return 'AAA';      // 7:1+ = AAA (verde)
    if (ratio >= 4.5) return 'AA';     // 4.5:1-7:1 = AA (verde)
    if (ratio >= 3) return 'AALarge';  // 3:1-4.5:1 = AALarge (amarillo)
    return 'FAIL';                     // <3:1 = FAIL (rojo)
  }
}

// Función legacy para mantener compatibilidad
export function getAccessibilityLevelLegacy(ratio: number): 'AAA' | 'AA' | 'AALarge' | 'FAIL' {
  return getAccessibilityLevel(ratio, 'text');
}

export function isColorLight(hex: string): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;
  const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
  return luminance > 0.5;
}

// Función auxiliar para normalizar colores hex
export function normalizeHexColor(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  // Convertir de vuelta a formato hex de 6 caracteres
  const toHex = (value: number) => value.toString(16).padStart(2, '0');
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

// Función para obtener información detallada sobre los criterios WCAG
export function getWCAGCriteria(wcagType: WCAGType) {
  if (wcagType === 'interactive') {
    return {
      standard: 'WCAG 1.4.11',
      name: 'Contraste de Elementos Interactivos',
      requirements: {
        AA: 3.0,
        AAA: 3.0
      },
      description: 'Para componentes de interfaz de usuario y elementos gráficos'
    };
  } else {
    return {
      standard: 'WCAG 1.4.3',
      name: 'Contraste de Texto',
      requirements: {
        AALarge: 3.0,
        AA: 4.5,
        AAA: 7.0
      },
      description: 'Para texto normal y contenido textual'
    };
  }
}