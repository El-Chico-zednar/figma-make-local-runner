import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ContentColor, WCAGType } from "./ContentColorEditor";
import { BackgroundColor } from "./BackgroundColorEditor";
import {
  ArrowUp,
  ArrowDown,
  Edit,
  Trash2,
  Plus,
  Type,
  MousePointer,
  Palette,
  GripVertical,
  List,
  ChevronDown,
} from "lucide-react";
import {
  getContrastRatio,
  getAccessibilityLevel,
} from "./ContrastCalculator";
import { Card } from "./ui/card";

interface ContentColorManagerProps {
  isOpen: boolean;
  onClose: () => void;
  contentColors: ContentColor[];
  backgroundColors: BackgroundColor[];
  onUpdateColors: (colors: ContentColor[]) => void;
  onEditColor: (color: ContentColor) => void;
  onAddColor: () => void;
}

function ContentColorItem({
  color,
  index,
  total,
  backgroundColor,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  color: ContentColor;
  index: number;
  total: number;
  backgroundColor: string;
  onEdit: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const contrastRatio = getContrastRatio(
    color.color,
    backgroundColor,
  );
  const accessibilityLevel = getAccessibilityLevel(
    contrastRatio,
    color.wcagType,
  );
  const IconComponent =
    color.wcagType === "text" ? Type : MousePointer;

  // Colores para el nivel de accesibilidad
  const levelColors = {
    AAA: "bg-green-100 text-green-800",
    AA: "bg-yellow-100 text-yellow-800",
    FAIL: "bg-red-100 text-red-800",
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-6">
        {/* Muestra de color */}
        <div className="flex-shrink-0">
          <div
            className="w-16 h-16 rounded-lg border-2 border-gray-200 shadow-sm"
            style={{ backgroundColor: color.color }}
          />
        </div>

        {/* Información del color */}
        <div className="flex-1 min-w-0 max-w-md">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-semibold text-base truncate max-w-[200px]">
              {color.name}
            </h4>
            <div className="flex items-center gap-2 flex-shrink-0">
              <IconComponent
                size={14}
                className="text-gray-500"
              />
              <Badge
                variant="outline"
                className="text-xs px-2 py-1 whitespace-nowrap"
              >
                {color.wcagType === "text"
                  ? "Texto"
                  : "Interactivo"}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs whitespace-nowrap">
              {color.color.toLowerCase()}
            </span>
            {color.token && (
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs whitespace-nowrap">
                🔗 {color.token}
              </span>
            )}
          </div>
        </div>

        {/* Ratio de contraste */}
        <div className="flex-shrink-0 text-center min-w-[120px]">
          <div className="text-xl font-bold text-gray-900 mb-2">
            {contrastRatio.toFixed(2)}
          </div>
          <Badge
            variant="outline"
            className={`text-xs px-3 py-1 ${levelColors[accessibilityLevel]}`}
          >
            {accessibilityLevel}
          </Badge>
        </div>

        {/* Controles de orden */}
        <div className="flex flex-col gap-1 flex-shrink-0">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={onMoveUp}
            disabled={index === 0}
          >
            <ArrowUp size={16} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={onMoveDown}
            disabled={index === total - 1}
          >
            <ArrowDown size={16} />
          </Button>
        </div>

        {/* Acciones */}
        <div className="flex gap-2 flex-shrink-0">
          <Button
            size="sm"
            variant="ghost"
            className="h-10 w-10 p-0"
            onClick={onEdit}
          >
            <Edit size={18} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-10 w-10 p-0 text-red-600 hover:text-red-700"
            onClick={onDelete}
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
}

function BackgroundSelector({
  backgroundColors,
  selectedBackgroundId,
  onBackgroundChange,
}: {
  backgroundColors: BackgroundColor[];
  selectedBackgroundId: string;
  onBackgroundChange: (backgroundId: string) => void;
}) {
  const selectedBackground = backgroundColors.find(bg => bg.id === selectedBackgroundId);

  return (
    <div className="text-center">
      <div className="mb-3">
        <div
          className="w-12 h-12 rounded-lg border-2 border-gray-300 shadow-sm mx-auto mb-2"
          style={{ backgroundColor: selectedBackground?.color || '#ffffff' }}
        />
        <div className="text-gray-600 font-medium text-xs mb-2">
          Fondo de prueba
        </div>
      </div>
      
      {backgroundColors.length > 1 && (
        <Select value={selectedBackgroundId} onValueChange={onBackgroundChange}>
          <SelectTrigger className="w-32 h-8 text-xs">
            <SelectValue>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded border border-gray-300"
                  style={{ backgroundColor: selectedBackground?.color }}
                />
                <span className="truncate max-w-[60px]">
                  {selectedBackground?.name}
                </span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {backgroundColors.map((bg) => (
              <SelectItem key={bg.id} value={bg.id}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded border border-gray-300"
                    style={{ backgroundColor: bg.color }}
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-sm">{bg.name}</span>
                    <span className="text-xs text-gray-500 font-mono">
                      {bg.color.toLowerCase()}
                    </span>
                  </div>
                  {bg.token && (
                    <Badge variant="outline" className="text-xs ml-auto">
                      🔗
                    </Badge>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      
      {backgroundColors.length === 1 && (
        <div className="text-xs text-gray-500">
          {selectedBackground?.name}
        </div>
      )}
    </div>
  );
}

export default function ContentColorManager({
  isOpen,
  onClose,
  contentColors,
  backgroundColors,
  onUpdateColors,
  onEditColor,
  onAddColor,
}: ContentColorManagerProps) {
  // Estado para el background seleccionado para las pruebas de contraste
  const [selectedBackgroundId, setSelectedBackgroundId] = useState(backgroundColors[0]?.id || '');
  
  // Actualizar el background seleccionado si cambia la lista de backgrounds
  useState(() => {
    if (backgroundColors.length > 0 && !backgroundColors.find(bg => bg.id === selectedBackgroundId)) {
      setSelectedBackgroundId(backgroundColors[0].id);
    }
  });

  const selectedBackground = backgroundColors.find(bg => bg.id === selectedBackgroundId) || backgroundColors[0];

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newColors = [...contentColors];
    [newColors[index - 1], newColors[index]] = [
      newColors[index],
      newColors[index - 1],
    ];
    onUpdateColors(newColors);
  };

  const handleMoveDown = (index: number) => {
    if (index === contentColors.length - 1) return;
    const newColors = [...contentColors];
    [newColors[index], newColors[index + 1]] = [
      newColors[index + 1],
      newColors[index],
    ];
    onUpdateColors(newColors);
  };

  const handleDelete = (id: string) => {
    const newColors = contentColors.filter(
      (color) => color.id !== id,
    );
    onUpdateColors(newColors);
  };

  const handleEdit = (color: ContentColor) => {
    onEditColor(color);
    onClose(); // Cerrar el gestor para abrir el editor
  };

  const handleAddNew = () => {
    onAddColor();
    onClose(); // Cerrar el gestor para abrir el editor
  };

  // Estadísticas rápidas basadas en el background seleccionado
  const stats = {
    total: contentColors.length,
    textColors: contentColors.filter(
      (c) => c.wcagType === "text",
    ).length,
    interactiveColors: contentColors.filter(
      (c) => c.wcagType === "interactive",
    ).length,
    withTokens: contentColors.filter((c) => c.token).length,
    accessibilityLevels: {
      AAA: contentColors.filter(
        (c) =>
          getAccessibilityLevel(
            getContrastRatio(c.color, selectedBackground?.color || '#ffffff'),
            c.wcagType,
          ) === "AAA",
      ).length,
      AA: contentColors.filter(
        (c) =>
          getAccessibilityLevel(
            getContrastRatio(c.color, selectedBackground?.color || '#ffffff'),
            c.wcagType,
          ) === "AA",
      ).length,
      FAIL: contentColors.filter(
        (c) =>
          getAccessibilityLevel(
            getContrastRatio(c.color, selectedBackground?.color || '#ffffff'),
            c.wcagType,
          ) === "FAIL",
      ).length,
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <List size={20} />
            Gestor de Colores de Contenido
          </DialogTitle>
          <DialogDescription>
            Edita, reordena y gestiona todos los colores de
            contenido de tu tabla de contrastes. Se evalúan
            contra el fondo seleccionado: <strong>{selectedBackground?.name}</strong> (
            {selectedBackground?.color.toLowerCase()})
          </DialogDescription>
        </DialogHeader>

        {/* Estadísticas del proyecto */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 text-sm">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {stats.total}
              </div>
              <div className="text-gray-600 font-medium">
                Total colores
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Type size={18} className="text-gray-600" />
                <span className="text-xl font-bold text-gray-900">
                  {stats.textColors}
                </span>
              </div>
              <div className="text-gray-600 font-medium">
                Texto
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <MousePointer
                  size={18}
                  className="text-gray-600"
                />
                <span className="text-xl font-bold text-gray-900">
                  {stats.interactiveColors}
                </span>
              </div>
              <div className="text-gray-600 font-medium">
                Interactivo
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-600 mb-1">
                {stats.withTokens}
              </div>
              <div className="text-gray-600 font-medium">
                Con tokens
              </div>
            </div>
            <div className="text-center">
              <div className="flex justify-center gap-1 mb-1">
                <Badge className="bg-green-100 text-green-800 text-xs px-2">
                  {stats.accessibilityLevels.AAA}
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-800 text-xs px-2">
                  {stats.accessibilityLevels.AA}
                </Badge>
                <Badge className="bg-red-100 text-red-800 text-xs px-2">
                  {stats.accessibilityLevels.FAIL}
                </Badge>
              </div>
              <div className="text-gray-600 font-medium">
                AAA / AA / FAIL
              </div>
            </div>
            <BackgroundSelector
              backgroundColors={backgroundColors}
              selectedBackgroundId={selectedBackgroundId}
              onBackgroundChange={setSelectedBackgroundId}
            />
          </div>
        </div>

        {/* Lista de colores */}
        <div className="flex-1 overflow-y-auto">
          {contentColors.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Palette
                size={64}
                className="mx-auto mb-6 text-gray-300"
              />
              <p className="text-xl mb-3">
                No hay colores de contenido
              </p>
              <p className="text-sm mb-6 text-gray-400">
                Añade tu primer color para empezar a evaluar
                contrastes
              </p>
              <Button
                onClick={handleAddNew}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Añadir Primer Color
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {contentColors.map((color, index) => (
                <ContentColorItem
                  key={color.id}
                  color={color}
                  index={index}
                  total={contentColors.length}
                  backgroundColor={selectedBackground?.color || '#ffffff'}
                  onEdit={() => handleEdit(color)}
                  onDelete={() => handleDelete(color.id)}
                  onMoveUp={() => handleMoveUp(index)}
                  onMoveDown={() => handleMoveDown(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer con acciones */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="text-sm text-gray-600">
            {contentColors.length > 0 && (
              <span className="flex items-center gap-2">
                <strong>{contentColors.length}</strong> color
                {contentColors.length !== 1 ? "es" : ""} • Usa
                las flechas{" "}
                <ArrowUp size={14} className="inline" />{" "}
                <ArrowDown size={14} className="inline" /> para
                reordenar
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleAddNew}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              Añadir Color
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}