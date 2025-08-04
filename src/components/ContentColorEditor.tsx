import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Type, MousePointer, Trash2 } from "lucide-react";
import { ColorToken } from "./TokenManager";
import TokenSelector from "./TokenSelector";

export type WCAGType = "text" | "interactive";

export interface ContentColor {
  id: string;
  color: string;
  name: string;
  token?: string;
  tokenId?: string; // Nuevo: ID del token si viene de la biblioteca
  wcagType: WCAGType;
}

interface ContentColorEditorProps {
  isOpen: boolean;
  onClose: () => void;
  contentColor?: ContentColor;
  onSave: (contentColor: ContentColor) => void;
  onDelete?: (id: string) => void;
  tokens?: ColorToken[];
  onOpenTokenManager?: () => void;
}

export default function ContentColorEditor({
  isOpen,
  onClose,
  contentColor,
  onSave,
  onDelete,
  tokens = [],
  onOpenTokenManager,
}: ContentColorEditorProps) {
  const [name, setName] = useState("");
  const [selectedToken, setSelectedToken] = useState<
    ColorToken | undefined
  >();
  const [customColor, setCustomColor] = useState("");
  const [wcagType, setWcagType] = useState<WCAGType>("text");

  // Inicializar valores cuando se abre el editor
  useEffect(() => {
    if (isOpen) {
      if (contentColor) {
        // Editando color existente
        setName(contentColor.name);
        setWcagType(contentColor.wcagType);

        // Si tiene tokenId, buscar el token correspondiente
        if (contentColor.tokenId) {
          const token = tokens.find(
            (t) => t.id === contentColor.tokenId,
          );
          if (token) {
            setSelectedToken(token);
            setCustomColor("");
          } else {
            // Token no encontrado, usar como color personalizado
            setSelectedToken(undefined);
            setCustomColor(contentColor.color);
          }
        } else {
          // Color personalizado
          setSelectedToken(undefined);
          setCustomColor(contentColor.color);
        }
      } else {
        // Creando nuevo color
        setName("");
        setSelectedToken(undefined);
        setCustomColor("");
        setWcagType("text");
      }
    }
  }, [isOpen, contentColor, tokens]);

  const handleSave = () => {
    const currentColor = selectedToken?.value || customColor;

    if (!name.trim() || !currentColor) {
      return;
    }

    const semanticName = name.trim();

    const newContentColor: ContentColor = {
      id: contentColor?.id || Date.now().toString(),
      color: currentColor,
      name: semanticName,
      token: selectedToken ? selectedToken.name : undefined,
      tokenId: selectedToken?.id,
      wcagType,
    };

    onSave(newContentColor);
    onClose();
  };

  const handleDelete = () => {
    if (contentColor && onDelete) {
      onDelete(contentColor.id);
      onClose();
    }
  };

  const handleTokenSelect = (token: ColorToken) => {
    setSelectedToken(token);

    // Auto-generar nombre semántico si está vacío
    if (!name.trim()) {
      const suggestedName = generateSemanticName(
        token.name,
        wcagType,
      );
      setName(suggestedName);
    }
  };

  const handleCustomColorSelect = (color: string) => {
    setCustomColor(color);
    setSelectedToken(undefined);
  };

  // Generar nombre semántico basado en el token y tipo WCAG
  const generateSemanticName = (
    tokenName: string,
    type: WCAGType,
  ): string => {
    const baseTokenName =
      tokenName.split("/").pop() || tokenName;
    const prefix = type === "text" ? "Texto" : "Elemento";
    return `${prefix} ${baseTokenName}`;
  };

  const currentColor = selectedToken?.value || customColor;
  const isFormValid = name.trim() && currentColor;

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent className="sm:max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {contentColor
              ? "Editar Color de Contenido"
              : "Nuevo Color de Contenido"}
          </DialogTitle>
          <DialogDescription>
            {contentColor
              ? "Modifica las propiedades del color de contenido y su vinculación con tokens."
              : "Crea un nuevo color de contenido seleccionando un token o definiendo un color personalizado."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Selector de Token/Color */}
          <div>
            <Label className="text-base font-semibold">
              Seleccionar Color
            </Label>
            <p className="text-sm text-muted-foreground mb-3">
              Elige un token de tu biblioteca o introduce un
              color personalizado
            </p>
            <TokenSelector
              tokens={tokens}
              selectedToken={selectedToken}
              selectedColor={customColor}
              onSelectToken={handleTokenSelect}
              onSelectCustomColor={handleCustomColorSelect}
              onOpenTokenManager={onOpenTokenManager}
            />
          </div>

          {/* Nombre semántico y Tipo WCAG en una fila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre semántico */}
            <div>
              <Label htmlFor="semantic-name">
                Nombre Semántico *
              </Label>
              <Input
                id="semantic-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ej: Texto principal, Enlace activo, Botón primario..."
              />
              <p className="text-xs text-muted-foreground mt-1">
                Dale un nombre descriptivo al uso de este color en
                tu diseño
              </p>
            </div>

            {/* Tipo WCAG */}
            <div>
              <Label htmlFor="wcag-type">
                Tipo de Elemento WCAG *
              </Label>
              <Select
                value={wcagType}
                onValueChange={(value: WCAGType) =>
                  setWcagType(value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">
                    <div className="flex items-center gap-2">
                      <Type size={16} />
                      <div>
                        <div className="font-medium">
                          Texto (WCAG 1.4.3)
                        </div>
                        <div className="text-xs text-muted-foreground">
                          AA: 4.5:1 • AAA: 7:1
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="interactive">
                    <div className="flex items-center gap-2">
                      <MousePointer size={16} />
                      <div>
                        <div className="font-medium">
                          Interactivo (WCAG 1.4.11)
                        </div>
                        <div className="text-xs text-muted-foreground">
                          AA/AAA: 3:1
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Vista previa del resultado */}
          {currentColor && name && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-semibold mb-3">
                Vista Previa
              </h4>
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-lg border-2 border-gray-300"
                  style={{ backgroundColor: currentColor }}
                />
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm text-muted-foreground font-mono">
                    {currentColor}
                  </p>
                  {selectedToken && (
                    <p className="text-xs text-purple-600">
                      🔗 {selectedToken.name}
                    </p>
                  )}
                  <div className="flex items-center gap-1 mt-1">
                    {wcagType === "text" ? (
                      <Type size={12} />
                    ) : (
                      <MousePointer size={12} />
                    )}
                    <span className="text-xs">
                      {wcagType === "text"
                        ? "Texto"
                        : "Interactivo"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex justify-between">
            <div>
              {contentColor && onDelete && (
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                >
                  <Trash2 size={16} className="mr-2" />
                  Eliminar
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                disabled={!isFormValid}
              >
                {contentColor ? "Actualizar" : "Crear"} Color
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}