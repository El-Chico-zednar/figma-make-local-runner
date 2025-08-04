import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Plus, 
  Upload, 
  Download, 
  Trash2, 
  Edit3, 
  FileText,
  Palette,
  Search
} from 'lucide-react';

export interface ColorToken {
  id: string;
  name: string;
  value: string;
  category?: string;
  description?: string;
}

interface TokenManagerProps {
  isOpen: boolean;
  onClose: () => void;
  tokens: ColorToken[];
  onUpdateTokens: (tokens: ColorToken[]) => void;
}

interface TokenEditorProps {
  token?: ColorToken;
  onSave: (token: ColorToken) => void;
  onCancel: () => void;
}

function TokenEditor({ token, onSave, onCancel }: TokenEditorProps) {
  const [name, setName] = useState(token?.name || '');
  const [value, setValue] = useState(token?.value || '');

  // Función para extraer categoría del nombre del token
  const extractCategoryFromName = (tokenName: string): string | undefined => {
    const trimmedName = tokenName.trim();
    if (trimmedName.includes('/')) {
      const category = trimmedName.split('/')[0];
      return category || undefined;
    }
    return undefined;
  };

  const handleSave = () => {
    if (!name.trim() || !value.trim()) return;
    
    const trimmedName = name.trim();
    const normalizedValue = normalizeHexValue(value.trim());
    
    // Validar que el valor sea un HEX válido después de normalizarlo
    if (!isValidHex(normalizedValue)) {
      return;
    }
    
    // Extraer categoría automáticamente del nombre
    const autoCategory = extractCategoryFromName(trimmedName);
    
    const newToken: ColorToken = {
      id: token?.id || `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: trimmedName,
      value: normalizedValue,
      category: autoCategory,
      description: undefined // Ya no usamos descripción
    };
    
    onSave(newToken);
  };

  const isValidHex = (hex: string) => {
    // Permitir valores sin # al principio y añadirlo automáticamente
    const normalizedHex = hex.startsWith('#') ? hex : '#' + hex;
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(normalizedHex);
  };

  const normalizeHexValue = (hex: string) => {
    const trimmed = hex.trim().toUpperCase();
    return trimmed.startsWith('#') ? trimmed : '#' + trimmed;
  };

  const isFormValid = name.trim() && value.trim() && isValidHex(value.trim());

  // Obtener categoría extraída para mostrar preview
  const previewCategory = extractCategoryFromName(name);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="token-name">Nombre del Token *</Label>
          <Input
            id="token-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ej: forest/300, primary/brand/500, neutral/100"
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground mt-1">
            La categoría se extraerá automáticamente del prefijo antes del primer "/"
          </p>
        </div>
        
        <div>
          <Label htmlFor="token-value">Valor HEX *</Label>
          <div className="flex gap-2">
            <Input
              id="token-value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="FF5733 (# opcional)"
              className="font-mono"
            />
            {isValidHex(value) && (
              <div
                className="w-10 h-10 rounded border-2 border-gray-300 shrink-0"
                style={{ backgroundColor: normalizeHexValue(value) }}
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Vista previa del token */}
      {name.trim() && isValidHex(value) && (
        <div className="p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-semibold mb-3">Vista Previa del Token</h4>
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-lg border-2 border-gray-300"
              style={{ backgroundColor: normalizeHexValue(value) }}
            />
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-muted-foreground font-mono">{normalizeHexValue(value)}</p>
              {previewCategory && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">Categoría:</span>
                  <Badge variant="outline" className="text-xs">
                    {previewCategory}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button 
          onClick={handleSave} 
          disabled={!isFormValid}
        >
          {token ? 'Actualizar' : 'Crear'} Token
        </Button>
      </div>
    </div>
  );
}

export default function TokenManager({ isOpen, onClose, tokens, onUpdateTokens }: TokenManagerProps) {
  const [editingToken, setEditingToken] = useState<ColorToken | undefined>();
  const [showEditor, setShowEditor] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [bulkImportText, setBulkImportText] = useState('');

  // Obtener categorías únicas
  const categories = ['all', ...Array.from(new Set(tokens.map(t => t.category).filter(Boolean)))];

  // Filtrar tokens
  const filteredTokens = tokens.filter(token => {
    const matchesSearch = token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         token.value.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || token.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToken = () => {
    setEditingToken(undefined);
    setShowEditor(true);
  };

  const handleEditToken = (token: ColorToken) => {
    setEditingToken(token);
    setShowEditor(true);
  };

  const handleSaveToken = (token: ColorToken) => {
    if (editingToken) {
      onUpdateTokens(tokens.map(t => t.id === token.id ? token : t));
    } else {
      onUpdateTokens([...tokens, token]);
    }
    setShowEditor(false);
    setEditingToken(undefined);
  };

  const handleDeleteToken = (tokenId: string) => {
    onUpdateTokens(tokens.filter(t => t.id !== tokenId));
  };



  const handleBulkImport = () => {
    try {
      const lines = bulkImportText.split('\n').filter(line => line.trim());
      const newTokens: ColorToken[] = [];
      
      // Función auxiliar para extraer categoría
      const extractCategoryFromName = (tokenName: string): string | undefined => {
        const trimmedName = tokenName.trim();
        if (trimmedName.includes('/')) {
          const category = trimmedName.split('/')[0];
          return category || undefined;
        }
        return undefined;
      };
      
      for (const line of lines) {
        const parts = line.split(',').map(p => p.trim());
        if (parts.length >= 2) {
          const [name, value] = parts;
          
          // Normalizar el valor HEX
          const normalizedValue = value.startsWith('#') ? value.toUpperCase() : '#' + value.toUpperCase();
          
          if (name && value && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(normalizedValue)) {
            // Extraer categoría automáticamente del nombre
            const autoCategory = extractCategoryFromName(name);
            
            newTokens.push({
              id: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              name,
              value: normalizedValue,
              category: autoCategory,
              description: undefined
            });
          }
        }
      }
      
      if (newTokens.length > 0) {
        onUpdateTokens([...tokens, ...newTokens]);
        setBulkImportText('');
      }
    } catch (error) {
      console.error('Error importing tokens:', error);
    }
  };

  const handleExportTokens = () => {
    // Exportar como formato CSV simple para fácil importación
    const csvContent = tokens.map(token => `${token.name}, ${token.value}`).join('\n');
    
    const dataBlob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'color-tokens.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette size={20} />
            Gestor de Tokens de Color
          </DialogTitle>
          <DialogDescription>
            Administra tu biblioteca de tokens de color. Crea, edita y organiza tokens para mantener consistencia en tu sistema de diseño.
          </DialogDescription>
        </DialogHeader>

        {showEditor ? (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setShowEditor(false);
                  setEditingToken(undefined);
                }}
              >
                ← Volver al gestor
              </Button>
              <div>
                <h3 className="font-semibold">
                  {editingToken ? 'Editar Token' : 'Crear Nuevo Token'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {editingToken ? 'Modifica las propiedades del token' : 'Añade un nuevo token a tu biblioteca'}
                </p>
              </div>
            </div>
            
            <TokenEditor
              token={editingToken}
              onSave={handleSaveToken}
              onCancel={() => {
                setShowEditor(false);
                setEditingToken(undefined);
              }}
            />
          </div>
        ) : (
          <Tabs defaultValue="manage" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manage">Gestionar Tokens</TabsTrigger>
              <TabsTrigger value="import">Importar/Exportar</TabsTrigger>
            </TabsList>

            <TabsContent value="manage" className="space-y-4">
              {/* Header con estadísticas y controles */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold">{tokens.length} tokens en total</p>
                    <p className="text-sm text-muted-foreground">
                      {categories.length - 1} categorías disponibles
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handleAddToken} className="flex items-center gap-2">
                    <Plus size={16} />
                    Nuevo Token
                  </Button>
                  {tokens.length > 0 && (
                    <Button variant="outline" onClick={handleExportTokens}>
                      <Download size={16} />
                    </Button>
                  )}
                </div>
              </div>

              {/* Filtros */}
              {tokens.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                      <Input
                        placeholder="Buscar tokens por nombre o valor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  {categories.length > 1 && (
                    <div className="sm:w-48">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white"
                      >
                        <option value="all">Todas las categorías</option>
                        {categories.slice(1).map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* Lista de tokens */}
              {filteredTokens.length === 0 ? (
                <div className="text-center py-12">
                  {tokens.length === 0 ? (
                    <div>
                      <Palette size={48} className="mx-auto mb-4 text-gray-400" />
                      <h3 className="font-semibold mb-2">No hay tokens de color</h3>
                      <p className="text-muted-foreground mb-4">
                        Comienza creando tu biblioteca de tokens de color
                      </p>
                      <Button onClick={handleAddToken}>
                        Crear primer token
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Search size={48} className="mx-auto mb-4 text-gray-400" />
                      <p className="text-muted-foreground">
                        No se encontraron tokens que coincidan con los filtros
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTokens.map((token) => (
                    <Card key={token.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div
                              className="w-12 h-12 rounded-lg border-2 border-gray-300 shrink-0"
                              style={{ backgroundColor: token.value }}
                            />
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-sm truncate">{token.name}</h4>
                              <p className="text-xs text-muted-foreground font-mono">
                                {token.value}
                              </p>
                              {token.category && (
                                <Badge variant="outline" className="text-xs mt-1">
                                  {token.category}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {token.description && (
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                            {token.description}
                          </p>
                        )}
                        
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditToken(token)}
                            className="flex-1"
                          >
                            <Edit3 size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteToken(token.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="import" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Importación masiva */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload size={20} />
                      Importación Masiva
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="bulk-import">
                        Formato: nombre, hex (uno por línea) - La categoría se extrae automáticamente
                      </Label>
                      <Textarea
                        id="bulk-import"
                        placeholder={`forest/300, #10B981
forest/500, #059669
forest/700, #047857
primary/100, #EBF8FF
primary/500, #3B82F6
neutral/50, #F9FAFB
neutral/900, #111827`}
                        value={bulkImportText}
                        onChange={(e) => setBulkImportText(e.target.value)}
                        rows={8}
                        className="font-mono text-sm"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleBulkImport} 
                      disabled={!bulkImportText.trim()}
                      className="w-full"
                    >
                      Importar Tokens
                    </Button>
                  </CardContent>
                </Card>

                {/* Exportación */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download size={20} />
                      Exportación
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Exporta tus tokens en formato CSV simple (nombre, valor) para usar en otras herramientas
                        o como respaldo.
                      </p>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-semibold mb-2">Estadísticas actuales:</p>
                        <ul className="text-sm space-y-1">
                          <li>• Total de tokens: {tokens.length}</li>
                          <li>• Categorías: {categories.length - 1}</li>
                          <li>• Con categoría auto: {tokens.filter(t => t.category).length}</li>
                        </ul>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleExportTokens} 
                      disabled={tokens.length === 0}
                      className="w-full"
                      variant="outline"
                    >
                      <FileText size={16} className="mr-2" />
                      Exportar como CSV
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}