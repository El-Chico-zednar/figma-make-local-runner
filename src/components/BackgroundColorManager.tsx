import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import {
  Plus,
  MoreVertical,
  Edit3,
  Trash2,
  GripVertical,
  Palette,
  PaintBucket,
} from "lucide-react";
import { BackgroundColor } from "./BackgroundColorEditor";
import BackgroundColorEditor from "./BackgroundColorEditor";
import { ColorToken } from "./TokenManager";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Sortable item component
function SortableItem({ background, onEdit, onDelete, canDelete }: {
  background: BackgroundColor;
  onEdit: (background: BackgroundColor) => void;
  onDelete: (id: string) => void;
  canDelete: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: background.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`transition-all ${
        isDragging ? "shadow-lg scale-105" : "hover:shadow-md"
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between pt-[0px] pr-[0px] pb-[8px] pl-[0px]">
          <div className="flex items-center gap-3">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
            >
              <GripVertical size={16} />
            </div>

            <div
              className="w-8 h-8 rounded border-2 border-gray-300 flex-shrink-0"
              style={{
                backgroundColor: background.color,
              }}
            />

            <div>
              <CardTitle className="text-sm">
                {background.name}
              </CardTitle>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>
                  {background.color.toLowerCase()}
                </span>
                {background.token && (
                  <Badge
                    variant="outline"
                    className="text-xs"
                  >
                    🔗{" "}
                    {background.token}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <MoreVertical size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => onEdit(background)}
              >
                <Edit3 size={14} className="mr-2" />
                Editar
              </DropdownMenuItem>
              {canDelete && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onDelete(background.id)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 size={14} className="mr-2" />
                    Eliminar
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
    </Card>
  );
}

interface BackgroundColorManagerProps {
  isOpen: boolean;
  onClose: () => void;
  backgroundColors: BackgroundColor[];
  onUpdateBackgroundColors: (colors: BackgroundColor[]) => void;
  tokens: ColorToken[];
  onOpenTokenManager: () => void;
}

export default function BackgroundColorManager({
  isOpen,
  onClose,
  backgroundColors,
  onUpdateBackgroundColors,
  tokens,
  onOpenTokenManager,
}: BackgroundColorManagerProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBackground, setEditingBackground] = useState<
    BackgroundColor | undefined
  >();
  const [localBackgrounds, setLocalBackgrounds] = useState<
    BackgroundColor[]
  >([]);

  useEffect(() => {
    if (isOpen) {
      setLocalBackgrounds([...backgroundColors]);
    }
  }, [isOpen, backgroundColors]);

  const handleAddBackground = () => {
    setEditingBackground(undefined);
    setIsEditModalOpen(true);
  };

  const handleEditBackground = (
    background: BackgroundColor,
  ) => {
    setEditingBackground(background);
    setIsEditModalOpen(true);
  };

  const handleSaveBackground = (
    background: BackgroundColor,
  ) => {
    let updatedBackgrounds;
    if (editingBackground) {
      updatedBackgrounds = localBackgrounds.map((bg) =>
        bg.id === background.id ? background : bg,
      );
    } else {
      updatedBackgrounds = [...localBackgrounds, background];
    }

    setLocalBackgrounds(updatedBackgrounds);
    setIsEditModalOpen(false);
    setEditingBackground(undefined);
  };

  const handleDeleteBackground = (id: string) => {
    if (localBackgrounds.length <= 1) {
      return; // No permitir eliminar si solo hay un background
    }

    const updatedBackgrounds = localBackgrounds.filter(
      (bg) => bg.id !== id,
    );
    setLocalBackgrounds(updatedBackgrounds);
  };

  const handleDragEnd = (result: DragEndEvent) => {
    const { active, over } = result;

    if (active.id === over?.id) {
      return;
    }

    const oldIndex = localBackgrounds.findIndex(
      (background) => background.id === active.id,
    );
    const newIndex = localBackgrounds.findIndex(
      (background) => background.id === over?.id,
    );

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const reorderedBackgrounds = arrayMove(
      localBackgrounds,
      oldIndex,
      newIndex,
    );
    setLocalBackgrounds(reorderedBackgrounds);
  };

  const handleSaveChanges = () => {
    onUpdateBackgroundColors(localBackgrounds);
    onClose();
  };

  const handleCancel = () => {
    setLocalBackgrounds([...backgroundColors]);
    onClose();
  };

  const hasChanges =
    JSON.stringify(localBackgrounds) !==
    JSON.stringify(backgroundColors);

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={hasChanges ? undefined : onClose}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PaintBucket size={20} />
              Gestión de Colores de Background
            </DialogTitle>
            <DialogDescription>
              Administra los colores de fondo para tu tema. Cada
              color de contenido se comparará contra todos estos
              backgrounds.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Header con estadísticas y botón añadir */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">
                  {localBackgrounds.length} background
                  {localBackgrounds.length !== 1 ? "s" : ""}
                </Badge>
                {localBackgrounds.length === 1 && (
                  <Badge
                    variant="outline"
                    className="text-xs text-orange-600"
                  >
                    Mínimo requerido
                  </Badge>
                )}
              </div>

              <Button
                onClick={handleAddBackground}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Añadir Background
              </Button>
            </div>

            {/* Lista de backgrounds con drag & drop */}
            <DndContext
              sensors={useSensors(
                useSensor(PointerSensor),
                useSensor(KeyboardSensor, {
                  coordinateGetter: sortableKeyboardCoordinates,
                }),
              )}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
                             <SortableContext
                 items={localBackgrounds.map((background) => background.id)}
                 strategy={verticalListSortingStrategy}
               >
                 <div className="space-y-3">
                   {localBackgrounds.map((background) => (
                     <SortableItem
                       key={background.id}
                       background={background}
                       onEdit={handleEditBackground}
                       onDelete={handleDeleteBackground}
                       canDelete={localBackgrounds.length > 1}
                     />
                   ))}
                 </div>
               </SortableContext>
            </DndContext>

            {localBackgrounds.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <PaintBucket
                  size={48}
                  className="mx-auto mb-4 text-gray-400"
                />
                <p className="mb-4">
                  No hay colores de background configurados
                </p>
                <Button onClick={handleAddBackground}>
                  Añadir primer background
                </Button>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button
              onClick={handleSaveChanges}
              disabled={!hasChanges}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para editar background */}
      <BackgroundColorEditor
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingBackground(undefined);
        }}
        backgroundColor={editingBackground}
        onSave={handleSaveBackground}
        tokens={tokens}
        onOpenTokenManager={onOpenTokenManager}
      />
    </>
  );
}