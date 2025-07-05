export type SearchResults = {
  public_id: string;
  tags: string[];
};

export type Response = {
  status: number;
  message: string;
};

export type FoldersProps = {
  folders: {
    name: string;
    path: string;
    external_id: string;
  }[];
};
