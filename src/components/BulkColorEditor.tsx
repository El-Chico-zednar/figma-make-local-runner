import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Upload, 
  Plus, 
  Trash2, 
  Download, 
  Copy,
  FileText,
  Palette,
  CheckCircle,
  AlertCircle,
  X,
  Type,
  MousePointer,
  Edit3,
  Save,
  Eye
} from 'lucide-react';
import { ContentColor, WCAGType } from './ContentColorEditor';
import { getContrastRatio, getAccessibilityLevel } from './ContrastCalculator';

interface BulkColorEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (colors: ContentColor[]) => void;
  backgroundColor: string;
}

interface ParsedColor {
  color: string;
  name: string;
  token?: string;
  wcagType: WCAGType;
  isValid: boolean;
  error?: string;
}

// Estado del formulario individual
interface IndividualColorForm {
  color: string;
  name: string;
  token: string;
  wcagType: WCAGType;
}

function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function isValidHexColor(color: string): boolean {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8})$/;
  return hexRegex.test(color);
}

function generateColorName(color: string, index: number): string {
  const colorNames = [
    'Primary', 'Secondary', 'Accent', 'Success', 'Warning', 'Error', 'Info',
    'Light', 'Dark', 'Muted', 'Bright', 'Subtle', 'Bold', 'Soft', 'Vivid'
  ];
  
  if (index < colorNames.length) {
    return `Text/${colorNames[index]}`;
  }
  
  return `Text/Color ${index + 1}`;
}

function parseColorsFromText(text: string): ParsedColor[] {
  const lines = text.split('\n').filter(line => line.trim());
  const colors: ParsedColor[] = [];
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    // Formato: #hex,name,token o solo #hex
    if (trimmedLine.includes(',')) {
      const parts = trimmedLine.split(',').map(p => p.trim());
      const color = parts[0];
      const name = parts[1] || generateColorName(color, index);
      const token = parts[2] || undefined;
      
      colors.push({
        color,
        name,
        token,
        wcagType: 'text', // Default type, será actualizado después
        isValid: isValidHexColor(color),
        error: isValidHexColor(color) ? undefined : 'Formato de color inválido'
      });
    } else if (trimmedLine.startsWith('#')) {
      // Solo color hex
      colors.push({
        color: trimmedLine,
        name: generateColorName(trimmedLine, index),
        wcagType: 'text',
        isValid: isValidHexColor(trimmedLine),
        error: isValidHexColor(trimmedLine) ? undefined : 'Formato de color inválido'
      });
    } else {
      // Línea inválida
      colors.push({
        color: trimmedLine,
        name: `Invalid ${index + 1}`,
        wcagType: 'text',
        isValid: false,
        error: 'Debe empezar con # para colores hex'
      });
    }
  });
  
  return colors;
}

function ColorPreviewCard({ color, onEdit, onRemove }: {
  color: ParsedColor;
  onEdit: (color: ParsedColor) => void;
  onRemove: () => void;
}) {
  return (
    <Card className={`${color.isValid ? 'border-green-200' : 'border-red-200'} transition-all hover:shadow-md`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {color.isValid ? (
              <div 
                className="w-6 h-6 rounded border-2 border-gray-300"
                style={{ backgroundColor: color.color }}
              />
            ) : (
              <div className="w-6 h-6 rounded border-2 border-red-300 bg-red-50 flex items-center justify-center">
                <X size={12} className="text-red-500" />
              </div>
            )}
            <CardTitle className="text-sm">{color.name}</CardTitle>
          </div>
          
          <div className="flex items-center gap-1">
            {color.isValid ? (
              <CheckCircle size={14} className="text-green-500" />
            ) : (
              <AlertCircle size={14} className="text-red-500" />
            )}
            <Button size="sm" variant="ghost" onClick={onRemove}>
              <Trash2 size={12} />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            <strong>Color:</strong> {color.color}
          </div>
          {color.token && (
            <div className="text-xs text-muted-foreground">
              <strong>Token:</strong> {color.token}
            </div>
          )}
          {color.error && (
            <div className="text-xs text-red-600">
              <strong>Error:</strong> {color.error}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Componente para vista previa del color individual
function IndividualColorPreview({ form, backgroundColor }: {
  form: IndividualColorForm;
  backgroundColor: string;
}) {
  if (!isValidHexColor(form.color)) {
    return (
      <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          Introduce un color hex válido para ver la vista previa
        </p>
      </div>
    );
  }

  const contrastRatio = getContrastRatio(form.color, backgroundColor);
  const accessibilityLevel = getAccessibilityLevel(contrastRatio, form.wcagType);
  const IconComponent = form.wcagType === 'text' ? Type : MousePointer;

  const levelColors = {
    'AAA': 'bg-green-100 text-green-800',
    'AA': 'bg-yellow-100 text-yellow-800',
    'FAIL': 'bg-red-100 text-red-800'
  };

  return (
    <div className="p-6 border-2 border-gray-200 rounded-lg bg-gray-50">
      <div className="flex items-center gap-4 mb-4">
        <div 
          className="w-16 h-16 rounded-lg border-2 border-gray-300 shadow-sm"
          style={{ backgroundColor: form.color }}
        />
        <div className="flex-1">
          <h4 className="font-semibold text-base mb-1">{form.name || 'Nombre del color'}</h4>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono bg-white px-2 py-1 rounded text-sm border">
              {form.color.toLowerCase()}
            </span>
            {form.token && (
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
                🔗 {form.token}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <IconComponent size={14} className="text-gray-500" />
              <span className="text-sm text-gray-600">
                {form.wcagType === 'text' ? 'Texto' : 'Interactivo'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">{contrastRatio.toFixed(2)}</span>
              <Badge className={`${levelColors[accessibilityLevel]} text-xs`}>
                {accessibilityLevel}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      
      {/* Vista previa visual */}
      <div 
        className="p-4 rounded-lg border-2 border-gray-300"
        style={{ backgroundColor }}
      >
        {form.wcagType === 'text' ? (
          <div style={{ color: form.color }}>
            <div className="text-2xl font-semibold mb-2">Aa</div>
            <p className="text-sm">Ejemplo de texto sobre el fondo</p>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded border-2 hover:opacity-80 transition-opacity cursor-pointer"
              style={{ 
                backgroundColor: form.color,
                borderColor: form.color,
                filter: 'brightness(0.9)'
              }}
            >
              <Type size={16} style={{ color: backgroundColor }} />
            </div>
            <div 
              className="p-2 rounded border-2 hover:opacity-80 transition-opacity cursor-pointer"
              style={{ 
                backgroundColor: form.color,
                borderColor: form.color,
                filter: 'brightness(0.9)'
              }}
            >
              <MousePointer size={16} style={{ color: backgroundColor }} />
            </div>
            <span style={{ color: form.color }} className="text-sm">
              Elementos interactivos
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BulkColorEditor({ isOpen, onClose, onSave, backgroundColor }: BulkColorEditorProps) {
  const [activeTab, setActiveTab] = useState('individual');
  const [textInput, setTextInput] = useState('');
  const [parsedColors, setParsedColors] = useState<ParsedColor[]>([]);
  const [namePrefix, setNamePrefix] = useState('Text/');
  const [tokenPrefix, setTokenPrefix] = useState('text/');
  const [defaultWCAGType, setDefaultWCAGType] = useState<WCAGType>('text');
  
  // Estado para el formulario individual
  const [individualForm, setIndividualForm] = useState<IndividualColorForm>({
    color: '',
    name: '',
    token: '',
    wcagType: 'text'
  });
  
  // Lista de colores creados individualmente
  const [individualColors, setIndividualColors] = useState<ParsedColor[]>([]);

  const handleParseText = () => {
    if (!textInput.trim()) {
      setParsedColors([]);
      return;
    }
    
    const colors = parseColorsFromText(textInput);
    // Aplicar el tipo WCAG por defecto a todos los colores
    const colorsWithWCAG = colors.map(color => ({
      ...color,
      wcagType: defaultWCAGType
    }));
    setParsedColors(colorsWithWCAG);
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        
        if (file.name.endsWith('.json')) {
          // Importar JSON
          const jsonData = JSON.parse(content);
          
          // Formato esperado: array de objetos con color, name, token
          if (Array.isArray(jsonData)) {
            const colors: ParsedColor[] = jsonData.map((item, index) => ({
              color: item.color || item.hex || item.value,
              name: item.name || generateColorName(item.color || item.hex || item.value, index),
              token: item.token,
              wcagType: item.wcagType || defaultWCAGType,
              isValid: isValidHexColor(item.color || item.hex || item.value),
              error: isValidHexColor(item.color || item.hex || item.value) ? undefined : 'Formato de color inválido'
            }));
            setParsedColors(colors);
          }
        } else {
          // Importar como texto plano
          setTextInput(content);
          const colors = parseColorsFromText(content);
          const colorsWithWCAG = colors.map(color => ({
            ...color,
            wcagType: defaultWCAGType
          }));
          setParsedColors(colorsWithWCAG);
        }
      } catch (error) {
        alert('Error al leer el archivo. Asegúrate de que sea un JSON válido o un archivo de texto con colores hex.');
      }
    };
    
    reader.readAsText(file);
  };

  const handleGenerateExample = () => {
    const exampleColors = [
      '#ffffff,Text/Primary,text/primary',
      '#e5e7eb,Text/Secondary,text/secondary',
      '#6b7280,Text/Muted,text/muted',
      '#374151,Text/Dark,text/dark',
      '#1f2937,Text/Darker,text/darker',
      '#ef4444,Text/Error,text/error',
      '#10b981,Text/Success,text/success',
      '#f59e0b,Text/Warning,text/warning',
      '#3b82f6,Text/Info,text/info'
    ];
    
    setTextInput(exampleColors.join('\n'));
    const colors = parseColorsFromText(exampleColors.join('\n'));
    const colorsWithWCAG = colors.map(color => ({
      ...color,
      wcagType: defaultWCAGType
    }));
    setParsedColors(colorsWithWCAG);
  };

  // Funciones para el formulario individual
  const handleAddIndividualColor = () => {
    if (!isValidHexColor(individualForm.color)) {
      alert('Por favor, introduce un color hex válido (ej: #ffffff)');
      return;
    }
    
    if (!individualForm.name.trim()) {
      alert('Por favor, introduce un nombre para el color');
      return;
    }

    const newColor: ParsedColor = {
      color: individualForm.color,
      name: individualForm.name.trim(),
      token: individualForm.token.trim() || undefined,
      wcagType: individualForm.wcagType,
      isValid: true
    };

    setIndividualColors(prev => [...prev, newColor]);
    
    // Limpiar formulario
    setIndividualForm({
      color: '',
      name: '',
      token: '',
      wcagType: 'text'
    });
  };

  const handleRemoveIndividualColor = (index: number) => {
    setIndividualColors(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveColors = () => {
    let allColors: ParsedColor[] = [];
    
    if (activeTab === 'individual') {
      allColors = individualColors;
    } else {
      allColors = parsedColors.filter(color => color.isValid);
    }
    
    if (allColors.length === 0) {
      alert('No hay colores válidos para añadir.');
      return;
    }
    
    const contentColors: ContentColor[] = allColors.map(color => ({
      id: generateUniqueId(),
      color: color.color,
      name: color.name,
      token: color.token,
      wcagType: color.wcagType
    }));
    
    onSave(contentColors);
    
    // Limpiar formularios
    setTextInput('');
    setParsedColors([]);
    setIndividualColors([]);
    setIndividualForm({
      color: '',
      name: '',
      token: '',
      wcagType: 'text'
    });
    onClose();
  };

  const handleRemoveColor = (index: number) => {
    setParsedColors(prev => prev.filter((_, i) => i !== index));
  };

  const handleEditColor = (index: number, updatedColor: ParsedColor) => {
    setParsedColors(prev => prev.map((color, i) => i === index ? updatedColor : color));
  };

  const validColorsCount = activeTab === 'individual' 
    ? individualColors.length
    : parsedColors.filter(color => color.isValid).length;
  const invalidColorsCount = activeTab === 'individual' 
    ? 0 
    : parsedColors.length - validColorsCount;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette size={20} />
            Importación Masiva de Colores
          </DialogTitle>
          <DialogDescription>
            Añade múltiples colores de contenido. Crea colores individualmente, pega una lista, o importa desde archivo.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="individual" className="flex items-center gap-2">
              <Edit3 size={14} />
              Formulario Individual
            </TabsTrigger>
            <TabsTrigger value="paste" className="flex items-center gap-2">
              <Copy size={14} />
              Pegar Lista
            </TabsTrigger>
            <TabsTrigger value="file" className="flex items-center gap-2">
              <Upload size={14} />
              Importar Archivo
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye size={14} />
              Vista Previa ({activeTab === 'individual' ? individualColors.length : parsedColors.length})
            </TabsTrigger>
          </TabsList>

          {/* Nueva pestaña: Formulario Individual */}
          <TabsContent value="individual" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Formulario */}
              <div className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="individual-color">Color (HEX) *</Label>
                    <Input
                      id="individual-color"
                      value={individualForm.color}
                      onChange={(e) => setIndividualForm(prev => ({ ...prev, color: e.target.value }))}
                      placeholder="#ffffff"
                      className="font-mono"
                    />
                  </div>

                  <div>
                    <Label htmlFor="individual-name">Nombre del color *</Label>
                    <Input
                      id="individual-name"
                      value={individualForm.name}
                      onChange={(e) => setIndividualForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Text/Primary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="individual-token">Token de diseño (opcional)</Label>
                    <Input
                      id="individual-token"
                      value={individualForm.token}
                      onChange={(e) => setIndividualForm(prev => ({ ...prev, token: e.target.value }))}
                      placeholder="text/primary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="individual-wcag">Tipo de contenido WCAG</Label>
                    <Select 
                      value={individualForm.wcagType} 
                      onValueChange={(value: WCAGType) => 
                        setIndividualForm(prev => ({ ...prev, wcagType: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">
                          <div className="flex items-center gap-2">
                            <Type size={14} />
                            <span>Texto - WCAG 1.4.3 (AA: 4.5:1, AAA: 7:1)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="interactive">
                          <div className="flex items-center gap-2">
                            <MousePointer size={14} />
                            <span>Interactivo - WCAG 1.4.11 (AA/AAA: 3:1)</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={handleAddIndividualColor} 
                    className="w-full flex items-center gap-2"
                    disabled={!individualForm.color || !individualForm.name}
                  >
                    <Plus size={16} />
                    Añadir Color
                  </Button>
                </div>
              </div>

              {/* Vista previa */}
              <div className="space-y-4">
                <div>
                  <Label>Vista previa en tiempo real</Label>
                  <div className="text-sm text-muted-foreground mb-3">
                    Fondo de prueba: <strong>{backgroundColor}</strong>
                  </div>
                </div>
                
                <IndividualColorPreview 
                  form={individualForm} 
                  backgroundColor={backgroundColor} 
                />
              </div>
            </div>

            {/* Lista de colores añadidos */}
            {individualColors.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Colores añadidos ({individualColors.length})</h4>
                  <Button 
                    onClick={handleSaveColors}
                    className="flex items-center gap-2"
                  >
                    <Save size={16} />
                    Guardar {individualColors.length} Color{individualColors.length !== 1 ? 'es' : ''}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-64 overflow-y-auto">
                  {individualColors.map((color, index) => (
                    <ColorPreviewCard
                      key={index}
                      color={color}
                      onEdit={() => {}} // No editable en esta versión
                      onRemove={() => handleRemoveIndividualColor(index)}
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="paste" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name-prefix">Prefijo para nombres</Label>
                  <Input
                    id="name-prefix"
                    value={namePrefix}
                    onChange={(e) => setNamePrefix(e.target.value)}
                    placeholder="Text/"
                  />
                </div>
                <div>
                  <Label htmlFor="token-prefix">Prefijo para tokens</Label>
                  <Input
                    id="token-prefix"
                    value={tokenPrefix}
                    onChange={(e) => setTokenPrefix(e.target.value)}
                    placeholder="text/"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="wcag-type">Tipo WCAG por defecto</Label>
                <Select value={defaultWCAGType} onValueChange={(value: WCAGType) => setDefaultWCAGType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">
                      <div className="flex items-center gap-2">
                        <Type size={14} />
                        <span>Texto - WCAG 1.4.3 (AA: 4.5:1, AAA: 7:1)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="interactive">
                      <div className="flex items-center gap-2">
                        <MousePointer size={14} />
                        <span>Interactivo - WCAG 1.4.11 (AA/AAA: 3:1)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="color-list">Lista de colores</Label>
                <Textarea
                  id="color-list"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Pega tus colores aquí. Formatos soportados:&#10;#ffffff&#10;#e5e7eb,Text/Secondary&#10;#6b7280,Text/Muted,text/muted"
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleParseText} className="flex items-center gap-2">
                  <Plus size={14} />
                  Procesar Colores
                </Button>
                <Button variant="outline" onClick={handleGenerateExample} className="flex items-center gap-2">
                  <FileText size={14} />
                  Cargar Ejemplo
                </Button>
              </div>

              <div className="p-4 bg-muted rounded-lg text-sm">
                <strong>Formatos soportados:</strong>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• <code>#ffffff</code> - Solo color hex</li>
                  <li>• <code>#ffffff,Text/Primary</code> - Color con nombre</li>
                  <li>• <code>#ffffff,Text/Primary,text/primary</code> - Color con nombre y token</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="file" className="space-y-4">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept=".json,.txt,.csv"
                  onChange={handleFileImport}
                  className="hidden"
                  id="file-input"
                />
                <label htmlFor="file-input" className="cursor-pointer">
                  <Upload size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg mb-2">Selecciona un archivo</p>
                  <p className="text-sm text-muted-foreground">JSON, TXT o CSV</p>
                </label>
              </div>

              <div className="p-4 bg-muted rounded-lg text-sm">
                <strong>Formatos de archivo soportados:</strong>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• <strong>JSON:</strong> Array de objetos con propiedades color, name, token</li>
                  <li>• <strong>TXT/CSV:</strong> Lista de colores hex, uno por línea</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            {(activeTab === 'individual' ? individualColors.length : parsedColors.length) === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Palette size={48} className="mx-auto mb-4 opacity-50" />
                <p>No hay colores para mostrar</p>
                <p className="text-sm">Usa las pestañas anteriores para añadir colores</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {validColorsCount > 0 && (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {validColorsCount} válidos
                      </Badge>
                    )}
                    {invalidColorsCount > 0 && (
                      <Badge variant="destructive">
                        {invalidColorsCount} inválidos
                      </Badge>
                    )}
                  </div>
                  
                  <Button 
                    onClick={handleSaveColors}
                    disabled={validColorsCount === 0}
                    className="flex items-center gap-2"
                  >
                    <Plus size={14} />
                    Añadir {validColorsCount} Color{validColorsCount !== 1 ? 'es' : ''}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                  {(activeTab === 'individual' ? individualColors : parsedColors).map((color, index) => (
                    <ColorPreviewCard
                      key={index}
                      color={color}
                      onEdit={(updatedColor) => handleEditColor(index, updatedColor)}
                      onRemove={() => activeTab === 'individual' 
                        ? handleRemoveIndividualColor(index) 
                        : handleRemoveColor(index)
                      }
                    />
                  ))}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}