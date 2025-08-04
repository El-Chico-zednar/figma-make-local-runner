import { getContrastRatio, getAccessibilityLevel, isColorLight } from './ContrastCalculator';

interface ColorContrastPairProps {
  lightColor: string;
  darkColor: string;
  lightColorName: string;
  darkColorName: string;
  lightToken?: string;
  darkToken?: string;
  onEdit?: () => void;
}

function ColorInfo({ color, name, token, isBackground }: {
  color: string;
  name: string;
  token?: string;
  isBackground: boolean;
}) {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] relative rounded-xl shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-start p-[16px] relative w-full">
          <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
            <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-left w-full">
              <p className="block leading-[normal]">{name}</p>
            </div>
            <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
              <div className="bg-[rgba(246,246,246,0)] box-border content-stretch flex flex-row gap-2 items-start justify-start overflow-clip p-0 relative shrink-0">
                <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[12px] text-left text-nowrap">
                  <p className="block leading-[normal] whitespace-pre">{color.toLowerCase()}</p>
                </div>
              </div>
              {token && (
                <div className="bg-[rgba(150,54,255,0.1)] box-border content-stretch flex flex-row gap-0.5 items-center justify-start overflow-clip px-2 py-1 relative rounded-xl shrink-0">
                  <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#9636ff] text-[8px] text-left text-nowrap">
                    <p className="block leading-[normal] whitespace-pre">🔗 {token}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DisplayFrame({ color, children }: { color: string; children?: React.ReactNode }) {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        {children || <div className="size-full" />}
      </div>
    </div>
  );
}

function ContrastRating({ ratio }: { ratio: number }) {
  const level = getAccessibilityLevel(ratio);
  const bgColor = level === 'FAIL' ? 'bg-red-100' : 'bg-green-100';
  const textColor = level === 'FAIL' ? 'text-red-900' : 'text-green-900';
  
  return (
    <div className="bg-[rgba(246,246,246,0.9)] h-[73px] relative rounded-xl shrink-0 w-full">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative w-full">
          <div className="basis-0 font-['Poppins:Bold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#000000] text-[26px] text-right tracking-[0.52px]">
            <p className="block leading-[normal]">{ratio.toFixed(2)}</p>
          </div>
          <div className={`${bgColor} box-border content-stretch flex flex-row items-center justify-center overflow-clip px-3 py-2 relative rounded-[99px] shrink-0`}>
            <div className={`font-['Roboto:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[18px] ${textColor} text-left text-nowrap`}>
              <p className="block leading-[normal] whitespace-pre">{level}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ColorContrastPair({
  lightColor,
  darkColor,
  lightColorName,
  darkColorName,
  lightToken,
  darkToken,
  onEdit
}: ColorContrastPairProps) {
  const contrastRatio = getContrastRatio(lightColor, darkColor);
  
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 w-full group">
      {/* Light color frame */}
      <div 
        className="h-80 relative shrink-0 w-[360px] cursor-pointer hover:opacity-80 transition-opacity"
        style={{ backgroundColor: lightColor }}
        onClick={onEdit}
      >
        <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
          <DisplayFrame color={lightColor}>
            <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[24px] relative size-full">
              <div 
                className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[120px] text-left w-[168px]"
                style={{ color: darkColor }}
              >
                <p className="block leading-[normal]">Aa</p>
              </div>
            </div>
          </DisplayFrame>
          <ColorInfo 
            color={lightColor} 
            name={lightColorName} 
            token={lightToken}
            isBackground={true}
          />
        </div>
        <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
      </div>

      {/* Dark color frame */}
      <div 
        className="h-80 relative shrink-0 w-[360px] cursor-pointer hover:opacity-80 transition-opacity"
        style={{ backgroundColor: darkColor }}
        onClick={onEdit}
      >
        <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
          <DisplayFrame color={darkColor}>
            <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[24px] relative size-full">
              <div 
                className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[120px] text-left w-[168px]"
                style={{ color: lightColor }}
              >
                <p className="block leading-[normal]">Aa</p>
              </div>
            </div>
          </DisplayFrame>
          <ContrastRating ratio={contrastRatio} />
        </div>
        <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
      </div>
    </div>
  );
}