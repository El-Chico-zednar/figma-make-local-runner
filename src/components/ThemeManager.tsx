import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { 
  Plus, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Palette,
  Moon,
  Sun,
  Monitor,
  Layers
} from 'lucide-react';
import { ProjectTheme } from './ProjectStorage';

interface ThemeManagerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ProjectTheme;
  allThemes: { [themeId: string]: ProjectTheme };
  onSwitchTheme: (themeId: string) => void;
  onCreateTheme: (name: string) => void;
  onRenameTheme: (themeId: string, newName: string) => void;
  onDeleteTheme: (themeId: string) => void;
  onDuplicateTheme: (themeId: string, newName: string) => void;
}

const getThemeIcon = (themeName: string) => {
  const name = themeName.toLowerCase();
  if (name.includes('dark') || name.includes('oscuro')) return <Moon size={14} />;
  if (name.includes('light') || name.includes('claro')) return <Sun size={14} />;
  if (name.includes('auto') || name.includes('sistema')) return <Monitor size={14} />;
  return <Palette size={14} />;
};

export default function ThemeManager({
  isOpen,
  onClose,
  currentTheme,
  allThemes,
  onSwitchTheme,
  onCreateTheme,
  onRenameTheme,
  onDeleteTheme,
  onDuplicateTheme
}: ThemeManagerProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);
  const [newThemeName, setNewThemeName] = useState('');
  const [editingThemeId, setEditingThemeId] = useState<string | null>(null);
  const [duplicatingThemeId, setDuplicatingThemeId] = useState<string | null>(null);

  const themes = Object.values(allThemes);
  const canDeleteTheme = themes.length > 1;

  // Si currentTheme es null, no renderizar nada o mostrar loading
  if (!currentTheme) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center py-8">
          <p className="text-gray-500">Cargando información del tema...</p>
        </div>
      </div>
    );
  }

  const handleCreateTheme = () => {
    if (newThemeName.trim()) {
      onCreateTheme(newThemeName.trim());
      setNewThemeName('');
      setShowCreateDialog(false);
    }
  };

  const handleRenameTheme = () => {
    if (newThemeName.trim() && editingThemeId) {
      onRenameTheme(editingThemeId, newThemeName.trim());
      setNewThemeName('');
      setEditingThemeId(null);
      setShowRenameDialog(false);
    }
  };

  const handleDuplicateTheme = () => {
    if (newThemeName.trim() && duplicatingThemeId) {
      onDuplicateTheme(duplicatingThemeId, newThemeName.trim());
      setNewThemeName('');
      setDuplicatingThemeId(null);
      setShowDuplicateDialog(false);
    }
  };

  const startRename = (theme: ProjectTheme) => {
    setEditingThemeId(theme.id);
    setNewThemeName(theme.name);
    setShowRenameDialog(true);
  };

  const startDuplicate = (theme: ProjectTheme) => {
    setDuplicatingThemeId(theme.id);
    setNewThemeName(`${theme.name} (Copia)`);
    setShowDuplicateDialog(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Layers size={20} />
              Gestión de Temas
            </DialogTitle>
            <DialogDescription>
              Administra las variantes de color de tu proyecto. Cada tema puede tener diferentes colores usando los mismos tokens.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Header con información del tema actual */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {getThemeIcon(currentTheme.name)}
                  <h3 className="text-sm font-medium">Tema Actual</h3>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <span>{currentTheme.name}</span>
                </Badge>
              </div>
              
              <Button
                onClick={() => setShowCreateDialog(true)}
                size="sm"
                className="flex items-center gap-2"
              >
                <Plus size={14} />
                Nuevo Tema
              </Button>
            </div>

            {/* Lista de temas disponibles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {themes.map((theme) => {
                const isActive = theme.id === currentTheme.id;
                const colorCount = theme.contentColors?.length || 0;
                
                return (
                  <Card 
                    key={theme.id} 
                    className={`relative cursor-pointer transition-all ${
                      isActive 
                        ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => !isActive && onSwitchTheme(theme.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getThemeIcon(theme.name)}
                          <CardTitle className="text-sm truncate">
                            {theme.name}
                          </CardTitle>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical size={14} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {!isActive && (
                              <>
                                <DropdownMenuItem onClick={() => onSwitchTheme(theme.id)}>
                                  <Layers size={14} className="mr-2" />
                                  Cambiar a este tema
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                              </>
                            )}
                            <DropdownMenuItem onClick={() => startRename(theme)}>
                              <Edit3 size={14} className="mr-2" />
                              Renombrar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => startDuplicate(theme)}>
                              <Palette size={14} className="mr-2" />
                              Duplicar
                            </DropdownMenuItem>
                            {canDeleteTheme && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => onDeleteTheme(theme.id)}
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
                    
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span>{colorCount} colores</span>
                          <span>•</span>
                          <span>Fondo: {theme.backgroundColor?.name || 'Sin configurar'}</span>
                        </div>
                        
                        {theme.backgroundColor && (
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded border border-gray-300"
                              style={{ backgroundColor: theme.backgroundColor.color }}
                            />
                            <span className="text-xs text-gray-500">
                              {theme.backgroundColor.color}
                            </span>
                          </div>
                        )}
                        
                        {isActive && (
                          <Badge variant="default" className="text-xs">
                            Activo
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Diálogo para crear nuevo tema */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Tema</DialogTitle>
            <DialogDescription>
              Los temas permiten organizar diferentes variantes de tu sistema de colores (ej: claro/oscuro, diferentes marcas, etc.)
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="themeName">Nombre del tema</Label>
              <Input
                id="themeName"
                value={newThemeName}
                onChange={(e) => setNewThemeName(e.target.value)}
                placeholder="ej. Tema Oscuro, Marca Secundaria..."
                onKeyDown={(e) => e.key === 'Enter' && handleCreateTheme()}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateTheme}
              disabled={!newThemeName.trim()}
            >
              Crear Tema
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para renombrar tema */}
      <Dialog open={showRenameDialog} onOpenChange={setShowRenameDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Renombrar Tema</DialogTitle>
            <DialogDescription>
              Cambia el nombre del tema seleccionado. Esto no afectará su configuración o colores.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="renameThemeName">Nuevo nombre</Label>
              <Input
                id="renameThemeName"
                value={newThemeName}
                onChange={(e) => setNewThemeName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRenameTheme()}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRenameDialog(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleRenameTheme}
              disabled={!newThemeName.trim()}
            >
              Renombrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para duplicar tema */}
      <Dialog open={showDuplicateDialog} onOpenChange={setShowDuplicateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Duplicar Tema</DialogTitle>
            <DialogDescription>
              Se creará una copia exacta del tema con todos sus colores y configuración.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="duplicateThemeName">Nombre para la copia</Label>
              <Input
                id="duplicateThemeName"
                value={newThemeName}
                onChange={(e) => setNewThemeName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleDuplicateTheme()}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDuplicateDialog(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleDuplicateTheme}
              disabled={!newThemeName.trim()}
            >
              Duplicar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}