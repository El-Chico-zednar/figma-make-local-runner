import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";
import {
  Plus,
  Download,
  Share,
  Palette,
  PaintBucket,
  Save,
  FolderOpen,
  Upload,
  List,
  Settings,
  Layers,
  Cloud,
  LogOut,
  User,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Badge } from "./components/ui/badge";

import { Separator } from "./components/ui/separator";
import ContrastTableHeader from "./components/ContrastTableHeader";
import ContrastTableRow from "./components/ContrastTableRow";
import ContentColorEditor, {
  ContentColor,
  WCAGType,
} from "./components/ContentColorEditor";
import BackgroundColorEditor, {
  BackgroundColor,
} from "./components/BackgroundColorEditor";
import BackgroundColorManager from "./components/BackgroundColorManager";
import BulkColorEditor from "./components/BulkColorEditor";
import ContentColorManager from "./components/ContentColorManager";
import ProjectInitializer from "./components/ProjectInitializer";
import TokenManager, {
  ColorToken,
} from "./components/TokenManager";
import ThemeManager from "./components/ThemeManager";
import {
  ProjectStorage,
  Project,
  ProjectTheme,
} from "./components/ProjectStorage";
import {
  exportToPNG,
  exportToFigmaFrame,
} from "./components/ExportUtils";

const initialTokens: ColorToken[] = [
  {
    id: "token_1",
    name: "primary/50",
    value: "#FEF7FF",
    category: "primary",
  },
  {
    id: "token_2",
    name: "primary/500",
    value: "#9C27B0",
    category: "primary",
  },
  {
    id: "token_3",
    name: "primary/900",
    value: "#4A148C",
    category: "primary",
  },
  {
    id: "token_4",
    name: "neutral/100",
    value: "#F5F5F5",
    category: "neutral",
  },
  {
    id: "token_5",
    name: "neutral/900",
    value: "#212121",
    category: "neutral",
  },
];

export default function App() {
  // Estado principal del proyecto y tema actual
  const [currentProject, setCurrentProject] =
    useState<Project | null>(null);
  const [currentTheme, setCurrentTheme] =
    useState<ProjectTheme | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Estados para editores modales
  const [editingContentColor, setEditingContentColor] =
    useState<ContentColor | undefined>();
  const [editingBackgroundId, setEditingBackgroundId] =
    useState<string | undefined>();
  const [isContentEditorOpen, setIsContentEditorOpen] =
    useState(false);
  const [isBackgroundEditorOpen, setIsBackgroundEditorOpen] =
    useState(false);
  const [isBackgroundManagerOpen, setIsBackgroundManagerOpen] =
    useState(false);
  const [isBulkEditorOpen, setIsBulkEditorOpen] =
    useState(false);
  const [isColorManagerOpen, setIsColorManagerOpen] =
    useState(false);
  const [isTokenManagerOpen, setIsTokenManagerOpen] =
    useState(false);
  const [isThemeManagerOpen, setIsThemeManagerOpen] =
    useState(false);

  // Estados para el sistema de proyectos
  const [showProjectInitializer, setShowProjectInitializer] =
    useState(false);

  // Estados para crear nuevo tema
  const [isCreateThemeOpen, setIsCreateThemeOpen] =
    useState(false);
  const [newThemeName, setNewThemeName] = useState("");
  const [isCreatingTheme, setIsCreatingTheme] = useState(false);

  // Ref para control de auto-guardado
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(
    null,
  );

  // Computed values - MEJORADOS con logging
  const contentColors = currentTheme?.contentColors || [];
  const backgroundColors = currentTheme?.backgroundColors || [
    {
      id: "default",
      color: "#ffffff",
      name: "Fondo principal",
      token: undefined,
    },
  ];
  const primaryBackground = backgroundColors[0];
  const tokens = currentProject?.tokens || [];

  // Función para recargar el estado desde localStorage FORZADAMENTE
  const forceReloadFromStorage = useCallback(
    (projectId: string, themeId: string) => {
      console.log(
        "🔄 [RELOAD] Forzando recarga desde localStorage...",
        { projectId, themeId },
      );

      try {
        const reloadedProject =
          ProjectStorage.getProject(projectId);

        if (
          reloadedProject &&
          reloadedProject.themes[themeId]
        ) {
          const reloadedTheme = reloadedProject.themes[themeId];

          console.log("📊 [RELOAD] Datos recargados:", {
            projectName: reloadedProject.name,
            themeName: reloadedTheme.name,
            contentColors:
              reloadedTheme.contentColors?.length || 0,
            backgroundColors:
              reloadedTheme.backgroundColors?.length || 0,
          });

          // Actualizar estado de React
          setCurrentProject(reloadedProject);
          setCurrentTheme(reloadedTheme);

          console.log(
            "✅ [RELOAD] Estado actualizado exitosamente",
          );
          return true;
        } else {
          console.error(
            "❌ [RELOAD] Proyecto o tema no encontrado tras recarga",
          );
          return false;
        }
      } catch (error) {
        console.error(
          "❌ [RELOAD] Error en recarga forzada:",
          error,
        );
        return false;
      }
    },
    [],
  );

  // Función de guardado robusto MEJORADA con recarga forzada
  const saveTheme = useCallback(
    (
      projectId: string,
      themeId: string,
      contentColors: ContentColor[],
      backgroundColors: BackgroundColor[],
    ) => {
      console.log(
        "💾 [SAVE] INICIO - Guardando tema:",
        themeId,
      );
      console.log("💾 [SAVE] Datos a guardar:", {
        contentColors: contentColors.length,
        backgroundColors: backgroundColors.length,
        contentColorNames: contentColors.map((c) => c.name),
        backgroundColorNames: backgroundColors.map(
          (bg) => bg.name,
        ),
      });

      try {
        // 1. Guardar usando ProjectStorage con datos clonados
        ProjectStorage.updateTheme(projectId, themeId, {
          contentColors: contentColors.map((color) => ({
            ...color,
          })),
          backgroundColors: backgroundColors.map((bg) => ({
            ...bg,
          })),
        });

        console.log(
          "💾 [SAVE] Datos guardados en localStorage",
        );

        // 2. Verificación inmediata
        const verification =
          ProjectStorage.getProject(projectId);
        const verifiedTheme = verification?.themes[themeId];

        if (verifiedTheme) {
          console.log("✅ [SAVE] Verificación exitosa:", {
            contentColors:
              verifiedTheme.contentColors?.length || 0,
            backgroundColors:
              verifiedTheme.backgroundColors?.length || 0,
          });

          // 3. FORZAR RECARGA DEL ESTADO - ESTO ES CLAVE
          console.log(
            "🔄 [SAVE] Forzando recarga del estado...",
          );
          const reloadSuccess = forceReloadFromStorage(
            projectId,
            themeId,
          );

          if (reloadSuccess) {
            console.log(
              "✅ [SAVE] GUARDADO Y RECARGA COMPLETADOS EXITOSAMENTE",
            );
          } else {
            console.warn(
              "⚠️ [SAVE] Guardado exitoso pero fallo en recarga",
            );
          }

          // 4. Log de discrepancias
          if (
            verifiedTheme.contentColors?.length !==
            contentColors.length
          ) {
            console.warn(
              "⚠️ [SAVE] DISCREPANCIA en content colors:",
              {
                esperados: contentColors.length,
                guardados:
                  verifiedTheme.contentColors?.length || 0,
              },
            );
          }

          if (
            verifiedTheme.backgroundColors?.length !==
            backgroundColors.length
          ) {
            console.warn(
              "⚠️ [SAVE] DISCREPANCIA en background colors:",
              {
                esperados: backgroundColors.length,
                guardados:
                  verifiedTheme.backgroundColors?.length || 0,
              },
            );
          }

          return true;
        } else {
          console.error(
            "❌ [SAVE] Error en verificación - tema no encontrado",
          );
          return false;
        }
      } catch (error) {
        console.error("❌ [SAVE] Error en guardado:", error);
        return false;
      }
    },
    [forceReloadFromStorage],
  );

  // Auto-guardado simplificado con logging mejorado
  useEffect(() => {
    if (!currentProject || !currentTheme || isLoading) {
      return;
    }

    // Limpiar timeout anterior
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    // Log del estado actual
    console.log("⏰ [AUTO-SAVE] Estado actual detectado:", {
      projectId: currentProject.id,
      themeId: currentTheme.id,
      contentColors: currentTheme.contentColors.length,
      backgroundColors: currentTheme.backgroundColors.length,
      isLoading,
    });

    // Solo auto-guardar si hay contenido
    if (
      currentTheme.contentColors.length > 0 ||
      currentTheme.backgroundColors.length > 1
    ) {
      console.log(
        "⏰ [AUTO-SAVE] Programando auto-guardado en 2 segundos...",
      );

      autoSaveTimeoutRef.current = setTimeout(() => {
        console.log(
          "🔄 [AUTO-SAVE] EJECUTANDO auto-guardado...",
        );

        const success = saveTheme(
          currentProject.id,
          currentTheme.id,
          currentTheme.contentColors,
          currentTheme.backgroundColors,
        );

        if (success) {
          console.log(
            "✅ [AUTO-SAVE] Auto-guardado completado",
          );
        } else {
          console.error(
            "❌ [AUTO-SAVE] Fallo en auto-guardado",
          );
        }
      }, 2000);
    } else {
      console.log(
        "⏰ [AUTO-SAVE] No hay contenido suficiente para auto-guardar",
      );
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [
    currentProject?.id,
    currentTheme?.id,
    isLoading,
    saveTheme,
  ]); // Dependencias simplificadas

  // Función para sincronizar colores con tokens actualizados
  const syncColorsWithUpdatedTokens = useCallback(
    (oldTokens: ColorToken[], newTokens: ColorToken[]) => {
      if (!currentProject) return;

      const updatedTokensMap = new Map<
        string,
        { oldValue: string; newValue: string }
      >();

      oldTokens.forEach((oldToken) => {
        const newToken = newTokens.find(
          (t) => t.id === oldToken.id,
        );
        if (newToken && newToken.value !== oldToken.value) {
          updatedTokensMap.set(oldToken.id, {
            oldValue: oldToken.value,
            newValue: newToken.value,
          });
        }
      });

      if (updatedTokensMap.size === 0) return;

      console.log(
        "🔄 [TOKENS] Tokens actualizados detectados:",
        Array.from(updatedTokensMap.entries()),
      );

      const updateColorsInTheme = (
        theme: ProjectTheme,
      ): ProjectTheme => {
        let themeUpdated = false;

        const updatedContentColors = theme.contentColors.map(
          (color) => {
            if (
              color.tokenId &&
              updatedTokensMap.has(color.tokenId)
            ) {
              const tokenUpdate = updatedTokensMap.get(
                color.tokenId,
              )!;
              themeUpdated = true;
              return { ...color, color: tokenUpdate.newValue };
            }
            return color;
          },
        );

        const updatedBackgroundColors =
          theme.backgroundColors.map((bgColor) => {
            if (
              bgColor.tokenId &&
              updatedTokensMap.has(bgColor.tokenId)
            ) {
              const tokenUpdate = updatedTokensMap.get(
                bgColor.tokenId,
              )!;
              themeUpdated = true;
              return {
                ...bgColor,
                color: tokenUpdate.newValue,
              };
            }
            return bgColor;
          });

        if (themeUpdated) {
          return {
            ...theme,
            contentColors: updatedContentColors,
            backgroundColors: updatedBackgroundColors,
          };
        }

        return theme;
      };

      Object.entries(currentProject.themes).forEach(
        ([themeId, theme]) => {
          const updatedTheme = updateColorsInTheme(theme);
          if (updatedTheme !== theme) {
            saveTheme(
              currentProject.id,
              themeId,
              updatedTheme.contentColors,
              updatedTheme.backgroundColors,
            );
          }
        },
      );

      // Forzar recarga después de actualizar tokens
      setTimeout(() => {
        forceReloadFromStorage(
          currentProject.id,
          currentTheme?.id || "",
        );
      }, 500);
    },
    [
      currentProject,
      currentTheme,
      saveTheme,
      forceReloadFromStorage,
    ],
  );

  // Inicialización de la app
  useEffect(() => {
    const initializeApp = async () => {
      try {
        ProjectStorage.migrateOldData();

        const currentProjectInfo =
          ProjectStorage.getCurrentProject();

        if (currentProjectInfo) {
          const project = ProjectStorage.getProject(
            currentProjectInfo.projectId,
          );

          if (
            project &&
            project.themes[currentProjectInfo.themeId]
          ) {
            console.log(
              "📂 [INIT] Cargando proyecto existente:",
              {
                projectName: project.name,
                themeId: currentProjectInfo.themeId,
                themeName:
                  project.themes[currentProjectInfo.themeId]
                    .name,
                contentColors:
                  project.themes[currentProjectInfo.themeId]
                    .contentColors?.length || 0,
              },
            );

            setCurrentProject(project);
            setCurrentTheme(
              project.themes[currentProjectInfo.themeId],
            );
          } else {
            ProjectStorage.clearCurrentProject();
            setShowProjectInitializer(true);
          }
        } else {
          const allProjects = ProjectStorage.getAllProjects();
          if (allProjects.length === 0) {
            setShowProjectInitializer(true);
          } else {
            setShowProjectInitializer(true);
          }
        }
      } catch (error) {
        console.error("Error initializing app:", error);
        setShowProjectInitializer(true);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Handlers para el sistema de proyectos
  const handleCreateProject = (
    projectName: string,
    projectId: string,
    themeId: string,
    themeName: string,
  ) => {
    console.log("🆕 [PROJECT] Cargando proyecto ya creado...", {
      projectName,
      projectId,
      themeId,
      themeName,
    });

    // El proyecto YA fue creado y guardado en ProjectInitializer
    // Solo necesitamos cargarlo desde localStorage
    const existingProject =
      ProjectStorage.getProject(projectId);

    if (existingProject && existingProject.themes[themeId]) {
      const theme = existingProject.themes[themeId];

      setCurrentProject(existingProject);
      setCurrentTheme(theme);

      ProjectStorage.setCurrentProject(
        existingProject.id,
        existingProject.name,
        themeId,
        theme.name,
      );
      setShowProjectInitializer(false);

      console.log("✅ [PROJECT] Proyecto cargado exitosamente");
    } else {
      console.error(
        "❌ [PROJECT] Error: proyecto no encontrado después de creación",
      );
      alert(
        "Error al cargar el proyecto. Por favor, inténtalo de nuevo.",
      );
    }
  };

  const handleLoadProjectFromInitializer = (
    loadedContentColors: ContentColor[],
    loadedBackgroundColor: BackgroundColor,
    projectId: string,
    projectName: string,
    themeId: string,
    themeName: string,
    loadedTokens: ColorToken[],
  ) => {
    const project = ProjectStorage.getProject(projectId);
    if (project && project.themes[themeId]) {
      setCurrentProject(project);
      setCurrentTheme(project.themes[themeId]);
      ProjectStorage.setCurrentProject(
        projectId,
        projectName,
        themeId,
        themeName,
      );
      setShowProjectInitializer(false);
    }
  };

  // Handlers para temas CON RECARGA FORZADA
  const handleSwitchTheme = (themeId: string) => {
    if (currentProject && currentProject.themes[themeId]) {
      console.log("🔄 [THEME] Cambiando a tema:", themeId);

      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
        autoSaveTimeoutRef.current = null;
      }

      // Forzar recarga inmediata del tema
      const success = forceReloadFromStorage(
        currentProject.id,
        themeId,
      );

      if (success) {
        ProjectStorage.setCurrentProject(
          currentProject.id,
          currentProject.name,
          themeId,
          currentProject.themes[themeId].name,
        );
        console.log(
          "✅ [THEME] Tema cambiado exitosamente a:",
          themeId,
        );
      } else {
        console.error("❌ [THEME] Error cambiando tema");
      }
    }
  };

  const handleCreateTheme = async (themeName: string) => {
    if (!currentProject) return;

    setIsCreatingTheme(true);

    try {
      const newTheme = ProjectStorage.addThemeToProject(
        currentProject.id,
        themeName,
      );

      if (newTheme) {
        // Forzar recarga del proyecto completo
        const success = forceReloadFromStorage(
          currentProject.id,
          newTheme.id,
        );

        if (success) {
          ProjectStorage.setCurrentProject(
            currentProject.id,
            currentProject.name,
            newTheme.id,
            newTheme.name,
          );

          setIsCreateThemeOpen(false);
          setNewThemeName("");

          console.log(
            "✅ [THEME] Tema creado y aplicado exitosamente",
          );
        }
      }
    } catch (error) {
      console.error("Error creando tema:", error);
      alert(
        "Error al crear el tema. Por favor, inténtalo de nuevo.",
      );
    } finally {
      setIsCreatingTheme(false);
    }
  };

  const handleRenameTheme = (
    themeId: string,
    newName: string,
  ) => {
    if (currentProject) {
      ProjectStorage.updateTheme(currentProject.id, themeId, {
        name: newName,
      });

      // Forzar recarga
      forceReloadFromStorage(
        currentProject.id,
        currentTheme?.id || themeId,
      );

      if (currentTheme?.id === themeId) {
        ProjectStorage.setCurrentProject(
          currentProject.id,
          currentProject.name,
          themeId,
          newName,
        );
      }
    }
  };

  const handleDeleteTheme = (themeId: string) => {
    if (
      currentProject &&
      Object.keys(currentProject.themes).length > 1
    ) {
      const wasCurrentTheme = currentTheme?.id === themeId;

      ProjectStorage.deleteThemeFromProject(
        currentProject.id,
        themeId,
      );

      if (wasCurrentTheme) {
        // Cambiar al primer tema disponible
        const updatedProject = ProjectStorage.getProject(
          currentProject.id,
        );
        if (updatedProject) {
          const firstThemeId = Object.keys(
            updatedProject.themes,
          )[0];
          const firstTheme =
            updatedProject.themes[firstThemeId];

          forceReloadFromStorage(
            currentProject.id,
            firstThemeId,
          );
          ProjectStorage.setCurrentProject(
            currentProject.id,
            currentProject.name,
            firstTheme.id,
            firstTheme.name,
          );
        }
      } else {
        forceReloadFromStorage(
          currentProject.id,
          currentTheme?.id || "",
        );
      }
    }
  };

  const handleDuplicateTheme = (
    themeId: string,
    newName: string,
  ) => {
    if (currentProject && currentProject.themes[themeId]) {
      const originalTheme = currentProject.themes[themeId];
      const newTheme = ProjectStorage.addThemeToProject(
        currentProject.id,
        newName,
      );

      if (newTheme) {
        ProjectStorage.updateTheme(
          currentProject.id,
          newTheme.id,
          {
            contentColors: [
              ...(originalTheme.contentColors || []),
            ],
            backgroundColors: [
              ...(originalTheme.backgroundColors || []),
            ],
          },
        );

        forceReloadFromStorage(
          currentProject.id,
          currentTheme?.id || "",
        );
      }
    }
  };

  const handleOpenCreateTheme = () => {
    if (currentProject) {
      const themeCount = Object.keys(
        currentProject.themes,
      ).length;
      setNewThemeName(`Tema ${themeCount + 1}`);
      setIsCreateThemeOpen(true);
    }
  };

  const handleSubmitCreateTheme = (e: React.FormEvent) => {
    e.preventDefault();
    if (newThemeName.trim()) {
      handleCreateTheme(newThemeName.trim());
    }
  };

  // Handlers para colores de contenido CON GUARDADO INMEDIATO Y RECARGA
  const handleAddNewContent = () => {
    if (!currentTheme) {
      alert(
        "Error: No hay tema actual. Por favor, inicializa un proyecto primero.",
      );
      return;
    }
    setEditingContentColor(undefined);
    setIsContentEditorOpen(true);
  };

  const handleEditContentColor = (
    contentColor: ContentColor,
  ) => {
    setEditingContentColor(contentColor);
    setIsContentEditorOpen(true);
  };

  const handleSaveContentColor = (
    contentColor: ContentColor,
  ) => {
    if (!currentTheme || !currentProject) return;

    console.log(
      "💾 [COLOR] GUARDANDO color:",
      contentColor.name,
    );

    let updatedColors;
    if (editingContentColor) {
      updatedColors = currentTheme.contentColors.map((c) =>
        c.id === contentColor.id ? contentColor : c,
      );
      console.log("✏️ [COLOR] Editando color existente");
    } else {
      updatedColors = [
        ...currentTheme.contentColors,
        contentColor,
      ];
      console.log("➕ [COLOR] Añadiendo nuevo color");
    }

    // Actualizar estado inmediatamente
    const updatedTheme = {
      ...currentTheme,
      contentColors: updatedColors,
    };
    setCurrentTheme(updatedTheme);

    // Guardar CON recarga forzada
    const success = saveTheme(
      currentProject.id,
      updatedTheme.id,
      updatedColors,
      updatedTheme.backgroundColors,
    );

    if (success) {
      console.log(
        "✅ [COLOR] Color guardado y estado sincronizado",
      );
    } else {
      console.error("❌ [COLOR] Error guardando color");
    }

    setIsContentEditorOpen(false);
    setEditingContentColor(undefined);
  };

  const handleDeleteContentColor = (id: string) => {
    if (!currentTheme || !currentProject) return;

    console.log("🗑️ [COLOR] Eliminando color:", id);
    const updatedColors = currentTheme.contentColors.filter(
      (c) => c.id !== id,
    );
    const updatedTheme = {
      ...currentTheme,
      contentColors: updatedColors,
    };
    setCurrentTheme(updatedTheme);

    saveTheme(
      currentProject.id,
      updatedTheme.id,
      updatedColors,
      updatedTheme.backgroundColors,
    );
  };

  const handleUpdateWCAGType = (
    id: string,
    wcagType: WCAGType,
  ) => {
    if (!currentTheme || !currentProject) return;

    console.log(
      "🔄 [COLOR] Actualizando WCAG tipo:",
      id,
      "a",
      wcagType,
    );
    const updatedColors = currentTheme.contentColors.map((c) =>
      c.id === id ? { ...c, wcagType } : c,
    );
    const updatedTheme = {
      ...currentTheme,
      contentColors: updatedColors,
    };
    setCurrentTheme(updatedTheme);

    saveTheme(
      currentProject.id,
      updatedTheme.id,
      updatedColors,
      updatedTheme.backgroundColors,
    );
  };

  const handleUpdateContentColors = (
    newColors: ContentColor[],
  ) => {
    if (!currentTheme || !currentProject) return;

    console.log(
      "📝 [COLOR] Actualizando lista completa de colores:",
      newColors.length,
    );
    const updatedTheme = {
      ...currentTheme,
      contentColors: newColors,
    };
    setCurrentTheme(updatedTheme);

    saveTheme(
      currentProject.id,
      updatedTheme.id,
      newColors,
      updatedTheme.backgroundColors,
    );
  };

  const handleSaveBulkColors = (newColors: ContentColor[]) => {
    if (!currentTheme || !currentProject) return;

    console.log(
      "📦 [COLOR] Guardando colores en bulk:",
      newColors.length,
    );
    const updatedColors = [
      ...currentTheme.contentColors,
      ...newColors,
    ];
    const updatedTheme = {
      ...currentTheme,
      contentColors: updatedColors,
    };
    setCurrentTheme(updatedTheme);

    saveTheme(
      currentProject.id,
      updatedTheme.id,
      updatedColors,
      updatedTheme.backgroundColors,
    );
  };

  // Handlers para backgrounds CON GUARDADO Y RECARGA
  const handleEditBackground = (backgroundId?: string) => {
    setEditingBackgroundId(backgroundId);
    setIsBackgroundEditorOpen(true);
  };

  const handleSaveBackgroundColor = (
    newBackgroundColor: BackgroundColor,
  ) => {
    if (!currentTheme || !currentProject) return;

    console.log(
      "🖼️ [BACKGROUND] Guardando background:",
      newBackgroundColor.name,
    );
    let updatedBackgrounds;
    if (editingBackgroundId) {
      updatedBackgrounds = currentTheme.backgroundColors.map(
        (bg) =>
          bg.id === newBackgroundColor.id
            ? newBackgroundColor
            : bg,
      );
    } else {
      updatedBackgrounds = [
        ...currentTheme.backgroundColors,
        newBackgroundColor,
      ];
    }

    const updatedTheme = {
      ...currentTheme,
      backgroundColors: updatedBackgrounds,
    };
    setCurrentTheme(updatedTheme);

    saveTheme(
      currentProject.id,
      updatedTheme.id,
      updatedTheme.contentColors,
      updatedBackgrounds,
    );
  };

  const handleUpdateBackgroundColors = (
    newBackgrounds: BackgroundColor[],
  ) => {
    if (!currentTheme || !currentProject) return;

    console.log(
      "📝 [BACKGROUND] Actualizando lista de backgrounds:",
      newBackgrounds.length,
    );
    const updatedTheme = {
      ...currentTheme,
      backgroundColors: newBackgrounds,
    };
    setCurrentTheme(updatedTheme);

    saveTheme(
      currentProject.id,
      updatedTheme.id,
      updatedTheme.contentColors,
      newBackgrounds,
    );
  };

  // Handlers para tokens
  const handleTokenManager = () => {
    setIsTokenManagerOpen(true);
  };

  const handleUpdateTokens = (newTokens: ColorToken[]) => {
    if (!currentProject) return;

    const oldTokens = [...tokens];
    ProjectStorage.updateProjectTokens(
      currentProject.id,
      newTokens,
    );

    const updatedProject = {
      ...currentProject,
      tokens: newTokens,
    };
    setCurrentProject(updatedProject);

    syncColorsWithUpdatedTokens(oldTokens, newTokens);
  };

  // Handlers de exportación
  const handleExportPNG = () => {
    exportToPNG(
      "contrast-table",
      `tabla-contrastes-${currentProject?.name || "proyecto"}-${currentTheme?.name || "tema"}`,
    );
  };

  const handleExportFigma = () => {
    const compatiblePairs = contentColors.flatMap((content) =>
      backgroundColors.map((background) => ({
        lightColor: content.color,
        darkColor: background.color,
        lightColorName: content.name,
        darkColorName: background.name,
        lightToken: content.token,
        darkToken: background.token,
      })),
    );
    exportToFigmaFrame(compatiblePairs);
  };

  // Calcular estadísticas del tema actual CON LOGGING
  const currentThemeStats = {
    totalColors: contentColors.length,
    totalBackgrounds: backgroundColors.length,
    totalTokens: tokens.length,
    hasTokens:
      contentColors.some((c) => c.token) ||
      backgroundColors.some((bg) => bg.token),
    textColors: contentColors.filter(
      (c) => c.wcagType === "text",
    ).length,
    interactiveColors: contentColors.filter(
      (c) => c.wcagType === "interactive",
    ).length,
    tokensInUse: new Set(
      [
        ...contentColors
          .filter((c) => c.tokenId)
          .map((c) => c.tokenId),
        ...backgroundColors
          .filter((bg) => bg.tokenId)
          .map((bg) => bg.tokenId),
      ].filter(Boolean),
    ).size,
  };

  // Log de estadísticas para debugging
  console.log("📊 [STATS] Estadísticas actuales:", {
    totalColors: currentThemeStats.totalColors,
    totalBackgrounds: currentThemeStats.totalBackgrounds,
    themeName: currentTheme?.name,
    projectName: currentProject?.name,
    actualContentColors: contentColors.length,
    actualBackgroundColors: backgroundColors.length,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Palette
            size={48}
            className="mx-auto mb-4 text-gray-400 animate-pulse"
          />
          <p className="text-gray-600">Cargando proyecto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header con información del proyecto */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">
                Creador de Tabla de Contrastes
              </h1>
              {currentProject && currentTheme && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-sm text-gray-600">
                    Proyecto:{" "}
                    <strong>{currentProject.name}</strong> →
                    Tema: <strong>{currentTheme.name}</strong>
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setShowProjectInitializer(true)}
              >
                <FolderOpen size={16} />
                Proyectos
              </Button>
            </div>
          </div>

          <Separator className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Configuración del Sistema */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Settings size={14} />
                Configuración
              </h3>
              <div className="space-y-2">
                <Button
                  onClick={handleTokenManager}
                  variant="outline"
                  className="flex items-center gap-2 w-full"
                  disabled={!currentProject}
                >
                  <Palette size={16} />
                  Tokens ({tokens.length})
                </Button>
              </div>
            </div>

            {/* Gestión de Colores */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <List size={14} />
                Colores de Contenido
              </h3>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Button
                    onClick={handleAddNewContent}
                    className="flex items-center gap-2 flex-1"
                    disabled={!currentProject || !currentTheme}
                  >
                    <Plus size={16} />
                    Añadir Color
                  </Button>
                  <Button
                    onClick={() => setIsBulkEditorOpen(true)}
                    variant="outline"
                    className="flex items-center gap-2 flex-1"
                    disabled={!currentProject || !currentTheme}
                  >
                    <Upload size={16} />
                    Importación Masiva
                  </Button>
                </div>
              </div>
            </div>

            {/* Exportación */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Download size={14} />
                Exportar
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleExportPNG}
                  className="flex items-center gap-2 flex-1"
                  disabled={
                    !currentProject ||
                    !currentTheme ||
                    contentColors.length === 0
                  }
                >
                  <Download size={16} />
                  Exportar PNG
                </Button>
                <Button
                  variant="outline"
                  onClick={handleExportFigma}
                  className="flex items-center gap-2 flex-1"
                  disabled={
                    !currentProject ||
                    !currentTheme ||
                    contentColors.length === 0
                  }
                >
                  <Share size={16} />
                  Exportar a Figma
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navegación de Temas con Pestañas */}
        {currentProject &&
          currentTheme &&
          Object.keys(currentProject.themes).length > 0 && (
            <div className="mb-6">
              <Tabs
                value={currentTheme.id}
                onValueChange={handleSwitchTheme}
                className="w-full"
              >
                <div className="flex items-center bg-white rounded-lg shadow-sm border pl-1 pr-4 py-1">
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <TabsList className="bg-transparent h-auto py-0 px-2 space-x-1 flex overflow-x-auto overflow-y-hidden scrollbar-hide w-full">
                      {Object.values(currentProject.themes).map(
                        (theme) => {
                          const themeStats = {
                            colors:
                              theme.contentColors?.length || 0,
                            backgrounds:
                              theme.backgroundColors?.length ||
                              0,
                          };

                          return (
                            <TabsTrigger
                              key={theme.id}
                              value={theme.id}
                              className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 data-[state=active]:border-blue-200 px-4 py-3 rounded-md border border-transparent hover:bg-gray-50 transition-colors flex items-center gap-2 shrink-0"
                            >
                              <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                  {theme.backgroundColors
                                    ?.slice(0, 2)
                                    .map((bg, index) => (
                                      <div
                                        key={bg.id}
                                        className="w-3 h-3 rounded-full border border-gray-300"
                                        style={{
                                          backgroundColor:
                                            bg.color,
                                        }}
                                        title={bg.name}
                                      />
                                    ))}
                                  {(theme.backgroundColors
                                    ?.length || 0) > 2 && (
                                    <div className="w-3 h-3 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
                                      <span className="text-[8px] text-gray-600">
                                        +
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="text-left">
                                  <div className="font-medium whitespace-nowrap">
                                    {theme.name}
                                  </div>
                                  <div className="text-xs text-gray-500 flex gap-2 whitespace-nowrap">
                                    <span>
                                      {themeStats.colors}{" "}
                                      colores
                                    </span>
                                    <span>
                                      {themeStats.backgrounds}{" "}
                                      bg
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </TabsTrigger>
                          );
                        },
                      )}
                    </TabsList>
                  </div>

                  <div className="flex items-center gap-2 ml-4 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleOpenCreateTheme}
                      disabled={!currentProject}
                      className="flex items-center gap-1 text-xs"
                    >
                      <Plus size={12} />
                      Nuevo Tema
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setIsThemeManagerOpen(true)
                      }
                      className="flex items-center text-xs text-gray-600"
                    >
                      <Settings size={12} />
                    </Button>
                  </div>
                </div>
              </Tabs>
            </div>
          )}

        {/* Contenedor unificado: Información del tema + Tabla de contrastes */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Información del tema actual */}
          {currentProject && currentTheme && (
            <>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  {/* Información de backgrounds con su botón */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {backgroundColors
                          .slice(0, 3)
                          .map((bg, index) => (
                            <div
                              key={bg.id}
                              className="w-6 h-6 rounded border-2 border-gray-300"
                              style={{
                                backgroundColor: bg.color,
                                marginLeft:
                                  index > 0 ? "-8px" : "0",
                              }}
                            />
                          ))}
                        {backgroundColors.length > 3 && (
                          <div className="w-6 h-6 rounded border-2 border-gray-300 bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 ml-[-8px]">
                            +{backgroundColors.length - 3}
                          </div>
                        )}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-sm">
                          {backgroundColors.length} Background
                          {backgroundColors.length !== 1
                            ? "s"
                            : ""}
                        </p>
                        <p className="text-xs text-gray-600">
                          Principal: {primaryBackground?.name} (
                          {primaryBackground?.color.toLowerCase()}
                          )
                        </p>
                      </div>
                    </div>

                    {/* Botón de backgrounds */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setIsBackgroundManagerOpen(true)
                      }
                      className="flex items-center gap-2"
                    >
                      <PaintBucket size={16} />
                      <span className="hidden sm:inline">
                        Backgrounds
                      </span>
                    </Button>
                  </div>
                  {/* Información de contenido con su botón */}
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600">
                      <p>
                        <strong>
                          {currentThemeStats.totalColors}
                        </strong>{" "}
                        colores de contenido
                      </p>
                      <div className="flex gap-3 text-xs">
                        <span>
                          🎨 {currentThemeStats.totalTokens}{" "}
                          tokens
                        </span>
                        {currentThemeStats.tokensInUse > 0 && (
                          <span>
                            🔗 {currentThemeStats.tokensInUse}{" "}
                            en uso
                          </span>
                        )}
                        {currentThemeStats.textColors > 0 && (
                          <span>
                            📝 {currentThemeStats.textColors}{" "}
                            texto
                          </span>
                        )}
                        {currentThemeStats.interactiveColors >
                          0 && (
                          <span>
                            🖱️{" "}
                            {
                              currentThemeStats.interactiveColors
                            }{" "}
                            interactivo
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Botón de resumen junto a info de contenido */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setIsColorManagerOpen(true)
                      }
                      className="flex items-center gap-2"
                    >
                      <List size={16} />
                      <span className="hidden sm:inline">
                        Resumen
                      </span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Divider horizontal con padding */}
              <div className="px-4">
                <Separator />
              </div>
            </>
          )}

          {/* Tabla de contrastes */}
          <div
            id="contrast-table"
            className="p-4 sm:p-8 overflow-x-auto"
          >
            <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative size-full min-w-max">
              <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0">
                <ContrastTableHeader />
                {backgroundColors.map((background, index) => (
                  <div
                    key={background.id}
                    className="h-72 relative shrink-0 w-[280px] cursor-pointer hover:opacity-80 transition-opacity"
                    style={{
                      backgroundColor: background.color,
                    }}
                    onClick={() =>
                      handleEditBackground(background.id)
                    }
                  >
                    <div className="box-border content-stretch flex flex-col gap-1 h-72 items-center justify-end overflow-clip p-[22px] relative w-[280px]">
                      <div className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full">
                        <div className="flex flex-col items-center justify-center relative size-full">
                          <div className="size-full" />
                        </div>
                      </div>

                      <div className="bg-[rgba(246,246,246,0.9)] relative rounded-xl shrink-0 w-full">
                        <div className="relative size-full">
                          <div className="box-border content-stretch flex flex-row items-start justify-start relative w-full p-[12px]">
                            <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
                              <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-left w-full">
                                <p className="block leading-[normal]">
                                  {background.name}
                                  {index > 0 && (
                                    <span className="text-xs text-gray-500 ml-1">
                                      #{index + 1}
                                    </span>
                                  )}
                                </p>
                              </div>
                              <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
                                <div className="bg-[rgba(246,246,246,0)] box-border content-stretch flex flex-row gap-2 items-start justify-start overflow-clip p-0 relative shrink-0">
                                  <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[12px] text-left text-nowrap">
                                    <p className="block leading-[normal] whitespace-pre">
                                      {background.color.toLowerCase()}
                                    </p>
                                  </div>
                                </div>
                                {background.token && (
                                  <div className="bg-[rgba(150,54,255,0.1)] box-border content-stretch flex flex-row gap-0.5 items-center justify-start overflow-clip px-2 py-1 relative rounded-xl shrink-0">
                                    <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#9636ff] text-[8px] text-left text-nowrap">
                                      <p className="block leading-[normal] whitespace-pre">
                                        🔗 {background.token}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
                  </div>
                ))}
              </div>

              {contentColors.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="mb-6">
                    {!currentProject || !currentTheme ? (
                      <>
                        <Settings
                          size={48}
                          className="mx-auto mb-4 text-gray-400"
                        />
                        <p className="mb-4 font-semibold">
                          ¡Primero necesitas inicializar un
                          proyecto!
                        </p>
                        <p className="mb-4 text-sm">
                          Crea un proyecto para comenzar a
                          trabajar con colores y contrastes.
                        </p>
                        <Button
                          onClick={() =>
                            setShowProjectInitializer(true)
                          }
                          className="mb-4"
                        >
                          Crear Proyecto
                        </Button>
                      </>
                    ) : tokens.length === 0 ? (
                      <>
                        <Settings
                          size={48}
                          className="mx-auto mb-4 text-gray-400"
                        />
                        <p className="mb-4 font-semibold">
                          ¡Comienza configurando tu biblioteca
                          de tokens!
                        </p>
                        <p className="mb-4 text-sm">
                          El flujo recomendado es: tokens →
                          backgrounds → colores semánticos
                        </p>
                        <Button
                          onClick={handleTokenManager}
                          className="mb-4"
                        >
                          Configurar Tokens de Color
                        </Button>
                      </>
                    ) : (
                      <>
                        <Palette
                          size={48}
                          className="mx-auto mb-4 text-gray-400"
                        />
                        <p className="mb-4">
                          No hay colores de contenido en este
                          tema.
                        </p>
                      </>
                    )}
                  </div>

                  {currentProject && currentTheme && (
                    <div className="flex gap-2 justify-center">
                      <Button onClick={handleAddNewContent}>
                        Añadir primer color
                      </Button>
                      <Button
                        onClick={() =>
                          setIsBulkEditorOpen(true)
                        }
                        variant="outline"
                      >
                        Importación masiva
                      </Button>
                      <Button
                        onClick={() =>
                          setIsColorManagerOpen(true)
                        }
                        variant="outline"
                      >
                        Gestor de colores
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                contentColors.map((contentColor) => (
                  <ContrastTableRow
                    key={contentColor.id}
                    contentColor={contentColor}
                    backgroundColors={backgroundColors}
                    onEditContent={() =>
                      handleEditContentColor(contentColor)
                    }
                    onEditBackground={handleEditBackground}
                    onUpdateWCAGType={handleUpdateWCAGType}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Modal para crear nuevo tema */}
        <Dialog
          open={isCreateThemeOpen}
          onOpenChange={setIsCreateThemeOpen}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Tema</DialogTitle>
              <DialogDescription>
                Crea un nuevo tema para tu proyecto. Puedes
                copiar la configuración de otros temas más
                tarde.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmitCreateTheme}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="theme-name">
                  Nombre del tema
                </Label>
                <Input
                  id="theme-name"
                  value={newThemeName}
                  onChange={(e) =>
                    setNewThemeName(e.target.value)
                  }
                  placeholder="Ej: Dark Mode, High Contrast..."
                  disabled={isCreatingTheme}
                  autoFocus
                />
                {currentProject && (
                  <p className="text-xs text-gray-500">
                    Temas existentes:{" "}
                    {Object.values(currentProject.themes)
                      .map((t) => t.name)
                      .join(", ")}
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateThemeOpen(false)}
                  disabled={isCreatingTheme}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={
                    !newThemeName.trim() || isCreatingTheme
                  }
                >
                  {isCreatingTheme ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creando...
                    </>
                  ) : (
                    <>
                      <Plus size={16} className="mr-2" />
                      Crear Tema
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Editores modales */}
        <ContentColorEditor
          isOpen={isContentEditorOpen}
          onClose={() => setIsContentEditorOpen(false)}
          contentColor={editingContentColor}
          onSave={handleSaveContentColor}
          onDelete={
            editingContentColor
              ? handleDeleteContentColor
              : undefined
          }
          tokens={tokens}
          onOpenTokenManager={handleTokenManager}
        />

        <BackgroundColorEditor
          isOpen={isBackgroundEditorOpen}
          onClose={() => setIsBackgroundEditorOpen(false)}
          backgroundColor={
            editingBackgroundId
              ? backgroundColors.find(
                  (bg) => bg.id === editingBackgroundId,
                )
              : undefined
          }
          onSave={handleSaveBackgroundColor}
          tokens={tokens}
          onOpenTokenManager={handleTokenManager}
        />

        <BackgroundColorManager
          isOpen={isBackgroundManagerOpen}
          onClose={() => setIsBackgroundManagerOpen(false)}
          backgroundColors={backgroundColors}
          onUpdateBackgroundColors={
            handleUpdateBackgroundColors
          }
          tokens={tokens}
          onOpenTokenManager={handleTokenManager}
        />

        <BulkColorEditor
          isOpen={isBulkEditorOpen}
          onClose={() => setIsBulkEditorOpen(false)}
          onSave={handleSaveBulkColors}
          backgroundColor={
            primaryBackground?.color || "#ffffff"
          }
        />

        <ContentColorManager
          isOpen={isColorManagerOpen}
          onClose={() => setIsColorManagerOpen(false)}
          contentColors={contentColors}
          backgroundColors={backgroundColors}
          onUpdateColors={handleUpdateContentColors}
          onEditColor={handleEditContentColor}
          onAddColor={handleAddNewContent}
        />

        <TokenManager
          isOpen={isTokenManagerOpen}
          onClose={() => setIsTokenManagerOpen(false)}
          tokens={tokens}
          onUpdateTokens={handleUpdateTokens}
        />

        {currentTheme && (
          <ThemeManager
            isOpen={isThemeManagerOpen}
            onClose={() => setIsThemeManagerOpen(false)}
            currentTheme={currentTheme}
            allThemes={currentProject?.themes || {}}
            onSwitchTheme={handleSwitchTheme}
            onCreateTheme={handleCreateTheme}
            onRenameTheme={handleRenameTheme}
            onDeleteTheme={handleDeleteTheme}
            onDuplicateTheme={handleDuplicateTheme}
          />
        )}

        <ProjectInitializer
          isOpen={showProjectInitializer}
          onClose={() => {
            if (currentProject && currentTheme) {
              setShowProjectInitializer(false);
            }
          }}
          onCreateProject={handleCreateProject}
          onLoadProject={handleLoadProjectFromInitializer}
        />
      </div>
    </div>
  );
}