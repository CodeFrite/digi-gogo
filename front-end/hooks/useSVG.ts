import { useState, useEffect } from "react";

const useSVG = (url: string) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [svgDoc, setSvgDoc] = useState<Document | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "image/svg+xml");
        setSvgDoc(doc);
        setSvgContent(new XMLSerializer().serializeToString(doc));
      })
      .catch((err) => {
        console.error(`useSVG.useEffect> Error fetching SVG: ${url}`, err);
      });
  }, [url]);

  // Helper: Change text by ID or label
  const setText = (selector: string, text: string) => {
    if (svgDoc) {
      const element = svgDoc.querySelector(selector);
      if (element) {
        element.textContent = text;
        setSvgContent(new XMLSerializer().serializeToString(svgDoc));
      } else {
        console.error(`useSVG.setText> Element not found: ${selector}`);
      }
    }
  };

  // Helper: Change fill color
  const setColor = (selector: string, color: string) => {
    if (svgDoc) {
      const element = svgDoc.querySelector(selector);
      if (element) {
        element.setAttribute("fill", color);
        setSvgContent(new XMLSerializer().serializeToString(svgDoc));
      } else {
        console.error(`useSVG.setColor> Element selector not found: ${selector}`);
      }
    }
  };

  const showElement = (selector: string) => {
    if (svgDoc) {
      const element = svgDoc.querySelector(selector);
      if (element) {
        element.setAttribute("style", "display:block");
        setSvgContent(new XMLSerializer().serializeToString(svgDoc));
      } else {
        console.error(`useSVG.showElement> Element selector not found: ${selector}`);
      }
    }
  };

  const hideElement = (selector: string) => {
    if (svgDoc) {
      const element = svgDoc.querySelector(selector);
      if (element) {
        element.setAttribute("display", "none");
        setSvgContent(new XMLSerializer().serializeToString(svgDoc));
      } else {
        console.error(`useSVG.hideElement> Element selector not found: ${selector}`);
      }
    }
  };

  return { svgContent, setText, setColor, showElement, hideElement };
};

export default useSVG;
