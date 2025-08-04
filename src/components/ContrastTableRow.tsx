import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Edit, Type, MousePointer } from "lucide-react";
import {
  getContrastRatio,
  getAccessibilityLevel,
  getWCAGCriteria,
} from "./ContrastCalculator";
import { ContentColor, WCAGType } from "./ContentColorEditor";
import { BackgroundColor } from "./BackgroundColorEditor";

interface ContrastTableRowProps {
  contentColor: ContentColor;
  backgroundColors: BackgroundColor[];
  onEditContent: () => void;
  onEditBackground: (backgroundId: string) => void;
  onUpdateWCAGType: (id: string, wcagType: WCAGType) => void;
}

function ContentColorFrame({
  contentColor,
  onClick,
}: {
  contentColor: ContentColor;
  onClick?: () => void;
}) {
  return (
    <div
      className="bg-[#e6f0ed] h-72 relative shrink-0 w-[280px] cursor-pointer hover:opacity-80 transition-opacity"
      style={{ backgroundColor: contentColor.color }}
      onClick={onClick}
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-72 items-center justify-end overflow-clip p-[22px] relative w-[280px] rounded-[0px]">
        {/* Display Frame - área vacía superior */}
        <div className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full">
          <div className="flex flex-col items-center justify-center relative size-full">
            <div className="size-full" />
          </div>
        </div>

        {/* Frame con información del content color */}
        <div className="bg-[rgba(246,246,246,0.9)] relative rounded-xl shrink-0 w-full">
          <div className="relative size-full">
            <div className="box-border content-stretch flex flex-row items-start justify-start relative w-full p-[12px]">
              <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
                <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full mb-1 gap-2">
                  <div className="font-['Poppins:SemiBold',_sans-serif] leading-[16px] not-italic relative flex-1 text-[#000000] text-[14px] text-left min-w-0">
                    <p className="block leading-[16px] break-words">
                      {contentColor.name}
                    </p>
                  </div>
                  <div className="bg-[rgba(30,41,59,0.1)] box-border content-stretch flex flex-row gap-1 items-center justify-center overflow-clip px-2 py-1 relative rounded-lg shrink-0">
                    {contentColor.wcagType === "text" ? (
                      <Type
                        size={10}
                        className="text-[#1e293b]"
                      />
                    ) : (
                      <MousePointer
                        size={10}
                        className="text-[#1e293b]"
                      />
                    )}
                    <div className="font-['Poppins:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e293b] text-[8px] text-left text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">
                        {contentColor.wcagType === "text"
                          ? "Texto"
                          : "Interactivo"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full pt-[2px] pr-[0px] pb-[0px] pl-[0px]">
                  <div className="bg-[rgba(246,246,246,0)] box-border content-stretch flex flex-row gap-2 items-start justify-start overflow-clip p-0 relative shrink-0">
                    <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[12px] text-left text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">
                        {contentColor.color.toLowerCase()}
                      </p>
                    </div>
                  </div>
                  {contentColor.token && (
                    <div className="bg-[rgba(150,54,255,0.1)] box-border content-stretch flex flex-row gap-0.5 items-center justify-start overflow-clip px-2 py-1 relative rounded-xl shrink-0 py-[3px] px-[7px]">
                      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#9636ff] text-[8px] text-left text-nowrap">
                        <p className="block leading-[normal] whitespace-pre">
                          🔗 {contentColor.token}
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
  );
}

function ContrastCell({
  contentColor,
  backgroundColor,
  wcagType,
  onEditBackground,
}: {
  contentColor: ContentColor;
  backgroundColor: BackgroundColor;
  wcagType: WCAGType;
  onEditBackground: () => void;
}) {
  const contrastRatio = getContrastRatio(
    contentColor.color,
    backgroundColor.color,
  );
  const wcagLevel = getAccessibilityLevel(
    contrastRatio,
    wcagType,
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case "AAA":
        return "bg-green-100 text-green-900";
      case "AA":
        return "bg-green-100 text-green-900";
      case "AALarge":
        return "bg-yellow-100 text-yellow-900";
      case "FAIL":
        return "bg-red-100 text-red-900";
      default:
        return "bg-gray-100 text-gray-900";
    }
  };

  return (
    <div
      className="h-72 relative shrink-0 w-[280px] cursor-pointer hover:opacity-80 transition-opacity"
      style={{ backgroundColor: backgroundColor.color }}
      onClick={onEditBackground}
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-72 items-center justify-end overflow-clip p-[22px] relative w-[280px]">
        {/* Display Frame - área superior con el preview del contenido */}
        <div className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full">
          <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
            <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[24px] relative size-full">
              <div
                className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[120px] text-left w-[168px]"
                style={{ color: contentColor.color }}
              >
                <p className="block leading-[normal] text-[80px] text-center">
                  {wcagType === "text"
                    ? "Aa"
                    : contentColor.wcagType === "interactive"
                      ? "●"
                      : "Aa"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Frame con información del ratio de contraste */}
        <div className="bg-[rgba(246,246,246,0.9)] box-border content-stretch flex flex-row gap-2 h-[60px] items-center justify-center p-[10px] relative rounded-xl shrink-0 px-[10px] py-[10px] px-[16px] py-[10px] py-[10px]">
          <div className="font-['Poppins:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[26px] text-left text-nowrap tracking-[0.52px]">
            <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
              {contrastRatio.toFixed(2)}
            </p>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`box-border content-stretch flex flex-row items-center justify-center overflow-clip px-3 py-2 relative rounded-[99px] shrink-0 cursor-help ${getLevelColor(wcagLevel)}`}
              >
                <div className="font-['Roboto:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[18px] text-left text-nowrap">
                  <p className="block leading-[normal] whitespace-pre">
                    {wcagLevel}
                  </p>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <div className="space-y-2">
                <div>
                  <p className="font-semibold">{getWCAGCriteria(contentColor.wcagType).name}</p>
                  <p className="text-xs opacity-90">{getWCAGCriteria(contentColor.wcagType).standard}</p>
                </div>
                <div>
                  <p className="text-xs">{getWCAGCriteria(contentColor.wcagType).description}</p>
                </div>
                <div className="text-xs">
                  <p className="font-medium">Ratios requeridos:</p>
                  {contentColor.wcagType === 'interactive' ? (
                    <p>• AA: {getWCAGCriteria(contentColor.wcagType).requirements.AA}:1</p>
                  ) : (
                    <div>
                      <p>• AALarge: {getWCAGCriteria(contentColor.wcagType).requirements.AALarge}:1</p>
                      <p>• AA: {getWCAGCriteria(contentColor.wcagType).requirements.AA}:1</p>
                      <p>• AAA: {getWCAGCriteria(contentColor.wcagType).requirements.AAA}:1</p>
                    </div>
                  )}
                </div>
                <div className="text-xs border-t pt-2 opacity-90">
                  <p><strong>Ratio actual:</strong> {contrastRatio.toFixed(2)}:1</p>
                  <p><strong>Tipo:</strong> {contentColor.wcagType === 'text' ? '📝 Texto' : '🖱️ Interactivo'}</p>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

export default function ContrastTableRow({
  contentColor,
  backgroundColors,
  onEditContent,
  onEditBackground,
  onUpdateWCAGType,
}: ContrastTableRowProps) {
  const [showWCAGSelector, setShowWCAGSelector] =
    useState(false);

  const handleWCAGTypeChange = (newType: WCAGType) => {
    onUpdateWCAGType(contentColor.id, newType);
    setShowWCAGSelector(false);
  };

  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0">
      {/* Celda de color de contenido */}
      <ContentColorFrame
        contentColor={contentColor}
        onClick={onEditContent}
      />

      {/* Celdas de contraste para cada background */}
      {backgroundColors.map((backgroundColor) => (
        <ContrastCell
          key={backgroundColor.id}
          contentColor={contentColor}
          backgroundColor={backgroundColor}
          wcagType={contentColor.wcagType}
          onEditBackground={() =>
            onEditBackground(backgroundColor.id)
          }
        />
      ))}

      {/* Selector de tipo WCAG flotante (solo en móvil) */}
      {showWCAGSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 sm:hidden">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <Select
              value={contentColor.wcagType}
              onValueChange={handleWCAGTypeChange}
            >
              <SelectTrigger className="w-48">
                <SelectValue>
                  {contentColor.wcagType === "text" ? (
                    <div className="flex items-center gap-2">
                      <Type size={14} />
                      <span>Texto</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <MousePointer size={14} />
                      <span>Interactivo</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">
                  <div className="flex items-center gap-2">
                    <Type size={14} />
                    <span>Texto</span>
                  </div>
                </SelectItem>
                <SelectItem value="interactive">
                  <div className="flex items-center gap-2">
                    <MousePointer size={14} />
                    <span>Interactivo</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 w-full"
              onClick={() => setShowWCAGSelector(false)}
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}