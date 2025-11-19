import { Channels } from "./channels";
import { DebugPages } from "./debug";
import Page_Not_Found from "./not-found";

export const Pages = {
  Page_Not_Found,
  ...Channels,
  ...DebugPages,
}

export const PageSets = {
  Channels,
  DebugPages,
}