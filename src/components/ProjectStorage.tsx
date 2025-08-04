interface ProjectTheme {
  id: string;
  name: string;
  contentColors: any[];
  backgroundColors: any[]; // Cambio de backgroundColor a backgroundColors (array)
  createdAt: string;
  lastModified: string;
}

interface Project {
  id: string;
  name: string;
  tokens: any[];
  themes: { [themeId: string]: ProjectTheme };
  activeThemeId: string;
  createdAt: string;
  lastModified: string;
}

interface AppState {
  hasSeenWelcome: boolean;
  currentProjectId?: string;
  currentThemeId?: string;
}

export class ProjectStorage {
  private static readonly PROJECTS_KEY = 'figma-make-projects-v3'; // Incremento versión para migración
  private static readonly APP_STATE_KEY = 'figma-make-app-state-v3';
  private static readonly CURRENT_PROJECT_KEY = 'figma-make-current-project-v3';

  static getAppState(): AppState {
    try {
      const stored = localStorage.getItem(this.APP_STATE_KEY);
      return stored ? JSON.parse(stored) : { hasSeenWelcome: false };
    } catch {
      return { hasSeenWelcome: false };
    }
  }

  static setAppState(state: AppState): void {
    localStorage.setItem(this.APP_STATE_KEY, JSON.stringify(state));
  }

  static markWelcomeSeen(): void {
    const state = this.getAppState();
    state.hasSeenWelcome = true;
    this.setAppState(state);
  }

  static getAllProjects(): Project[] {
    try {
      const stored = localStorage.getItem(this.PROJECTS_KEY);
      const projects = stored ? JSON.parse(stored) : {};
      return Object.values(projects);
    } catch {
      return [];
    }
  }

  static getProject(projectId: string): Project | null {
    try {
      const stored = localStorage.getItem(this.PROJECTS_KEY);
      const projects = stored ? JSON.parse(stored) : {};
      return projects[projectId] || null;
    } catch {
      return null;
    }
  }

  static saveProject(project: Project): void {
    try {
      const stored = localStorage.getItem(this.PROJECTS_KEY) || '{}';
      const projects = JSON.parse(stored);
      
      // Log si el proyecto ya existe (duplicación)
      if (projects[project.id]) {
        console.log('⚠️ [STORAGE] Sobrescribiendo proyecto existente:', {
          projectId: project.id,
          projectName: project.name,
          existingLastModified: projects[project.id].lastModified
        });
      } else {
        console.log('✅ [STORAGE] Guardando nuevo proyecto:', {
          projectId: project.id,
          projectName: project.name
        });
      }
      
      projects[project.id] = {
        ...project,
        lastModified: new Date().toISOString()
      };
      localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(projects));
      
      console.log('💾 [STORAGE] Proyecto guardado exitosamente');
    } catch (error) {
      console.error('❌ [STORAGE] Error saving project:', error);
    }
  }

  static deleteProject(projectId: string): void {
    try {
      const stored = localStorage.getItem(this.PROJECTS_KEY) || '{}';
      const projects = JSON.parse(stored);
      delete projects[projectId];
      localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(projects));
      
      // Clear current project if it's the one being deleted
      const currentProject = this.getCurrentProject();
      if (currentProject?.projectId === projectId) {
        this.clearCurrentProject();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  }

  static getCurrentProject(): { projectId: string; projectName: string; themeId: string; themeName: string } | null {
    try {
      const stored = localStorage.getItem(this.CURRENT_PROJECT_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  static setCurrentProject(projectId: string, projectName: string, themeId: string, themeName: string): void {
    const current = { projectId, projectName, themeId, themeName };
    localStorage.setItem(this.CURRENT_PROJECT_KEY, JSON.stringify(current));
    
    const appState = this.getAppState();
    appState.currentProjectId = projectId;
    appState.currentThemeId = themeId;
    this.setAppState(appState);
  }

  static clearCurrentProject(): void {
    localStorage.removeItem(this.CURRENT_PROJECT_KEY);
    const appState = this.getAppState();
    delete appState.currentProjectId;
    delete appState.currentThemeId;
    this.setAppState(appState);
  }

  static createDefaultTheme(name: string = 'Tema Principal'): ProjectTheme {
    return {
      id: `theme_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      contentColors: [],
      backgroundColors: [
        {
          id: `bg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          color: '#ffffff',
          name: 'Fondo principal',
          token: undefined,
          tokenId: undefined
        }
      ],
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
  }

  static createProject(name: string, initialTokens: any[] = []): Project {
    const defaultTheme = this.createDefaultTheme();
    
    const newProject = {
      id: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      tokens: initialTokens,
      themes: { [defaultTheme.id]: defaultTheme },
      activeThemeId: defaultTheme.id,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    
    console.log('🏗️ [STORAGE] Proyecto creado en memoria:', {
      projectId: newProject.id,
      projectName: newProject.name,
      themeId: defaultTheme.id,
      themeName: defaultTheme.name,
      tokensCount: initialTokens.length
    });
    
    return newProject;
  }

  static addThemeToProject(projectId: string, themeName: string): ProjectTheme | null {
    try {
      const project = this.getProject(projectId);
      if (!project) return null;

      const newTheme = this.createDefaultTheme(themeName);
      project.themes[newTheme.id] = newTheme;
      this.saveProject(project);
      
      return newTheme;
    } catch (error) {
      console.error('Error adding theme to project:', error);
      return null;
    }
  }

  static deleteThemeFromProject(projectId: string, themeId: string): boolean {
    try {
      const project = this.getProject(projectId);
      if (!project || Object.keys(project.themes).length <= 1) return false;

      delete project.themes[themeId];
      
      // If we deleted the active theme, set a new active theme
      if (project.activeThemeId === themeId) {
        project.activeThemeId = Object.keys(project.themes)[0];
      }
      
      this.saveProject(project);
      return true;
    } catch (error) {
      console.error('Error deleting theme from project:', error);
      return false;
    }
  }

  static updateTheme(projectId: string, themeId: string, themeData: Partial<ProjectTheme>): boolean {
    try {
      const project = this.getProject(projectId);
      if (!project || !project.themes[themeId]) return false;

      project.themes[themeId] = {
        ...project.themes[themeId],
        ...themeData,
        lastModified: new Date().toISOString()
      };
      
      this.saveProject(project);
      return true;
    } catch (error) {
      console.error('Error updating theme:', error);
      return false;
    }
  }

  static updateProjectTokens(projectId: string, tokens: any[]): boolean {
    try {
      const project = this.getProject(projectId);
      if (!project) return false;

      project.tokens = tokens;
      this.saveProject(project);
      return true;
    } catch (error) {
      console.error('Error updating project tokens:', error);
      return false;
    }
  }

  // Método para migrar datos de versiones anteriores
  static migrateOldData(): void {
    try {
      // Migrar de v2 a v3 (backgroundColor -> backgroundColors)
      const oldProjectsV2 = localStorage.getItem('figma-make-projects-v2');
      if (oldProjectsV2 && !localStorage.getItem(this.PROJECTS_KEY)) {
        const oldData = JSON.parse(oldProjectsV2);
        const migratedProjects: { [key: string]: Project } = {};
        
        Object.values(oldData).forEach((oldProject: any) => {
          const migratedThemes: { [key: string]: ProjectTheme } = {};
          
          Object.values(oldProject.themes).forEach((oldTheme: any) => {
            const newTheme: ProjectTheme = {
              ...oldTheme,
              backgroundColors: oldTheme.backgroundColor ? [
                {
                  id: `bg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                  color: oldTheme.backgroundColor.color || '#ffffff',
                  name: oldTheme.backgroundColor.name || 'Fondo principal',
                  token: oldTheme.backgroundColor.token,
                  tokenId: oldTheme.backgroundColor.tokenId
                }
              ] : [
                {
                  id: `bg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                  color: '#ffffff',
                  name: 'Fondo principal',
                  token: undefined,
                  tokenId: undefined
                }
              ]
            };
            
            // Eliminar la propiedad antigua
            delete (newTheme as any).backgroundColor;
            migratedThemes[newTheme.id] = newTheme;
          });
          
          migratedProjects[oldProject.id] = {
            ...oldProject,
            themes: migratedThemes
          };
        });
        
        localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(migratedProjects));
      }

      // Migrar datos más antiguos (v1)
      const oldProjects = localStorage.getItem('figma-make-projects');
      if (oldProjects && !localStorage.getItem(this.PROJECTS_KEY)) {
        const oldData = JSON.parse(oldProjects);
        const migratedProjects: { [key: string]: Project } = {};
        
        Object.values(oldData).forEach((oldProject: any) => {
          const defaultTheme = this.createDefaultTheme();
          defaultTheme.contentColors = oldProject.contentColors || [];
          
          if (oldProject.backgroundColor) {
            defaultTheme.backgroundColors = [
              {
                id: `bg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                color: oldProject.backgroundColor.color || '#ffffff',
                name: oldProject.backgroundColor.name || 'Fondo principal',
                token: oldProject.backgroundColor.token,
                tokenId: oldProject.backgroundColor.tokenId
              }
            ];
          }
          
          const newProject: Project = {
            id: oldProject.id,
            name: oldProject.name,
            tokens: oldProject.tokens || [],
            themes: { [defaultTheme.id]: defaultTheme },
            activeThemeId: defaultTheme.id,
            createdAt: oldProject.createdAt || new Date().toISOString(),
            lastModified: oldProject.lastModified || new Date().toISOString()
          };
          
          migratedProjects[newProject.id] = newProject;
        });
        
        localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(migratedProjects));
      }
      
      // Migrar estados de aplicación
      const oldAppStateV2 = localStorage.getItem('figma-make-app-state-v2');
      const oldAppState = localStorage.getItem('figma-make-app-state');
      
      if ((oldAppStateV2 || oldAppState) && !localStorage.getItem(this.APP_STATE_KEY)) {
        const stateToMigrate = oldAppStateV2 || oldAppState;
        localStorage.setItem(this.APP_STATE_KEY, stateToMigrate);
      }
    } catch (error) {
      console.error('Error during migration:', error);
    }
  }
}

export type { Project, ProjectTheme, AppState };