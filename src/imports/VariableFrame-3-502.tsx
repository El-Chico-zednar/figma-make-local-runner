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

export default function VariableFrame() {
  return (
    <div className="bg-[#08312a] relative size-full" data-name="variableFrame">
      <div className="flex flex-col items-center justify-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 items-center justify-end p-[22px] relative size-full">
          <DisplayFrame />
          <Frame3 />
        </div>
      </div>
      <div className="absolute border-4 border-[rgba(246,246,246,0.9)] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}