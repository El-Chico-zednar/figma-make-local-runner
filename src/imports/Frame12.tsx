function DisplayFrame() {
  return (
    <div
      className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="displayFrame"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function VariableFrame() {
  return (
    <div className="h-80 relative shrink-0 w-[360px]" data-name="variableFrame">
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function DisplayFrame1() {
  return (
    <div
      className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="displayFrame"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function ValueStatus() {
  return (
    <div
      className="bg-[rgba(246,246,246,0)] box-border content-stretch flex flex-row gap-2 items-start justify-start overflow-clip p-0 relative shrink-0"
      data-name="Value Status"
    >
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[12px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">#08312aff</p>
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div
      className="bg-[rgba(150,54,255,0.1)] box-border content-stretch flex flex-row gap-0.5 items-center justify-start overflow-clip px-2 py-1 relative rounded-xl shrink-0"
      data-name="badge"
    >
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#9636ff] text-[8px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          🔗 primaryBrand/600
        </p>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <ValueStatus />
      <Badge />
    </div>
  );
}

function Frame1() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-left w-full">
        <p className="block leading-[normal]">onPrimary/surface</p>
      </div>
      <Frame15 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] relative rounded-xl shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-start p-[16px] relative w-full">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function VariableFrame1() {
  return (
    <div
      className="bg-[#08312a] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame1 />
        <Frame3 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function Frame10() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 w-full">
      <VariableFrame />
      <VariableFrame1 />
    </div>
  );
}

function DisplayFrame2() {
  return (
    <div
      className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="displayFrame"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function ValueStatus1() {
  return (
    <div
      className="bg-[rgba(246,246,246,0)] box-border content-stretch flex flex-row gap-2 items-start justify-start overflow-clip p-0 relative shrink-0"
      data-name="Value Status"
    >
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[12px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">#e6f0edff</p>
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div
      className="bg-[rgba(150,54,255,0.1)] box-border content-stretch flex flex-row gap-0.5 items-center justify-start overflow-clip px-2 py-1 relative rounded-xl shrink-0"
      data-name="badge"
    >
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#9636ff] text-[8px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          🔗 primaryBrand/050
        </p>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <ValueStatus1 />
      <Badge1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-left w-full">
        <p className="block leading-[normal]">onPrimary/text</p>
      </div>
      <Frame19 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] relative rounded-xl shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-start p-[16px] relative w-full">
          <Frame2 />
        </div>
      </div>
    </div>
  );
}

function VariableFrame2() {
  return (
    <div
      className="bg-[#e6f0ed] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame2 />
        <Frame4 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function DisplayFrame3() {
  return (
    <div
      className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="displayFrame"
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[24px] relative size-full">
          <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e6f0ed] text-[120px] text-left w-[168px]">
            <p className="block leading-[normal]">Aa</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Level() {
  return (
    <div
      className="bg-green-100 box-border content-stretch flex flex-row items-center justify-center overflow-clip px-3 py-2 relative rounded-[99px] shrink-0"
      data-name="Level"
    >
      <div
        className="font-['Roboto:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[18px] text-green-900 text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal] whitespace-pre">AAA</p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] h-[73px] relative rounded-xl shrink-0 w-full">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative w-full">
          <div className="basis-0 font-['Poppins:Bold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#000000] text-[26px] text-right tracking-[0.52px]">
            <p className="block leading-[normal]">12.17</p>
          </div>
          <Level />
        </div>
      </div>
    </div>
  );
}

function VariableFrame3() {
  return (
    <div
      className="bg-[#08312a] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame3 />
        <Frame5 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function Frame11() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 w-full">
      <VariableFrame2 />
      <VariableFrame3 />
    </div>
  );
}

function DisplayFrame4() {
  return (
    <div
      className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="displayFrame"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function ValueStatus2() {
  return (
    <div
      className="bg-[rgba(246,246,246,0)] box-border content-stretch flex flex-row gap-2 items-start justify-start overflow-clip p-0 relative shrink-0"
      data-name="Value Status"
    >
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[12px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">#9bbfb2ff</p>
      </div>
    </div>
  );
}

function Badge2() {
  return (
    <div
      className="bg-[rgba(150,54,255,0.1)] box-border content-stretch flex flex-row gap-0.5 items-center justify-start overflow-clip px-2 py-1 relative rounded-xl shrink-0"
      data-name="badge"
    >
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#9636ff] text-[8px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          🔗 primaryBrand/200
        </p>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <ValueStatus2 />
      <Badge2 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-left w-full">
        <p className="block leading-[normal]">onPrimary/textSubdued</p>
      </div>
      <Frame20 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] relative rounded-xl shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-start p-[16px] relative w-full">
          <Frame6 />
        </div>
      </div>
    </div>
  );
}

function VariableFrame4() {
  return (
    <div
      className="bg-[#9bbfb2] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame4 />
        <Frame7 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function DisplayFrame5() {
  return (
    <div
      className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="displayFrame"
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[24px] relative size-full">
          <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#9bbfb2] text-[120px] text-left w-[168px]">
            <p className="block leading-[normal]">Aa</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Level1() {
  return (
    <div
      className="bg-green-100 box-border content-stretch flex flex-row items-center justify-center overflow-clip px-3 py-2 relative rounded-[99px] shrink-0"
      data-name="Level"
    >
      <div
        className="font-['Roboto:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[18px] text-green-900 text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal] whitespace-pre">AAA</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] h-[73px] relative rounded-xl shrink-0 w-full">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative w-full">
          <div className="basis-0 font-['Poppins:Bold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#000000] text-[26px] text-right tracking-[0.52px]">
            <p className="block leading-[normal]">7.07</p>
          </div>
          <Level1 />
        </div>
      </div>
    </div>
  );
}

function VariableFrame5() {
  return (
    <div
      className="bg-[#08312a] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame5 />
        <Frame8 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function Frame12() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 w-full">
      <VariableFrame4 />
      <VariableFrame5 />
    </div>
  );
}

function DisplayFrame6() {
  return (
    <div
      className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="displayFrame"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function ValueStatus3() {
  return (
    <div
      className="bg-[rgba(246,246,246,0)] box-border content-stretch flex flex-row gap-2 items-start justify-start overflow-clip p-0 relative shrink-0"
      data-name="Value Status"
    >
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[12px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">#e6f0edff</p>
      </div>
    </div>
  );
}

function Badge3() {
  return (
    <div
      className="bg-[rgba(150,54,255,0.1)] box-border content-stretch flex flex-row gap-0.5 items-center justify-start overflow-clip px-2 py-1 relative rounded-xl shrink-0"
      data-name="badge"
    >
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#9636ff] text-[8px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          🔗 primaryBrand/050
        </p>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <ValueStatus3 />
      <Badge3 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-left w-full">
        <p className="block leading-[normal]">onPrimary/icon</p>
      </div>
      <Frame21 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] relative rounded-xl shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-start p-[16px] relative w-full">
          <Frame9 />
        </div>
      </div>
    </div>
  );
}

function VariableFrame6() {
  return (
    <div
      className="bg-[#e6f0ed] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame6 />
        <Frame22 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function DisplayFrame7() {
  return (
    <div
      className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="displayFrame"
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[24px] relative size-full">
          <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e6f0ed] text-[120px] text-left w-[168px]">
            <p className="block leading-[normal]">Aa</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Level2() {
  return (
    <div
      className="bg-green-100 box-border content-stretch flex flex-row items-center justify-center overflow-clip px-3 py-2 relative rounded-[99px] shrink-0"
      data-name="Level"
    >
      <div
        className="font-['Roboto:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[18px] text-green-900 text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal] whitespace-pre">AAA</p>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] h-[73px] relative rounded-xl shrink-0 w-full">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative w-full">
          <div className="basis-0 font-['Poppins:Bold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#000000] text-[26px] text-right tracking-[0.52px]">
            <p className="block leading-[normal]">12.17</p>
          </div>
          <Level2 />
        </div>
      </div>
    </div>
  );
}

function VariableFrame7() {
  return (
    <div
      className="bg-[#08312a] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame7 />
        <Frame23 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function Frame13() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 w-full">
      <VariableFrame6 />
      <VariableFrame7 />
    </div>
  );
}

function DisplayFrame8() {
  return (
    <div
      className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="displayFrame"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function ValueStatus4() {
  return (
    <div
      className="bg-[rgba(246,246,246,0)] box-border content-stretch flex flex-row gap-2 items-start justify-start overflow-clip p-0 relative shrink-0"
      data-name="Value Status"
    >
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[12px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">#00e47cff</p>
      </div>
    </div>
  );
}

function Badge4() {
  return (
    <div
      className="bg-[rgba(150,54,255,0.1)] box-border content-stretch flex flex-row gap-0.5 items-center justify-start overflow-clip px-2 py-1 relative rounded-xl shrink-0"
      data-name="badge"
    >
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#9636ff] text-[8px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          🔗 accentBrand/500
        </p>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <ValueStatus4 />
      <Badge4 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-left w-full">
        <p className="block leading-[normal]">onPrimary/button/default</p>
      </div>
      <Frame24 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] relative rounded-xl shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-start p-[16px] relative w-full">
          <Frame25 />
        </div>
      </div>
    </div>
  );
}

function VariableFrame8() {
  return (
    <div
      className="bg-[#00e47c] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame8 />
        <Frame26 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function DisplayFrame9() {
  return (
    <div
      className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="displayFrame"
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[24px] relative size-full">
          <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#00e47c] text-[120px] text-left w-[168px]">
            <p className="block leading-[normal]">Aa</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Level3() {
  return (
    <div
      className="bg-green-100 box-border content-stretch flex flex-row items-center justify-center overflow-clip px-3 py-2 relative rounded-[99px] shrink-0"
      data-name="Level"
    >
      <div
        className="font-['Roboto:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[18px] text-green-900 text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal] whitespace-pre">AAA</p>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] h-[73px] relative rounded-xl shrink-0 w-full">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative w-full">
          <div className="basis-0 font-['Poppins:Bold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#000000] text-[26px] text-right tracking-[0.52px]">
            <p className="block leading-[normal]">8.35</p>
          </div>
          <Level3 />
        </div>
      </div>
    </div>
  );
}

function VariableFrame9() {
  return (
    <div
      className="bg-[#08312a] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame9 />
        <Frame27 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function Frame14() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 w-full">
      <VariableFrame8 />
      <VariableFrame9 />
    </div>
  );
}

function DisplayFrame10() {
  return (
    <div
      className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="displayFrame"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function ValueStatus5() {
  return (
    <div
      className="bg-[rgba(246,246,246,0)] box-border content-stretch flex flex-row gap-2 items-start justify-start overflow-clip p-0 relative shrink-0"
      data-name="Value Status"
    >
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[12px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">#53f3adff</p>
      </div>
    </div>
  );
}

function Badge5() {
  return (
    <div
      className="bg-[rgba(150,54,255,0.1)] box-border content-stretch flex flex-row gap-0.5 items-center justify-start overflow-clip px-2 py-1 relative rounded-xl shrink-0"
      data-name="badge"
    >
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#9636ff] text-[8px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          🔗 accentBrand/500
        </p>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <ValueStatus5 />
      <Badge5 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-left w-full">
        <p className="block leading-[normal]">onPrimary/button/hover</p>
      </div>
      <Frame28 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] relative rounded-xl shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-start p-[16px] relative w-full">
          <Frame29 />
        </div>
      </div>
    </div>
  );
}

function VariableFrame10() {
  return (
    <div
      className="bg-[#53f3ad] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame10 />
        <Frame30 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function DisplayFrame11() {
  return (
    <div
      className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="displayFrame"
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[24px] relative size-full">
          <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#53f3ad] text-[120px] text-left w-[168px]">
            <p className="block leading-[normal]">Aa</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Level4() {
  return (
    <div
      className="bg-green-100 box-border content-stretch flex flex-row items-center justify-center overflow-clip px-3 py-2 relative rounded-[99px] shrink-0"
      data-name="Level"
    >
      <div
        className="font-['Roboto:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[18px] text-green-900 text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal] whitespace-pre">AAA</p>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] h-[73px] relative rounded-xl shrink-0 w-full">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative w-full">
          <div className="basis-0 font-['Poppins:Bold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#000000] text-[26px] text-right tracking-[0.52px]">
            <p className="block leading-[normal]">9.97</p>
          </div>
          <Level4 />
        </div>
      </div>
    </div>
  );
}

function VariableFrame11() {
  return (
    <div
      className="bg-[#08312a] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame11 />
        <Frame31 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function Frame32() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 w-full">
      <VariableFrame10 />
      <VariableFrame11 />
    </div>
  );
}

function DisplayFrame12() {
  return (
    <div
      className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="displayFrame"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function ValueStatus6() {
  return (
    <div
      className="bg-[rgba(246,246,246,0)] box-border content-stretch flex flex-row gap-2 items-start justify-start overflow-clip p-0 relative shrink-0"
      data-name="Value Status"
    >
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[12px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">#00c76eff</p>
      </div>
    </div>
  );
}

function Badge6() {
  return (
    <div
      className="bg-[rgba(150,54,255,0.1)] box-border content-stretch flex flex-row gap-0.5 items-center justify-start overflow-clip px-2 py-1 relative rounded-xl shrink-0"
      data-name="badge"
    >
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#9636ff] text-[8px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          🔗 accentBrand/500
        </p>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <ValueStatus6 />
      <Badge6 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-left w-full">
        <p className="block leading-[normal]">onPrimary/button/pressed</p>
      </div>
      <Frame33 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] relative rounded-xl shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-start p-[16px] relative w-full">
          <Frame34 />
        </div>
      </div>
    </div>
  );
}

function VariableFrame12() {
  return (
    <div
      className="bg-[#00c76e] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame12 />
        <Frame35 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function DisplayFrame13() {
  return (
    <div
      className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="displayFrame"
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[24px] relative size-full">
          <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#00c76e] text-[120px] text-left w-[168px]">
            <p className="block leading-[normal]">Aa</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Level5() {
  return (
    <div
      className="bg-green-100 box-border content-stretch flex flex-row items-center justify-center overflow-clip px-3 py-2 relative rounded-[99px] shrink-0"
      data-name="Level"
    >
      <div
        className="font-['Roboto:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[18px] text-green-900 text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal] whitespace-pre">AAA</p>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] h-[73px] relative rounded-xl shrink-0 w-full">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative w-full">
          <div className="basis-0 font-['Poppins:Bold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#000000] text-[26px] text-right tracking-[0.52px]">
            <p className="block leading-[normal]">6.33</p>
          </div>
          <Level5 />
        </div>
      </div>
    </div>
  );
}

function VariableFrame13() {
  return (
    <div
      className="bg-[#08312a] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame13 />
        <Frame36 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function Frame16() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 w-full">
      <VariableFrame12 />
      <VariableFrame13 />
    </div>
  );
}

function DisplayFrame14() {
  return (
    <div
      className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="displayFrame"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function ValueStatus7() {
  return (
    <div
      className="bg-[rgba(246,246,246,0)] box-border content-stretch flex flex-row gap-2 items-start justify-start overflow-clip p-0 relative shrink-0"
      data-name="Value Status"
    >
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[12px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">#00aa60ff</p>
      </div>
    </div>
  );
}

function Badge7() {
  return (
    <div
      className="bg-[rgba(150,54,255,0.1)] box-border content-stretch flex flex-row gap-0.5 items-center justify-start overflow-clip px-2 py-1 relative rounded-xl shrink-0"
      data-name="badge"
    >
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#9636ff] text-[8px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          🔗 accentBrand/500
        </p>
      </div>
    </div>
  );
}

function Frame37() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <ValueStatus7 />
      <Badge7 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-left w-full">
        <p className="block leading-[normal]">onPrimary/button/focus</p>
      </div>
      <Frame37 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] relative rounded-xl shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-start p-[16px] relative w-full">
          <Frame38 />
        </div>
      </div>
    </div>
  );
}

function VariableFrame14() {
  return (
    <div
      className="bg-[#00aa60] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame14 />
        <Frame39 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function DisplayFrame15() {
  return (
    <div
      className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="displayFrame"
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[24px] relative size-full">
          <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#00aa60] text-[120px] text-left w-[168px]">
            <p className="block leading-[normal]">Aa</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Level6() {
  return (
    <div
      className="bg-green-100 box-border content-stretch flex flex-row items-center justify-center overflow-clip px-3 py-2 relative rounded-[99px] shrink-0"
      data-name="Level"
    >
      <div
        className="font-['Roboto:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[18px] text-green-900 text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal] whitespace-pre">AAA</p>
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] h-[73px] relative rounded-xl shrink-0 w-full">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative w-full">
          <div className="basis-0 font-['Poppins:Bold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#000000] text-[26px] text-right tracking-[0.52px]">
            <p className="block leading-[normal]">4.67</p>
          </div>
          <Level6 />
        </div>
      </div>
    </div>
  );
}

function VariableFrame15() {
  return (
    <div
      className="bg-[#08312a] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame15 />
        <Frame40 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function Frame17() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 w-full">
      <VariableFrame14 />
      <VariableFrame15 />
    </div>
  );
}

function DisplayFrame16() {
  return (
    <div
      className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="displayFrame"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function ValueStatus8() {
  return (
    <div
      className="bg-[rgba(246,246,246,0)] box-border content-stretch flex flex-row gap-2 items-start justify-start overflow-clip p-0 relative shrink-0"
      data-name="Value Status"
    >
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[12px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">#a8f9d4ff</p>
      </div>
    </div>
  );
}

function Badge8() {
  return (
    <div
      className="bg-[rgba(150,54,255,0.1)] box-border content-stretch flex flex-row gap-0.5 items-center justify-start overflow-clip px-2 py-1 relative rounded-xl shrink-0"
      data-name="badge"
    >
      <div className="font-['Poppins:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#9636ff] text-[8px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          🔗 accentBrand/500
        </p>
      </div>
    </div>
  );
}

function Frame41() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <ValueStatus8 />
      <Badge8 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-left w-full">
        <p className="block leading-[normal]">onPrimary/button/disabled</p>
      </div>
      <Frame41 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] relative rounded-xl shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-start p-[16px] relative w-full">
          <Frame42 />
        </div>
      </div>
    </div>
  );
}

function VariableFrame16() {
  return (
    <div
      className="bg-[#a8f9d4] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame16 />
        <Frame43 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function DisplayFrame17() {
  return (
    <div
      className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="displayFrame"
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[24px] relative size-full">
          <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#a8f9d4] text-[120px] text-left w-[168px]">
            <p className="block leading-[normal]">Aa</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Level7() {
  return (
    <div
      className="bg-green-100 box-border content-stretch flex flex-row items-center justify-center overflow-clip px-3 py-2 relative rounded-[99px] shrink-0"
      data-name="Level"
    >
      <div
        className="font-['Roboto:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[18px] text-green-900 text-left text-nowrap"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        <p className="block leading-[normal] whitespace-pre">AAA</p>
      </div>
    </div>
  );
}

function Frame44() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] h-[73px] relative rounded-xl shrink-0 w-full">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative w-full">
          <div className="basis-0 font-['Poppins:Bold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#000000] text-[26px] text-right tracking-[0.52px]">
            <p className="block leading-[normal]">4.67</p>
          </div>
          <Level7 />
        </div>
      </div>
    </div>
  );
}

function VariableFrame17() {
  return (
    <div
      className="bg-[#08312a] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame17 />
        <Frame44 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function Frame18() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 w-full">
      <VariableFrame16 />
      <VariableFrame17 />
    </div>
  );
}

export default function Frame45() {
  return (
    <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative size-full">
      <Frame10 />
      <Frame11 />
      <Frame12 />
      <Frame13 />
      <Frame14 />
      <Frame32 />
      <Frame16 />
      <Frame17 />
      <Frame18 />
    </div>
  );
}