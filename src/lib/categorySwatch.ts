import type { Category } from "@/data/suppliers";

export function categorySwatch(category: Category): React.CSSProperties {
  switch (category) {
    case "Knitwear":
      return {
        background:
          "repeating-linear-gradient(120deg, #0f766e 0px, #0f766e 16px, #134e4a 16px, #134e4a 32px, #f4d9b0 32px, #f4d9b0 48px, #be123c 48px, #be123c 64px)",
      };
    case "Denim":
      return {
        background: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 55%, #818cf8 100%)",
      };
    case "Wovens":
      return {
        background:
          "repeating-linear-gradient(115deg, #fde8d2 0px, #fde8d2 16px, #f4a988 16px, #f4a988 32px, #c96a4d 32px, #c96a4d 48px)",
      };
    case "Activewear":
      return {
        background: "linear-gradient(135deg, #0f172a 0%, #334155 55%, #64748b 100%)",
      };
    case "Ethnic Wear":
      return {
        background:
          "repeating-linear-gradient(120deg, #7c2d12 0px, #7c2d12 16px, #b45309 16px, #b45309 32px, #fde68a 32px, #fde68a 48px)",
      };
    case "Accessories":
      return {
        background: "linear-gradient(135deg, #134e4a 0%, #0d9488 55%, #5eead4 100%)",
      };
    case "Fabric & Textiles":
      return {
        background: "linear-gradient(135deg, #581c87 0%, #9333ea 55%, #d8b4fe 100%)",
      };
    default:
      return { background: "#e2e8f0" };
  }
}
