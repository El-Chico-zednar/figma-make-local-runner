import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Search, Palette, Hash } from "lucide-react";
import { ColorToken } from "./TokenManager";

interface TokenSelectorProps {
  tokens: ColorToken[];
  selectedToken?: ColorToken;
  selectedColor?: string;
  onSelectToken: (token: ColorToken) => void;
  onSelectCustomColor: (color: string) => void;
  onOpenTokenManager?: () => void;
}

export default function TokenSelector({
  tokens,
  selectedToken,
  selectedColor,
  onSelectToken,
  onSelectCustomColor,
  onOpenTokenManager,
}: TokenSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [customColorInput, setCustomColorInput] = useState(
    selectedColor || "",
  );
  const [selectedCategory, setSelectedCategory] =
    useState<string>("all");

  // Obtener categorías únicas
  const categories = [
    "all",
    ...Array.from(
      new Set(tokens.map((t) => t.category).filter(Boolean)),
    ),
  ];

  // Filtrar tokens
  const filteredTokens = tokens.filter((token) => {
    const matchesSearch =
      token.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      token.value
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      token.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCustomColorChange = (value: string) => {
    setCustomColorInput(value);
    if (isValidHex(value)) {
      onSelectCustomColor(value.toUpperCase());
    }
  };

  const isValidHex = (hex: string) => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  };

  const currentColor = selectedToken?.value || selectedColor;

  return (
    <div className="space-y-4">
      {/* Vista previa del color seleccionado */}
      {currentColor && (
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div
            className="w-16 h-16 rounded-lg border-2 border-gray-300"
            style={{ backgroundColor: currentColor }}
          />
          <div className="flex-1">
            <p className="font-semibold">
              {selectedToken
                ? selectedToken.name
                : "Color personalizado"}
            </p>
            <p className="text-sm text-muted-foreground font-mono">
              {currentColor}
            </p>
            {selectedToken?.category && (
              <Badge variant="outline" className="text-xs mt-1">
                {selectedToken.category}
              </Badge>
            )}
          </div>
        </div>
      )}

      <Tabs defaultValue="tokens" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="tokens"
            className="flex items-center gap-2"
          >
            <Palette size={16} />
            Tokens
          </TabsTrigger>
          <TabsTrigger
            value="custom"
            className="flex items-center gap-2"
          >
            <Hash size={16} />
            Personalizado
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tokens" className="space-y-4">
          {tokens.length === 0 ? (
            <div className="text-center py-8">
              <Palette
                size={48}
                className="mx-auto mb-4 text-gray-400"
              />
              <h3 className="font-semibold mb-2">
                No hay tokens disponibles
              </h3>
              <p className="text-muted-foreground mb-4">
                Necesitas crear tokens de color primero
              </p>
              {onOpenTokenManager && (
                <Button
                  onClick={onOpenTokenManager}
                  variant="outline"
                >
                  Abrir Gestor de Tokens
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Filtros de búsqueda */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <Search
                      size={16}
                      className="absolute left-3 top-3 text-gray-400"
                    />
                    <Input
                      placeholder="Buscar tokens..."
                      value={searchTerm}
                      onChange={(e) =>
                        setSearchTerm(e.target.value)
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                {categories.length > 1 && (
                  <div className="sm:w-40">
                    <select
                      value={selectedCategory}
                      onChange={(e) =>
                        setSelectedCategory(e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md bg-white text-sm"
                    >
                      <option value="all">Todas</option>
                      {categories.slice(1).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Lista de tokens */}
              {filteredTokens.length === 0 ? (
                <div className="text-center py-6">
                  <Search
                    size={32}
                    className="mx-auto mb-2 text-gray-400"
                  />
                  <p className="text-muted-foreground">
                    No se encontraron tokens con esos filtros
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
                  {filteredTokens.map((token) => (
                    <Card
                      key={token.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedToken?.id === token.id
                          ? "ring-2 ring-blue-500 bg-blue-50"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => onSelectToken(token)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded border-2 border-gray-300 shrink-0"
                            style={{
                              backgroundColor: token.value,
                            }}
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-sm truncate">
                              {token.name}
                            </h4>
                            <p className="text-xs text-muted-foreground font-mono">
                              {token.value}
                            </p>
                            {token.category && (
                              <Badge
                                variant="outline"
                                className="text-xs mt-1"
                              >
                                {token.category}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <div>
            <Label htmlFor="custom-color">Color HEX</Label>
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <Input
                  id="custom-color"
                  value={customColorInput}
                  onChange={(e) =>
                    handleCustomColorChange(e.target.value)
                  }
                  placeholder="#FF5733"
                  className="font-mono"
                />
                {customColorInput &&
                  !isValidHex(customColorInput) && (
                    <p className="text-xs text-red-600 mt-1">
                      Formato HEX inválido (ej: #FF5733)
                    </p>
                  )}
              </div>
              {isValidHex(customColorInput) && (
                <div
                  className="w-12 h-12 rounded border-2 border-gray-300 shrink-0"
                  style={{ backgroundColor: customColorInput }}
                />
              )}
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>
              💡 <strong>Consejo:</strong> Es recomendable usar
              tokens para mantener consistencia en tu sistema de
              diseño.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}