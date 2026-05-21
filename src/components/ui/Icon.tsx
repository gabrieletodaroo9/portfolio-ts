import arrowLeft from "bootstrap-icons/icons/arrow-left.svg?raw";
import arrowRight from "bootstrap-icons/icons/arrow-right.svg?raw";
import arrowUp from "bootstrap-icons/icons/arrow-up.svg?raw";
import arrowsFullscreen from "bootstrap-icons/icons/arrows-fullscreen.svg?raw";
import checkLg from "bootstrap-icons/icons/check-lg.svg?raw";
import chevronDown from "bootstrap-icons/icons/chevron-down.svg?raw";
import chevronLeft from "bootstrap-icons/icons/chevron-left.svg?raw";
import chevronRight from "bootstrap-icons/icons/chevron-right.svg?raw";
import codeSlash from "bootstrap-icons/icons/code-slash.svg?raw";
import diagram3 from "bootstrap-icons/icons/diagram-3.svg?raw";
import github from "bootstrap-icons/icons/github.svg?raw";
import layers from "bootstrap-icons/icons/layers.svg?raw";
import lightningCharge from "bootstrap-icons/icons/lightning-charge.svg?raw";
import linkedin from "bootstrap-icons/icons/linkedin.svg?raw";
import search from "bootstrap-icons/icons/search.svg?raw";
import send from "bootstrap-icons/icons/send.svg?raw";
import shieldCheck from "bootstrap-icons/icons/shield-check.svg?raw";
import xLg from "bootstrap-icons/icons/x-lg.svg?raw";

const iconMarkup = {
  "arrow-left": arrowLeft,
  "arrow-right": arrowRight,
  "arrow-up": arrowUp,
  "arrows-fullscreen": arrowsFullscreen,
  "check-lg": checkLg,
  "chevron-down": chevronDown,
  "chevron-left": chevronLeft,
  "chevron-right": chevronRight,
  "code-slash": codeSlash,
  "diagram-3": diagram3,
  github,
  layers,
  "lightning-charge": lightningCharge,
  linkedin,
  search,
  send,
  "shield-check": shieldCheck,
  "x-lg": xLg,
};

export type IconName = keyof typeof iconMarkup;

type IconProps = {
  name: IconName;
  className?: string;
};

export default function Icon({ name, className = "" }: IconProps) {
  return (
    <span
      className={`app-icon ${className}`.trim()}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: iconMarkup[name] }}
    />
  );
}
