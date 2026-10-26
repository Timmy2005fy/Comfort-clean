import logoDarkSvg from "../assets/logo-dark.svg";
import logoLightSvg from "../assets/logo-light.svg";
import logoDarkPng from "../assets/logo-dark.png";
import logoLightPng from "../assets/logo-light.png";

interface LogoProps {
  /** "dark" has dark ink text for light backgrounds (e.g. Header); "light" has white text for dark backgrounds (e.g. Footer) */
  variant?: "dark" | "light";
  className?: string;
  format?: "svg" | "png";
}

export function Logo({
  variant = "dark",
  className = "h-12 w-auto",
  format = "svg",
}: LogoProps) {
  const isDark = variant === "dark";
  const src =
    format === "png"
      ? isDark
        ? logoDarkPng
        : logoLightPng
      : isDark
        ? logoDarkSvg
        : logoLightSvg;

  return (
    <img
      src={src}
      alt="Comfort Clean - We keep it clean for your comfort"
      className={`${className} object-contain transition-transform`}
      loading="eager"
    />
  );
}
