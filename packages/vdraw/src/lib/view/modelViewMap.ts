import type {Component} from "svelte";
import RectView from "$lib/view/shapes/RectView.svelte";

export interface ModelViewMap {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: Component<any>;
}

export function createModelViewMap(): ModelViewMap {
  return {
    "rect": RectView,
  };
}
