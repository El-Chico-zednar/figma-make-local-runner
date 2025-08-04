import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { getContrastRatio, getAccessibilityLevel } from './ContrastCalculator';

export interface ColorPair {
  id: string;
  lightColor: string;
  darkColor: string;
  lightColorName: string;
  darkColorName: string;
  lightToken?: string;
  darkToken?: string;
}

interface ColorPairEditorProps {
  isOpen: boolean;
  onClose: () => void;
  colorPair?: ColorPair;
  onSave: (colorPair: ColorPair) => void;
  onDelete?: (id: string) => void;
}

export default function ColorPairEditor({
  isOpen,
  onClose,
  colorPair,
  onSave,
  onDelete
}: ColorPairEditorProps) {
  const [formData, setFormData] = useState<Omit<ColorPair, 'id'>>({
    lightColor: colorPair?.lightColor || '#ffffff',
    darkColor: colorPair?.darkColor || '#000000',
    lightColorName: colorPair?.lightColorName || 'Color claro',
    darkColorName: colorPair?.darkColorName || 'Color oscuro',
    lightToken: colorPair?.lightToken || '',
    darkToken: colorPair?.darkToken || '',
  });

  const contrastRatio = getContrastRatio(formData.lightColor, formData.darkColor);
  const accessibilityLevel = getAccessibilityLevel(contrastRatio);

  const handleSave = () => {
    onSave({
      id: colorPair?.id || Date.now().toString(),
      ...formData
    });
    onClose();
  };

  const handleDelete = () => {
    if (colorPair && onDelete) {
      onDelete(colorPair.id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {colorPair ? 'Editar Par de Colores' : 'Nuevo Par de Colores'}
          </DialogTitle>
          <DialogDescription>
            {colorPair 
              ? 'Modifica las propiedades de este par de colores y revisa su ratio de contraste.'
              : 'Crea un nuevo par de colores y evalúa su accesibilidad según estándares WCAG.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Color claro */}
          <div className="space-y-2">
            <Label>Color Claro</Label>
            <div className="flex gap-2">
              <div 
                className="w-10 h-10 rounded border-2 border-gray-300 cursor-pointer"
                style={{ backgroundColor: formData.lightColor }}
                onClick={() => document.getElementById('lightColor')?.click()}
              />
              <Input
                id="lightColor"
                type="color"
                value={formData.lightColor}
                onChange={(e) => setFormData(prev => ({ ...prev, lightColor: e.target.value }))}
                className="sr-only"
              />
              <Input
                value={formData.lightColor}
                onChange={(e) => setFormData(prev => ({ ...prev, lightColor: e.target.value }))}
                placeholder="#ffffff"
              />
            </div>
            <Input
              value={formData.lightColorName}
              onChange={(e) => setFormData(prev => ({ ...prev, lightColorName: e.target.value }))}
              placeholder="Nombre del color claro"
            />
            <Input
              value={formData.lightToken || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, lightToken: e.target.value }))}
              placeholder="Token del color (opcional)"
            />
          </div>

          {/* Color oscuro */}
          <div className="space-y-2">
            <Label>Color Oscuro</Label>
            <div className="flex gap-2">
              <div 
                className="w-10 h-10 rounded border-2 border-gray-300 cursor-pointer"
                style={{ backgroundColor: formData.darkColor }}
                onClick={() => document.getElementById('darkColor')?.click()}
              />
              <Input
                id="darkColor"
                type="color"
                value={formData.darkColor}
                onChange={(e) => setFormData(prev => ({ ...prev, darkColor: e.target.value }))}
                className="sr-only"
              />
              <Input
                value={formData.darkColor}
                onChange={(e) => setFormData(prev => ({ ...prev, darkColor: e.target.value }))}
                placeholder="#000000"
              />
            </div>
            <Input
              value={formData.darkColorName}
              onChange={(e) => setFormData(prev => ({ ...prev, darkColorName: e.target.value }))}
              placeholder="Nombre del color oscuro"
            />
            <Input
              value={formData.darkToken || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, darkToken: e.target.value }))}
              placeholder="Token del color (opcional)"
            />
          </div>

          {/* Preview del contraste */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span>Ratio de contraste:</span>
              <div className="flex items-center gap-2">
                <span className="font-bold">{contrastRatio.toFixed(2)}</span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  accessibilityLevel === 'AAA' ? 'bg-green-100 text-green-800' :
                  accessibilityLevel === 'AA' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {accessibilityLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-2 justify-end">
            {colorPair && onDelete && (
              <Button variant="destructive" onClick={handleDelete}>
                Eliminar
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Guardar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}