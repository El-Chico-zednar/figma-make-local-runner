import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  Save, 
  FolderOpen, 
  Trash2, 
  Download, 
  Upload, 
  Calendar,
  Palette,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { ProjectStorage, SavedProject, generateUniqueId, formatDate, calculateAverageContrast } from './ProjectStorage';
import { ContentColor } from './ContentColorEditor';
import { BackgroundColor } from './BackgroundColorEditor';
import { getContrastRatio, getAccessibilityLevel } from './ContrastCalculator';

interface ProjectManagerProps {
  currentProject: {
    contentColors: ContentColor[];
    backgroundColor: BackgroundColor;
  };
  onLoadProject: (contentColors: ContentColor[], backgroundColor: BackgroundColor) => void;
}

interface SaveProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description?: string) => void;
  isLoading?: boolean;
}

function SaveProjectDialog({ isOpen, onClose, onSave, isLoading }: SaveProjectDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim(), description.trim() || undefined);
      setName('');
      setDescription('');
    }
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save size={20} />
            Guardar Proyecto
          </DialogTitle>
          <DialogDescription>
            Guarda tu tabla de contrastes actual como un proyecto para poder cargarla más tarde.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="project-name">Nombre del proyecto *</Label>
            <Input
              id="project-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Sistema de colores - App móvil"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="project-description">Descripción (opcional)</Label>
            <Textarea
              id="project-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe el propósito de esta tabla de contrastes..."
              className="mt-1"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!name.trim() || isLoading}
            >
              {isLoading ? 'Guardando...' : 'Guardar Proyecto'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProjectCard({ project, onLoad, onDelete, onPreview }: {
  project: SavedProject;
  onLoad: () => void;
  onDelete: () => void;
  onPreview: () => void;
}) {
  const averageContrast = project.metadata.averageContrast || 0;
  const contrastLevel = getAccessibilityLevel(averageContrast);
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base leading-tight">{project.name}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar size={14} />
              {formatDate(project.updatedAt)}
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Badge variant={contrastLevel === 'AAA' ? 'default' : contrastLevel === 'AA' ? 'secondary' : 'destructive'}>
              {contrastLevel}
            </Badge>
          </div>
        </div>
        
        {project.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Preview de colores */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Palette size={14} />
            <span className="text-sm font-medium">
              {project.metadata.totalColors} colores
            </span>
          </div>
          
          <div className="flex gap-1">
            <div 
              className="w-8 h-8 rounded border-2 border-gray-300 flex-shrink-0"
              style={{ backgroundColor: project.backgroundColor.color }}
              title={`Background: ${project.backgroundColor.name}`}
            />
            {project.contentColors.slice(0, 6).map((color, index) => (
              <div
                key={color.id}
                className="w-6 h-8 rounded border border-gray-200 flex-shrink-0"
                style={{ backgroundColor: color.color }}
                title={color.name}
              />
            ))}
            {project.contentColors.length > 6 && (
              <div className="w-6 h-8 rounded border border-gray-200 bg-gray-100 flex items-center justify-center text-xs text-gray-600">
                +{project.contentColors.length - 6}
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" onClick={onPreview} variant="outline" className="flex-1">
              <Eye size={14} />
              Vista previa
            </Button>
            <Button size="sm" onClick={onLoad} className="flex-1">
              <FolderOpen size={14} />
              Cargar
            </Button>
            <Button size="sm" onClick={onDelete} variant="destructive">
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProjectManager({ currentProject, onLoadProject }: ProjectManagerProps) {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isLoadDialogOpen, setIsLoadDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<SavedProject[]>([]);

  const loadProjects = () => {
    const savedProjects = ProjectStorage.getAllProjects();
    setProjects(savedProjects);
  };

  const handleSaveProject = async (name: string, description?: string) => {
    setIsLoading(true);
    
    try {
      const project: SavedProject = {
        id: generateUniqueId(),
        name,
        description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        backgroundColor: currentProject.backgroundColor,
        contentColors: currentProject.contentColors,
        metadata: {
          totalColors: currentProject.contentColors.length,
          averageContrast: calculateAverageContrast(
            currentProject.contentColors, 
            currentProject.backgroundColor.color
          )
        }
      };
      
      const success = ProjectStorage.saveProject(project);
      
      if (success) {
        setIsSaveDialogOpen(false);
        alert('✅ Proyecto guardado exitosamente!');
      } else {
        alert('❌ Error al guardar el proyecto. Intenta de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadProject = (project: SavedProject) => {
    try {
      onLoadProject(project.contentColors, project.backgroundColor);
      setIsLoadDialogOpen(false);
      alert(`✅ Proyecto "${project.name}" cargado exitosamente!`);
    } catch (error) {
      console.error('Error loading project:', error);
      alert('❌ Error al cargar el proyecto.');
    }
  };

  const handleDeleteProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    const confirmed = confirm(`¿Estás seguro de que quieres eliminar el proyecto "${project.name}"?\n\nEsta acción no se puede deshacer.`);
    
    if (confirmed) {
      const success = ProjectStorage.deleteProject(projectId);
      if (success) {
        loadProjects(); // Recargar lista
        alert('🗑️ Proyecto eliminado');
      } else {
        alert('❌ Error al eliminar el proyecto');
      }
    }
  };

  const handleExportProjects = () => {
    try {
      const exportData = ProjectStorage.exportProjects();
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `contrast-projects-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
      alert('📁 Proyectos exportados exitosamente');
    } catch (error) {
      console.error('Error exporting projects:', error);
      alert('❌ Error al exportar proyectos');
    }
  };

  const handleImportProjects = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = e.target?.result as string;
          const success = ProjectStorage.importProjects(jsonData);
          
          if (success) {
            loadProjects(); // Recargar lista
            alert('📥 Proyectos importados exitosamente');
          } else {
            alert('❌ Error al importar proyectos. Verifica el formato del archivo.');
          }
        } catch (error) {
          console.error('Import error:', error);
          alert('❌ Error al leer el archivo. Asegúrate de que sea un JSON válido.');
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  };

  const openLoadDialog = () => {
    loadProjects();
    setIsLoadDialogOpen(true);
  };

  return (
    <>
      {/* Botones principales */}
      <div className="flex gap-2">
        <Button 
          onClick={() => setIsSaveDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Save size={16} />
          Guardar Proyecto
        </Button>
        
        <Button 
          onClick={openLoadDialog}
          variant="outline"
          className="flex items-center gap-2"
        >
          <FolderOpen size={16} />
          Cargar Proyecto
        </Button>
      </div>

      {/* Dialog para guardar proyecto */}
      <SaveProjectDialog
        isOpen={isSaveDialogOpen}
        onClose={() => setIsSaveDialogOpen(false)}
        onSave={handleSaveProject}
        isLoading={isLoading}
      />

      {/* Dialog para cargar proyecto */}
      <Dialog open={isLoadDialogOpen} onOpenChange={setIsLoadDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <FolderOpen size={20} />
                Proyectos Guardados
              </DialogTitle>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleExportProjects}>
                  <Download size={14} />
                  Exportar
                </Button>
                <Button size="sm" variant="outline" onClick={handleImportProjects}>
                  <Upload size={14} />
                  Importar
                </Button>
              </div>
            </div>
            <DialogDescription>
              Selecciona un proyecto guardado para cargar su configuración de colores y continuar trabajando con él.
            </DialogDescription>
          </DialogHeader>
          
          <div className="max-h-[60vh] overflow-y-auto">
            {projects.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FolderOpen size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No hay proyectos guardados</p>
                <p className="text-sm">Guarda tu primera tabla de contrastes para empezar</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects
                  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                  .map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onLoad={() => handleLoadProject(project)}
                      onDelete={() => handleDeleteProject(project.id)}
                      onPreview={() => {
                        // Preview simple - se podría expandir a un modal más detallado
                        alert(`Proyecto: ${project.name}\nColores: ${project.metadata.totalColors}\nContraste promedio: ${project.metadata.averageContrast?.toFixed(2) || 'N/A'}`);
                      }}
                    />
                  ))}
              </div>
            )}
          </div>
          
          {projects.length > 0 && (
            <div className="flex justify-between items-center pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                {projects.length} proyecto{projects.length !== 1 ? 's' : ''} guardado{projects.length !== 1 ? 's' : ''}
              </p>
              
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => {
                  if (confirm('¿Estás seguro de que quieres eliminar TODOS los proyectos?\n\nEsta acción no se puede deshacer.')) {
                    ProjectStorage.clearAllProjects();
                    loadProjects();
                    alert('🗑️ Todos los proyectos han sido eliminados');
                  }
                }}
                className="text-destructive hover:text-destructive"
              >
                <AlertTriangle size={14} />
                Eliminar todos
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}