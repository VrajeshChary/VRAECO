import { useEffect, type ReactElement, type ReactNode } from "react";

interface HelmetProps {
  title?: string;
  children?: ReactNode;
}

/**
 * Lightweight Helmet replacement — no peer dependencies.
 * Updates <title>, <meta>, <link>, <script> in document.head.
 * Cleans up on unmount to prevent stale tags.
 */
export function Helmet({ title, children }: HelmetProps) {
  useEffect(() => {
    // Track elements we create so we can clean them up
    const createdElements: HTMLElement[] = [];

    // Set title
    if (title) {
      document.title = title;
    }

    // Process children (meta, link, script tags)
    const process = (child: ReactNode) => {
      if (!child || typeof child !== "object") return;
      const el = child as ReactElement;
      // Skip React functional components, only handle native elements
      if (typeof el.type !== "string") return;

      const tag = el.type;
      const props = el.props as Record<string, any>;
      // Determine a unique key for dedup
      const key =
        props["data-helmet-key"] ||
        `${tag}:${props.name || props.property || props.rel || props.href || props.src || props.type || "0"}`;
      const elementId = `vraeco-helmet-${key.replace(/[^a-zA-Z0-9-]/g, "_")}`;

      const getTextContent = (value: any): string | null => {
        if (value === null || value === undefined) return null;
        if (typeof value === "string" || typeof value === "number") return String(value);
        if (Array.isArray(value)) return value.map(getTextContent).filter(Boolean).join("");
        return null;
      };

      const childContent = getTextContent(props.children);
      let element = document.getElementById(elementId);

      if (element) {
        // Update existing element attributes
        element.innerHTML = "";
        for (const [k, v] of Object.entries(props)) {
          if (
            k === "children" ||
            k === "data-helmet-key" ||
            k === "dangerouslySetInnerHTML"
          )
            continue;
          try {
            element.setAttribute(k, v);
          } catch {
            /* unsupported attr */
          }
        }
        if (childContent !== null) {
          element.textContent = childContent;
        }
        // Handle script/noscript innerHTML
        if (
          props.dangerouslySetInnerHTML &&
          typeof props.dangerouslySetInnerHTML === "object" &&
          "__html" in props.dangerouslySetInnerHTML
        ) {
          element.innerHTML = props.dangerouslySetInnerHTML.__html;
        }
      } else {
        // Create new element
        element = document.createElement(tag);
        element.id = elementId;
        element.setAttribute("data-helmet", "true");
        for (const [k, v] of Object.entries(props)) {
          if (
            k === "children" ||
            k === "data-helmet-key" ||
            k === "dangerouslySetInnerHTML"
          )
            continue;
          try {
            element.setAttribute(k, v);
          } catch {
            /* unsupported attr */
          }
        }
        if (childContent !== null) {
          element.textContent = childContent;
        }
        if (
          props.dangerouslySetInnerHTML &&
          typeof props.dangerouslySetInnerHTML === "object" &&
          "__html" in props.dangerouslySetInnerHTML
        ) {
          element.innerHTML = props.dangerouslySetInnerHTML.__html;
        }
        document.head.appendChild(element);
        createdElements.push(element);
      }
    };

    const iterate = (child: ReactNode) => {
      if (Array.isArray(child)) {
        child.forEach(iterate);
      } else if (child && typeof child === "object") {
        // Could be a ReactElement or null
        const el = child as ReactElement;
        if (typeof el === "object" && el !== null) {
          process(child);
        }
      }
    };

    if (children) {
      iterate(children);
    }

    return () => {
      createdElements.forEach((el) => el.remove());
    };
  }, [title, children]);

  return null;
}
