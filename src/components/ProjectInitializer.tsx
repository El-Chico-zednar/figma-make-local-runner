import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { 
  Plus, 
  FolderOpen, 
  Trash2, 
  Calendar,
  Palette,
  Layers,
  FileText,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';
import { ProjectStorage, Project, ProjectTheme } from './ProjectStorage';

interface ProjectInitializerProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (projectName: string, projectId: string, themeId: string, themeName: string) => void;
  onLoadProject: (
    contentColors: any[], 
    backgroundColor: any, 
    projectId: string, 
    projectName: string,
    themeId: string,
    themeName: string,
    tokens: any[]
  ) => void;
}

const getThemeIcon = (themeName: string) => {
  const name = themeName.toLowerCase();
  if (name.includes('dark') || name.includes('oscuro')) return <Moon size={14} />;
  if (name.includes('light') || name.includes('claro')) return <Sun size={14} />;
  if (name.includes('auto') || name.includes('sistema')) return <Monitor size={14} />;
  return <Palette size={14} />;
};

export default function ProjectInitializer({
  isOpen,
  onClose,
  onCreateProject,
  onLoadProject
}: ProjectInitializerProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<ProjectTheme | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState('existing');

  useEffect(() => {
    if (isOpen) {
      // Migrar datos antiguos si es necesario
      ProjectStorage.migrateOldData();
      
      const allProjects = ProjectStorage.getAllProjects();
      setProjects(allProjects);
      
      // Si no hay proyectos, cambiar a la pestaña de crear
      if (allProjects.length === 0) {
        setActiveTab('create');
      }
    }
  }, [isOpen]);

  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;
    
    console.log('🆕 [INITIALIZER] Creando nuevo proyecto:', newProjectName.trim());
    
    // Tokens iniciales para nuevos proyectos
    const initialTokens = [
      {
        id: 'token_1',
        name: 'primary/50',
        value: '#FEF7FF',
        category: 'primary'
      },
      {
        id: 'token_2',
        name: 'primary/500',
        value: '#9C27B0',
        category: 'primary'
      },
      {
        id: 'token_3',
        name: 'primary/900',
        value: '#4A148C',
        category: 'primary'
      },
      {
        id: 'token_4',
        name: 'neutral/100',
        value: '#F5F5F5',
        category: 'neutral'
      },
      {
        id: 'token_5',
        name: 'neutral/900',
        value: '#212121',
        category: 'neutral'
      }
    ];
    
    const newProject = ProjectStorage.createProject(newProjectName.trim(), initialTokens);
    const defaultTheme = Object.values(newProject.themes)[0];
    
    // Guardar el proyecto UNA SOLA VEZ aquí
    ProjectStorage.saveProject(newProject);
    
    console.log('✅ [INITIALIZER] Proyecto creado y guardado:', {
      projectId: newProject.id,
      themeId: defaultTheme.id,
      tokensCount: newProject.tokens.length
    });
    
    // Pasar los IDs correctos a App.tsx (que YA NO creará el proyecto de nuevo)
    onCreateProject(
      newProject.name,
      newProject.id,        // ID real del proyecto creado
      defaultTheme.id,      // ID real del tema creado
      defaultTheme.name
    );
    
    setNewProjectName('');
    onClose();
  };

  const handleLoadProject = (project: Project, theme: ProjectTheme) => {
    onLoadProject(
      theme.contentColors || [],
      theme.backgroundColor || {
        color: '#ffffff',
        name: 'Fondo principal',
        token: undefined
      },
      project.id,
      project.name,
      theme.id,
      theme.name,
      project.tokens || []
    );
    onClose();
  };

  const handleDeleteProject = (project: Project) => {
    setProjectToDelete(project);
    setShowDeleteDialog(true);
  };

  const confirmDeleteProject = () => {
    if (projectToDelete) {
      ProjectStorage.deleteProject(projectToDelete.id);
      setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
      setProjectToDelete(null);
      setShowDeleteDialog(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Fecha inválida';
    }
  };

  const getProjectStats = (project: Project) => {
    const themes = Object.values(project.themes);
    const totalColors = themes.reduce((sum, theme) => sum + (theme.contentColors?.length || 0), 0);
    const tokensCount = project.tokens?.length || 0;
    
    return {
      themesCount: themes.length,
      totalColors,
      tokensCount
    };
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Layers size={20} />
              Gestión de Proyectos y Temas
            </DialogTitle>
            <DialogDescription>
              Organiza tu trabajo en proyectos. Cada proyecto puede tener múltiples temas (variantes de color).
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="existing" className="flex items-center gap-2">
                <FolderOpen size={16} />
                Proyectos Existentes ({projects.length})
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center gap-2">
                <Plus size={16} />
                Crear Nuevo Proyecto
              </TabsTrigger>
            </TabsList>

            <TabsContent value="existing" className="space-y-4">
              {projects.length === 0 ? (
                <div className="text-center py-12">
                  <FileText size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-4">No hay proyectos guardados</p>
                  <Button onClick={() => setActiveTab('create')}>
                    Crear tu primer proyecto
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => {
                    const stats = getProjectStats(project);
                    const themes = Object.values(project.themes);
                    const isSelected = selectedProject?.id === project.id;
                    
                    return (
                      <Card key={project.id} className={`${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
                        <CardHeader className="pb-4">
                          <div className="space-y-4">
                            {/* Fila del título y botones principales */}
                            <div className="flex items-start justify-between gap-4">
                              <CardTitle className="flex items-center gap-2 text-lg">
                                <Layers size={18} />
                                <span className="truncate">{project.name}</span>
                              </CardTitle>
                              
                              <div className="flex gap-2 shrink-0">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedProject(isSelected ? null : project)}
                                  className="text-sm"
                                >
                                  {isSelected ? 'Contraer' : 'Ver Temas'}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteProject(project)}
                                  className="text-red-600 hover:text-red-700 shrink-0"
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </div>
                            </div>
                            
                            {/* Fila de información del proyecto */}
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                              <div className="flex items-center gap-1 shrink-0">
                                <Calendar size={14} />
                                <span className="text-xs sm:text-sm">{formatDate(project.lastModified)}</span>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="secondary" className="text-xs">
                                  {stats.themesCount} tema{stats.themesCount !== 1 ? 's' : ''}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {stats.totalColors} colores
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {stats.tokensCount} tokens
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        
                        {isSelected && (
                          <CardContent>
                            <div className="space-y-3">
                              <h4 className="text-sm font-medium text-gray-700">
                                Selecciona un tema para cargar:
                              </h4>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {themes.map((theme) => {
                                  const colorCount = theme.contentColors?.length || 0;
                                  
                                  return (
                                    <Card 
                                      key={theme.id}
                                      className={`cursor-pointer transition-all hover:shadow-md ${
                                        selectedTheme?.id === theme.id ? 'ring-2 ring-green-500' : ''
                                      }`}
                                      onClick={() => setSelectedTheme(theme)}
                                    >
                                      <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-2">
                                            {getThemeIcon(theme.name)}
                                            <span className="font-medium text-sm">{theme.name}</span>
                                          </div>
                                          {project.activeThemeId === theme.id && (
                                            <Badge variant="default" className="text-xs">
                                              Principal
                                            </Badge>
                                          )}
                                        </div>
                                      </CardHeader>
                                      
                                      <CardContent className="pt-0">
                                        <div className="space-y-2">
                                          <div className="text-xs text-gray-600">
                                            {colorCount} colores de contenido
                                          </div>
                                          
                                          {theme.backgroundColor && (
                                            <div className="flex items-center gap-2">
                                              <div 
                                                className="w-3 h-3 rounded border border-gray-300"
                                                style={{ backgroundColor: theme.backgroundColor.color }}
                                              />
                                              <span className="text-xs text-gray-500 truncate">
                                                {theme.backgroundColor.name}
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      </CardContent>
                                    </Card>
                                  );
                                })}
                              </div>
                              
                              {selectedTheme && (
                                <div className="flex justify-end pt-3 border-t">
                                  <Button 
                                    onClick={() => handleLoadProject(project, selectedTheme)}
                                    className="flex items-center gap-2"
                                  >
                                    <FolderOpen size={16} />
                                    Cargar "{selectedTheme.name}"
                                  </Button>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="create" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Crear Nuevo Proyecto</CardTitle>
                  <DialogDescription>
                    Los proyectos incluyen tokens de color compartidos y pueden tener múltiples temas.
                  </DialogDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="projectName">Nombre del proyecto</Label>
                    <Input
                      id="projectName"
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      placeholder="ej. Sistema de Diseño 2024, App Mobile..."
                      onKeyDown={(e) => e.key === 'Enter' && handleCreateProject()}
                    />
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">
                      ¿Qué incluye un proyecto nuevo?
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Un tema principal por defecto</li>
                      <li>• Biblioteca de tokens de color compartida</li>
                      <li>• Configuración de guardado automático</li>
                      <li>• Capacidad de crear múltiples temas/variantes</li>
                    </ul>
                  </div>
                </CardContent>
                
                <DialogFooter className="px-6 pb-6">
                  <Button 
                    onClick={handleCreateProject}
                    disabled={!newProjectName.trim()}
                    className="flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Crear Proyecto
                  </Button>
                </DialogFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar proyecto */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar proyecto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente el proyecto "{projectToDelete?.name}" y todos sus temas.
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteProject}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Eliminar Proyecto
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}