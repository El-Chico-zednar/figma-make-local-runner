// Función helper para limpiar estilos oklch
function cleanOklchStyles(element: HTMLElement) {
  const allElements = element.querySelectorAll('*');
  const oklchPattern = /oklch\([^)]*\)/g;
  
  allElements.forEach((el) => {
    const htmlEl = el as HTMLElement;
    if (htmlEl.style.cssText && oklchPattern.test(htmlEl.style.cssText)) {
      // Reemplazar oklch con colores seguros
      htmlEl.style.cssText = htmlEl.style.cssText
        .replace(/color:\s*oklch\([^)]*\)/g, 'color: #252525')
        .replace(/background-color:\s*oklch\([^)]*\)/g, 'background-color: #ffffff')
        .replace(/border-color:\s*oklch\([^)]*\)/g, 'border-color: rgba(0, 0, 0, 0.1)')
        .replace(oklchPattern, '#ffffff');
    }
    
    // También limpiar atributos style inline
    if (htmlEl.getAttribute('style')?.includes('oklch')) {
      const currentStyle = htmlEl.getAttribute('style') || '';
      const cleanedStyle = currentStyle.replace(oklchPattern, '#ffffff');
      htmlEl.setAttribute('style', cleanedStyle);
    }
  });
}

export async function exportToPNG(elementId: string, filename: string = 'contrast-table') {
  try {
    // Importar dinámicamente html2canvas
    const html2canvas = (await import('html2canvas')).default;
    
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Elemento no encontrado');
    }

    // Guardar estilos originales
    const originalOverflow = element.style.overflow;
    const originalMaxHeight = element.style.maxHeight;
    const originalHeight = element.style.height;
    const originalWidth = element.style.width;
    const originalMinWidth = element.style.minWidth;

    // Crear estilo temporal para reemplazar oklch con colores compatibles Y eliminar scroll
    const tempStyle = document.createElement('style');
    tempStyle.textContent = `
      /* Reemplazos completos de oklch para exportación PNG */
      .png-export {
        /* Variables CSS convertidas de oklch a hex/rgb */
        --background: #ffffff !important;
        --foreground: #252525 !important;
        --card: #ffffff !important;
        --card-foreground: #252525 !important;
        --popover: #ffffff !important;
        --popover-foreground: #252525 !important;
        --primary: #030213 !important;
        --primary-foreground: #ffffff !important;
        --secondary: #f1f1f5 !important;
        --secondary-foreground: #030213 !important;
        --muted: #ececf0 !important;
        --muted-foreground: #717182 !important;
        --accent: #e9ebef !important;
        --accent-foreground: #030213 !important;
        --destructive: #d4183d !important;
        --destructive-foreground: #ffffff !important;
        --border: rgba(0, 0, 0, 0.1) !important;
        --input: transparent !important;
        --input-background: #f3f3f5 !important;
        --switch-background: #cbced4 !important;
        --ring: #b5b5b5 !important;
        --chart-1: #e67e22 !important;
        --chart-2: #3498db !important;
        --chart-3: #6c7b7f !important;
        --chart-4: #f1c40f !important;
        --chart-5: #e74c3c !important;
        
        /* Configuración de layout para exportación */
        background-color: #ffffff !important;
        color: #252525 !important;
        overflow: visible !important;
        max-height: none !important;
        height: auto !important;
        width: auto !important;
        min-width: max-content !important;
      }
      
      /* Reemplazos específicos de colores Tailwind */
      .png-export .bg-gray-50 {
        background-color: #f9fafb !important;
      }
      
      .png-export .bg-white {
        background-color: #ffffff !important;
      }
      
      .png-export .text-gray-600 {
        color: #4b5563 !important;
      }
      
      .png-export .text-gray-500 {
        color: #6b7280 !important;
      }
      
      .png-export .text-gray-700 {
        color: #374151 !important;
      }
      
      .png-export .text-gray-900 {
        color: #111827 !important;
      }
      
      .png-export .text-black {
        color: #000000 !important;
      }
      
      .png-export .border-gray-300 {
        border-color: #d1d5db !important;
      }
      
      .png-export .bg-blue-100 {
        background-color: #dbeafe !important;
      }
      
      .png-export .text-blue-900 {
        color: #1e3a8a !important;
      }
      
      .png-export .border-blue-200 {
        border-color: #bfdbfe !important;
      }
      
      .png-export .bg-blue-50 {
        background-color: #eff6ff !important;
      }
      
      .png-export .text-blue-700 {
        color: #1d4ed8 !important;
      }
      
      /* Asegurar que todo el contenido horizontal sea visible */
      .png-export .overflow-x-auto {
        overflow-x: visible !important;
      }
      
      /* Asegurar que el contenido interno no tenga restricciones de tamaño */
      .png-export > * {
        min-width: max-content !important;
        width: auto !important;
      }
      
      /* Forzar estilos sin oklch para elementos específicos */
      .png-export * {
        color: inherit !important;
        background-color: inherit !important;
        border-color: inherit !important;
      }
      
      /* Estilos específicos para elementos de la tabla */
      .png-export [style*="oklch"] {
        background: inherit !important;
        color: inherit !important;
      }
    `;
    
    document.head.appendChild(tempStyle);
    
    // Añadir clase temporal para la exportación
    element.classList.add('png-export');
    
    // Temporalmente eliminar el scroll y ajustar dimensiones para mostrar todo el contenido
    element.style.overflow = 'visible';
    element.style.maxHeight = 'none';
    element.style.height = 'auto';
    element.style.width = 'auto';
    element.style.minWidth = 'max-content';

    // Limpiar estilos oklch problemáticos
    cleanOklchStyles(element);
    
    // Esperar a que se actualice el layout
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      removeContainer: true,
      foreignObjectRendering: false,
      // Configuraciones adicionales para capturar todo el contenido
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      width: element.scrollWidth,
      height: element.scrollHeight
    });

    // Restaurar estilos originales
    element.style.overflow = originalOverflow;
    element.style.maxHeight = originalMaxHeight;
    element.style.height = originalHeight;
    element.style.width = originalWidth;
    element.style.minWidth = originalMinWidth;
    
    // Limpiar estilos temporales
    element.classList.remove('png-export');
    document.head.removeChild(tempStyle);

    // Crear enlace de descarga
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    console.log('PNG exportado exitosamente');
  } catch (error) {
    console.error('Error al exportar a PNG:', error);
    
    // Intentar método alternativo más simple
    try {
      await exportPNGAlternative(elementId, filename);
    } catch (alternativeError) {
      console.error('Error en método alternativo:', alternativeError);
      showExportFallbackInstructions();
    }
  }
}

async function exportPNGAlternative(elementId: string, filename: string) {
  // Método alternativo usando dom-to-image si html2canvas falla
  try {
    const domtoimage = (await import('dom-to-image')).default;
    
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Elemento no encontrado');
    }

    // Guardar estilos originales
    const originalOverflow = element.style.overflow;
    const originalMaxHeight = element.style.maxHeight;
    const originalHeight = element.style.height;
    const originalWidth = element.style.width;

    // Temporalmente eliminar el scroll para capturar todo el contenido
    element.style.overflow = 'visible';
    element.style.maxHeight = 'none';
    element.style.height = 'auto';
    element.style.width = 'auto';

    // Limpiar estilos oklch problemáticos
    cleanOklchStyles(element);
    
    // Esperar a que se actualice el layout
    await new Promise(resolve => setTimeout(resolve, 100));

    // Usar las dimensiones reales del contenido completo
    const fullWidth = element.scrollWidth;
    const fullHeight = element.scrollHeight;

    const dataUrl = await domtoimage.toPng(element, {
      width: fullWidth * 2,
      height: fullHeight * 2,
      style: {
        transform: 'scale(2)',
        transformOrigin: 'top left',
        background: '#ffffff',
        overflow: 'visible',
        maxHeight: 'none',
        height: 'auto',
        width: 'auto',
        // Variables CSS convertidas para dom-to-image
        '--background': '#ffffff',
        '--foreground': '#252525',
        '--card': '#ffffff',
        '--card-foreground': '#252525',
        '--popover': '#ffffff',
        '--popover-foreground': '#252525',
        '--primary': '#030213',
        '--primary-foreground': '#ffffff',
        '--secondary': '#f1f1f5',
        '--secondary-foreground': '#030213',
        '--muted': '#ececf0',
        '--muted-foreground': '#717182',
        '--accent': '#e9ebef',
        '--accent-foreground': '#030213',
        '--destructive': '#d4183d',
        '--destructive-foreground': '#ffffff',
        '--border': 'rgba(0, 0, 0, 0.1)',
        '--input': 'transparent',
        '--input-background': '#f3f3f5',
        '--switch-background': '#cbced4',
        '--ring': '#b5b5b5'
      },
      filter: (node) => {
        // Filtrar y limpiar nodos con estilos problemáticos
        if (node.style) {
          const style = node.style.cssText || '';
          
          // Eliminar referencias a oklch
          if (style.includes('oklch')) {
            // Reemplazar valores oklch conocidos
            node.style.cssText = style
              .replace(/oklch\([^)]*\)/g, '#ffffff')
              .replace(/color:\s*oklch\([^)]*\)/g, 'color: #252525')
              .replace(/background-color:\s*oklch\([^)]*\)/g, 'background-color: #ffffff')
              .replace(/border-color:\s*oklch\([^)]*\)/g, 'border-color: rgba(0, 0, 0, 0.1)');
          }
          
          return true;
        }
        return true;
      }
    });

    // Restaurar estilos originales
    element.style.overflow = originalOverflow;
    element.style.maxHeight = originalMaxHeight;
    element.style.height = originalHeight;
    element.style.width = originalWidth;

    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
    
    console.log('PNG exportado exitosamente con método alternativo');
  } catch (error) {
    throw new Error('Falló método alternativo de exportación');
  }
}

function showExportFallbackInstructions() {
  const instructions = `
No se pudo exportar automáticamente. Puedes capturar la tabla manualmente:

📸 OPCIÓN 1 - Captura de pantalla del navegador:
• Chrome/Edge: Ctrl+Shift+I → Menú ⋮ → "Capture screenshot" 
• Firefox: F12 → Icono de cámara
• Safari: Develop → "Take Screenshot"

📱 OPCIÓN 2 - Herramientas del sistema:
• Windows: Win+Shift+S
• Mac: Cmd+Shift+4
• Linux: Print Screen

🔧 OPCIÓN 3 - Extensiones:
• "FireShot" para Chrome/Firefox
• "Awesome Screenshot" para Chrome
• "Nimbus Screenshot" para Chrome

Selecciona el área de la tabla de contrastes para obtener la imagen.
  `.trim();
  
  alert(instructions);
}

export function exportToFigmaFrame(colorPairs: any[]) {
  // Simular export a Figma - en una implementación real esto requeriría la API de Figma
  const figmaData = {
    type: 'FRAME',
    name: 'Contrast Table',
    width: 800,
    height: colorPairs.length * 320,
    backgroundColor: { r: 1, g: 1, b: 1, a: 1 },
    children: colorPairs.map((pair, index) => ({
      type: 'FRAME',
      name: `Color Pair ${index + 1}`,
      x: 0,
      y: index * 320,
      width: 800,
      height: 320,
      backgroundColor: { r: 1, g: 1, b: 1, a: 1 },
      children: [
        {
          type: 'RECTANGLE',
          name: pair.lightColorName,
          x: 0,
          y: 0,
          width: 400,
          height: 320,
          fills: [{
            type: 'SOLID',
            color: hexToRgb(pair.lightColor)
          }]
        },
        {
          type: 'RECTANGLE',
          name: pair.darkColorName,
          x: 400,
          y: 0,
          width: 400,
          height: 320,
          fills: [{
            type: 'SOLID',
            color: hexToRgb(pair.darkColor)
          }]
        }
      ]
    }))
  };

  // Copiar al portapapeles como JSON para importar en Figma
  navigator.clipboard.writeText(JSON.stringify(figmaData, null, 2))
    .then(() => {
      alert('¡Datos del frame copiados al portapapeles!\n\nPara importar en Figma:\n1. Instala un plugin como "JSON to Figma" o "Figma to Code"\n2. Pega los datos copiados\n3. Genera el frame en tu archivo de Figma');
    })
    .catch(() => {
      // Fallback si el portapapeles no funciona
      const textarea = document.createElement('textarea');
      textarea.value = JSON.stringify(figmaData, null, 2);
      document.body.appendChild(textarea);
      textarea.select();
      
      try {
        document.execCommand('copy');
        alert('Datos copiados al portapapeles mediante método alternativo.');
      } catch (err) {
        alert('No se pudo copiar automáticamente. Los datos se han impreso en la consola del navegador (F12).');
        console.log('Figma Frame Data:', figmaData);
      }
      
      document.body.removeChild(textarea);
    });
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 0, g: 0, b: 0 };
}