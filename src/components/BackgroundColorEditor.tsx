import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Palette, Link, Unlink } from 'lucide-react';
import TokenSelector from './TokenSelector';
import { ColorToken } from './TokenManager';

export interface BackgroundColor {
  id: string;
  color: string;
  name: string;
  token?: string;
  tokenId?: string;
}

interface BackgroundColorEditorProps {
  isOpen: boolean;
  onClose: () => void;
  backgroundColor?: BackgroundColor;
  onSave: (backgroundColor: BackgroundColor) => void;
  onDelete?: (id: string) => void;
  tokens: ColorToken[];
  onOpenTokenManager: () => void;
}

export default function BackgroundColorEditor({
  isOpen,
  onClose,
  backgroundColor,
  onSave,
  onDelete,
  tokens,
  onOpenTokenManager
}: BackgroundColorEditorProps) {
  const [localColor, setLocalColor] = useState('#ffffff');
  const [localName, setLocalName] = useState('');
  const [linkedToken, setLinkedToken] = useState<ColorToken | null>(null);
  const [showTokenSelector, setShowTokenSelector] = useState(false);

  const isEditing = !!backgroundColor;

  useEffect(() => {
    if (isOpen) {
      if (backgroundColor) {
        setLocalColor(backgroundColor.color);
        setLocalName(backgroundColor.name);
        
        if (backgroundColor.tokenId) {
          const token = tokens.find(t => t.id === backgroundColor.tokenId);
          setLinkedToken(token || null);
        } else {
          setLinkedToken(null);
        }
      } else {
        // Nuevo background
        setLocalColor('#ffffff');
        setLocalName('Nuevo background');
        setLinkedToken(null);
      }
    }
  }, [isOpen, backgroundColor, tokens]);

  const handleSave = () => {
    const newBackground: BackgroundColor = {
      id: backgroundColor?.id || `bg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      color: linkedToken ? linkedToken.value : localColor,
      name: localName.trim() || (linkedToken ? linkedToken.name : 'Background sin nombre'),
      token: linkedToken ? linkedToken.name : undefined,
      tokenId: linkedToken ? linkedToken.id : undefined
    };

    onSave(newBackground);
    onClose();
  };

  const handleDelete = () => {
    if (backgroundColor && onDelete) {
      onDelete(backgroundColor.id);
      onClose();
    }
  };

  const handleLinkToken = (token: ColorToken) => {
    setLinkedToken(token);
    setLocalColor(token.value);
    setLocalName(token.name);
    setShowTokenSelector(false);
  };

  const handleUnlinkToken = () => {
    setLinkedToken(null);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!linkedToken) {
      setLocalColor(e.target.value);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value);
  };

  const displayColor = linkedToken ? linkedToken.value : localColor;
  const hasValidName = localName.trim().length > 0;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Palette size={20} />
              {isEditing ? 'Editar Background' : 'Nuevo Background'}
            </DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Modifica las propiedades del color de fondo y su vinculación con tokens.'
                : 'Crea un nuevo color de fondo que se usará para evaluar contrastes con los colores de contenido.'
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Vista previa del color */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-lg border-2 border-gray-300 flex-shrink-0"
                    style={{ backgroundColor: displayColor }}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{localName || 'Sin nombre'}</p>
                    <p className="text-sm text-gray-600">{displayColor.toLowerCase()}</p>
                    {linkedToken && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        🔗 {linkedToken.name}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Configuración del color */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="colorName">Nombre del background</Label>
                <Input
                  id="colorName"
                  value={localName}
                  onChange={handleNameChange}
                  placeholder="ej. Fondo principal, Superficie oscura..."
                />
              </div>

              <div>
                <Label htmlFor="colorValue">Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="colorValue"
                    type="color"
                    value={displayColor}
                    onChange={handleColorChange}
                    disabled={!!linkedToken}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    value={displayColor}
                    onChange={(e) => {
                      if (!linkedToken) {
                        setLocalColor(e.target.value);
                      }
                    }}
                    disabled={!!linkedToken}
                    placeholder="#ffffff"
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Gestión de tokens */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Token vinculado</Label>
                  {tokens.length === 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onOpenTokenManager}
                    >
                      Crear tokens
                    </Button>
                  )}
                </div>
                
                {linkedToken ? (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="flex-1">
                      🔗 {linkedToken.name}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleUnlinkToken}
                    >
                      <Unlink size={14} />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setShowTokenSelector(true)}
                    disabled={tokens.length === 0}
                    className="w-full"
                  >
                    <Link size={14} className="mr-2" />
                    {tokens.length === 0 ? 'No hay tokens disponibles' : 'Vincular token'}
                  </Button>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            {isEditing && onDelete && (
              <Button variant="destructive" onClick={handleDelete}>
                Eliminar
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!hasValidName}
            >
              {isEditing ? 'Guardar' : 'Crear'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Selector de tokens - Solo mostrar cuando está activo */}
      {showTokenSelector && (
        <Dialog open={showTokenSelector} onOpenChange={setShowTokenSelector}>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Seleccionar Token</DialogTitle>
              <DialogDescription>
                Selecciona un token de color de tu biblioteca o define un color personalizado.
              </DialogDescription>
            </DialogHeader>
            <TokenSelector
              tokens={tokens}
              selectedToken={linkedToken || undefined}
              onSelectToken={handleLinkToken}
              onSelectCustomColor={(color) => {
                setLocalColor(color);
                setShowTokenSelector(false);
              }}
              onOpenTokenManager={onOpenTokenManager}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowTokenSelector(false)}>
                Cancelar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}