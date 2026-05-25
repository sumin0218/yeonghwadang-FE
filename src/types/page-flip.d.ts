declare module "page-flip" {
  type SizeType = "fixed" | "stretch";

  interface PageFlipOptions {
    width: number;
    height: number;
    size?: SizeType;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    swipeDistance?: number;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
  }

  interface FlipEvent {
    data: number;
  }

  class PageFlip {
    constructor(element: HTMLElement, options: PageFlipOptions);
    loadFromImages(images: string[]): void;
    loadFromHTML(elements: NodeListOf<HTMLElement> | HTMLElement[]): void;
    on(
      event: "flip" | "changeOrientation" | "changeState" | "init" | "update",
      handler: (e: FlipEvent) => void,
    ): this;
    flip(page: number): void;
    flipNext(): void;
    flipPrev(): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
    destroy(): void;
  }
}
