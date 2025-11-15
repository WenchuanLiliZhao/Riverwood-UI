import type { ReactNode } from "react";


export type PageType = 'channel' | 'demo' | 'document' | 'example'

export interface PageInfoProps {
  title: string;
  slug: string;
  description: string;
  type: PageType;
  icon?: string;
  cover?: string;
  updateDate?: Date;
  tags?: string[];
}

export interface Page {
  header: PageInfoProps;
  content: ReactNode;
}