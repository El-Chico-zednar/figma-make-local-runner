function Group126837() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] h-60 ml-0 mt-0 relative w-[280px]">
        <div className="absolute bottom-[-0.208%] left-[-0.179%] right-[-0.179%] top-[-0.208%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 282 242"
          >
            <path
              d="M1 1L281 241"
              id="Vector 1315"
              stroke="var(--stroke-0, #D8E2E9)"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <div className="[grid-area:1_/_1] font-['Libre_Franklin:Regular',_sans-serif] ml-[108.5px] mt-[185px] not-italic relative text-[#3c3d3e] text-[24px] text-center text-nowrap translate-x-[-50%]">
        <p className="block leading-[28px] whitespace-pre">Content</p>
      </div>
      <div className="[grid-area:1_/_1] font-['Libre_Franklin:Regular',_sans-serif] ml-[211.5px] mt-[60px] not-italic relative text-[#3c3d3e] text-[24px] text-center text-nowrap translate-x-[-50%]">
        <p className="block leading-[28px] whitespace-pre">Background</p>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-80 items-center justify-center overflow-clip p-[40px] relative shrink-0 w-[360px]"
      data-name
    >
      <Group126837 />
    </div>
  );
}

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

function VariableFrame() {
  return (
    <div
      className="bg-[#08312a] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame />
        <Frame3 />
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

function ValueStatus1() {
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

function Badge1() {
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
        <p className="block leading-[normal]">onPrimary/surface</p>
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

function VariableFrame1() {
  return (
    <div
      className="bg-[#270b64] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame1 />
        <Frame4 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function Frame10() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0">
      <Component />
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

function ValueStatus2() {
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

function Badge2() {
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

function Frame20() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <ValueStatus2 />
      <Badge2 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-left w-full">
        <p className="block leading-[normal]">onPrimary/text</p>
      </div>
      <Frame20 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] relative rounded-xl shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-start p-[16px] relative w-full">
          <Frame5 />
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
        <Frame6 />
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

function Frame7() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative rounded-xl shrink-0">
      <div className="font-['Poppins:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[26px] text-left text-nowrap tracking-[0.52px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          12.17
        </p>
      </div>
      <Level />
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
        <Frame7 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function DisplayFrame4() {
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
    <div className="bg-[rgba(246,246,246,0.9)] box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative rounded-xl shrink-0">
      <div className="font-['Poppins:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[26px] text-left text-nowrap tracking-[0.52px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          12.17
        </p>
      </div>
      <Level1 />
    </div>
  );
}

function VariableFrame4() {
  return (
    <div
      className="bg-[#270b64] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame4 />
        <Frame8 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function Frame11() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0">
      <VariableFrame2 />
      <VariableFrame3 />
      <VariableFrame4 />
    </div>
  );
}

function DisplayFrame5() {
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
        <p className="block leading-[normal] whitespace-pre">#9bbfb2ff</p>
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
          🔗 primaryBrand/200
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
        <p className="block leading-[normal]">onPrimary/textSubdued</p>
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

function VariableFrame5() {
  return (
    <div
      className="bg-[#9bbfb2] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame5 />
        <Frame22 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function DisplayFrame6() {
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
    <div className="bg-[rgba(246,246,246,0.9)] box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative rounded-xl shrink-0">
      <div className="font-['Poppins:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[26px] text-left text-nowrap tracking-[0.52px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          7.07
        </p>
      </div>
      <Level2 />
    </div>
  );
}

function VariableFrame6() {
  return (
    <div
      className="bg-[#08312a] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame6 />
        <Frame23 />
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
          <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#9bbfb2] text-[120px] text-left w-[168px]">
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

function Frame24() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative rounded-xl shrink-0">
      <div className="font-['Poppins:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[26px] text-left text-nowrap tracking-[0.52px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          7.07
        </p>
      </div>
      <Level3 />
    </div>
  );
}

function VariableFrame7() {
  return (
    <div
      className="bg-[#270b64] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame7 />
        <Frame24 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function Frame12() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0">
      <VariableFrame5 />
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
        <p className="block leading-[normal] whitespace-pre">#e6f0edff</p>
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
          🔗 primaryBrand/050
        </p>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <ValueStatus4 />
      <Badge4 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-left w-full">
        <p className="block leading-[normal]">onPrimary/icon</p>
      </div>
      <Frame25 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] relative rounded-xl shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-start p-[16px] relative w-full">
          <Frame26 />
        </div>
      </div>
    </div>
  );
}

function VariableFrame8() {
  return (
    <div
      className="bg-[#e6f0ed] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame8 />
        <Frame27 />
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
          <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e6f0ed] text-[120px] text-left w-[168px]">
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

function Frame28() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative rounded-xl shrink-0">
      <div className="font-['Poppins:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[26px] text-left text-nowrap tracking-[0.52px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          12.17
        </p>
      </div>
      <Level4 />
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
        <Frame28 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function DisplayFrame10() {
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

function Frame29() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative rounded-xl shrink-0">
      <div className="font-['Poppins:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[26px] text-left text-nowrap tracking-[0.52px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          12.17
        </p>
      </div>
      <Level5 />
    </div>
  );
}

function VariableFrame10() {
  return (
    <div
      className="bg-[#270b64] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame10 />
        <Frame29 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function Frame13() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0">
      <VariableFrame8 />
      <VariableFrame9 />
      <VariableFrame10 />
    </div>
  );
}

function DisplayFrame11() {
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
        <p className="block leading-[normal] whitespace-pre">#00e47cff</p>
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

function Frame30() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <ValueStatus5 />
      <Badge5 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-left w-full">
        <p className="block leading-[normal]">onPrimary/button/default</p>
      </div>
      <Frame30 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] relative rounded-xl shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-start p-[16px] relative w-full">
          <Frame31 />
        </div>
      </div>
    </div>
  );
}

function VariableFrame11() {
  return (
    <div
      className="bg-[#00e47c] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame11 />
        <Frame32 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function DisplayFrame12() {
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

function Frame33() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative rounded-xl shrink-0">
      <div className="font-['Poppins:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[26px] text-left text-nowrap tracking-[0.52px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          8.35
        </p>
      </div>
      <Level6 />
    </div>
  );
}

function VariableFrame12() {
  return (
    <div
      className="bg-[#08312a] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame12 />
        <Frame33 />
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
          <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#00e47c] text-[120px] text-left w-[168px]">
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

function Frame34() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative rounded-xl shrink-0">
      <div className="font-['Poppins:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[26px] text-left text-nowrap tracking-[0.52px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          8.35
        </p>
      </div>
      <Level7 />
    </div>
  );
}

function VariableFrame13() {
  return (
    <div
      className="bg-[#270b64] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame13 />
        <Frame34 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function Frame14() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0">
      <VariableFrame11 />
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

function ValueStatus6() {
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

function Frame35() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <ValueStatus6 />
      <Badge6 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-left w-full">
        <p className="block leading-[normal]">onPrimary/button/hover</p>
      </div>
      <Frame35 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] relative rounded-xl shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-start p-[16px] relative w-full">
          <Frame36 />
        </div>
      </div>
    </div>
  );
}

function VariableFrame14() {
  return (
    <div
      className="bg-[#53f3ad] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame14 />
        <Frame37 />
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
          <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#53f3ad] text-[120px] text-left w-[168px]">
            <p className="block leading-[normal]">Aa</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Level8() {
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

function Frame38() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative rounded-xl shrink-0">
      <div className="font-['Poppins:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[26px] text-left text-nowrap tracking-[0.52px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          9.97
        </p>
      </div>
      <Level8 />
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
        <Frame38 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function DisplayFrame16() {
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

function Level9() {
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

function Frame39() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative rounded-xl shrink-0">
      <div className="font-['Poppins:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[26px] text-left text-nowrap tracking-[0.52px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          9.97
        </p>
      </div>
      <Level9 />
    </div>
  );
}

function VariableFrame16() {
  return (
    <div
      className="bg-[#270b64] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame16 />
        <Frame39 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function Frame40() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0">
      <VariableFrame14 />
      <VariableFrame15 />
      <VariableFrame16 />
    </div>
  );
}

function DisplayFrame17() {
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
        <p className="block leading-[normal] whitespace-pre">#00c76eff</p>
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

function Frame41() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <ValueStatus7 />
      <Badge7 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-left w-full">
        <p className="block leading-[normal]">onPrimary/button/pressed</p>
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

function VariableFrame17() {
  return (
    <div
      className="bg-[#00c76e] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame17 />
        <Frame43 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function DisplayFrame18() {
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

function Level10() {
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
    <div className="bg-[rgba(246,246,246,0.9)] box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative rounded-xl shrink-0">
      <div className="font-['Poppins:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[26px] text-left text-nowrap tracking-[0.52px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          6.33
        </p>
      </div>
      <Level10 />
    </div>
  );
}

function VariableFrame18() {
  return (
    <div
      className="bg-[#08312a] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame18 />
        <Frame44 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function DisplayFrame19() {
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

function Level11() {
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

function Frame45() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative rounded-xl shrink-0">
      <div className="font-['Poppins:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[26px] text-left text-nowrap tracking-[0.52px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          6.33
        </p>
      </div>
      <Level11 />
    </div>
  );
}

function VariableFrame19() {
  return (
    <div
      className="bg-[#270b64] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame19 />
        <Frame45 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function Frame16() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0">
      <VariableFrame17 />
      <VariableFrame18 />
      <VariableFrame19 />
    </div>
  );
}

function DisplayFrame20() {
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
        <p className="block leading-[normal] whitespace-pre">#00aa60ff</p>
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

function Frame46() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <ValueStatus8 />
      <Badge8 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-left w-full">
        <p className="block leading-[normal]">onPrimary/button/focus</p>
      </div>
      <Frame46 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] relative rounded-xl shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-start p-[16px] relative w-full">
          <Frame47 />
        </div>
      </div>
    </div>
  );
}

function VariableFrame20() {
  return (
    <div
      className="bg-[#00aa60] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame20 />
        <Frame48 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function DisplayFrame21() {
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

function Level12() {
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

function Frame49() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative rounded-xl shrink-0">
      <div className="font-['Poppins:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[26px] text-left text-nowrap tracking-[0.52px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          4.67
        </p>
      </div>
      <Level12 />
    </div>
  );
}

function VariableFrame21() {
  return (
    <div
      className="bg-[#08312a] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame21 />
        <Frame49 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function DisplayFrame22() {
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

function Level13() {
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

function Frame50() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative rounded-xl shrink-0">
      <div className="font-['Poppins:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[26px] text-left text-nowrap tracking-[0.52px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          4.67
        </p>
      </div>
      <Level13 />
    </div>
  );
}

function VariableFrame22() {
  return (
    <div
      className="bg-[#270b64] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame22 />
        <Frame50 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function Frame17() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0">
      <VariableFrame20 />
      <VariableFrame21 />
      <VariableFrame22 />
    </div>
  );
}

function DisplayFrame23() {
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

function ValueStatus9() {
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

function Badge9() {
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

function Frame51() {
  return (
    <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
      <ValueStatus9 />
      <Badge9 />
    </div>
  );
}

function Frame52() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="font-['Poppins:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#486d5c] text-[14px] text-left w-full">
        <p className="block leading-[normal]">i</p>
      </div>
      <Frame51 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] relative rounded-xl shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-start p-[16px] relative w-full">
          <Frame52 />
        </div>
      </div>
    </div>
  );
}

function VariableFrame23() {
  return (
    <div
      className="bg-[#a8f9d4] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame23 />
        <Frame53 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function DisplayFrame24() {
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

function Level14() {
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

function Frame54() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative rounded-xl shrink-0">
      <div className="font-['Poppins:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[26px] text-left text-nowrap tracking-[0.52px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          4.67
        </p>
      </div>
      <Level14 />
    </div>
  );
}

function VariableFrame24() {
  return (
    <div
      className="bg-[#08312a] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame24 />
        <Frame54 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function DisplayFrame25() {
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

function Level15() {
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

function Frame55() {
  return (
    <div className="bg-[rgba(246,246,246,0.9)] box-border content-stretch flex flex-row gap-2 h-[73px] items-center justify-center p-[16px] relative rounded-xl shrink-0">
      <div className="font-['Poppins:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[26px] text-left text-nowrap tracking-[0.52px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
          4.67
        </p>
      </div>
      <Level15 />
    </div>
  );
}

function VariableFrame25() {
  return (
    <div
      className="bg-[#270b64] h-80 relative shrink-0 w-[360px]"
      data-name="variableFrame"
    >
      <div className="box-border content-stretch flex flex-col gap-1 h-80 items-center justify-end overflow-clip p-[22px] relative w-[360px]">
        <DisplayFrame25 />
        <Frame55 />
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function Frame18() {
  return (
    <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0">
      <VariableFrame23 />
      <VariableFrame24 />
      <VariableFrame25 />
    </div>
  );
}

export default function Frame56() {
  return (
    <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative size-full">
      <Frame10 />
      <Frame11 />
      <Frame12 />
      <Frame13 />
      <Frame14 />
      <Frame40 />
      <Frame16 />
      <Frame17 />
      <Frame18 />
    </div>
  );
}