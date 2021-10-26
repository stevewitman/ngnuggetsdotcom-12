export interface AutofillFromUrl {
  urlPartial: string;
  type: string;
  sourceSite: string;
  sourceUrl: string;
  authorName?: string;
  authorUrl?: string;
}

export interface AutofillFromAuthorName {
  authorName: string;
  authorUrl?: string;
}

export interface NewPostData {
  autofillFromUrl: AutofillFromUrl[];
  autofillFromAuthorName: AutofillFromAuthorName[];
}