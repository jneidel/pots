export type ValueOnly = {
  value: any|undefined;
}

export type PromptOptions = {
  value: any|undefined;
  prompt: string;
}

export type InteractiveDefaultOptions = {
  value: any|undefined;
  isInteractive: boolean;
  default: any;
  prompt?: string;
}

export type InteractiveOptions = {
  value: any|undefined;
  isInteractive: boolean;
  prompt?: string;
}
