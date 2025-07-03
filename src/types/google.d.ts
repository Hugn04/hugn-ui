export {};

declare global {
  interface Window {
    adsbygoogle: {
      push: (params?: any) => void;
      [index: number]: any;
    } & any[];
  }
}
