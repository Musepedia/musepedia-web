export interface ExhibitDTO {
  exhibitLabel: string
  exhibitDescription: string
  exhibitUrl: string
}

export declare function getExhibitInfo(id: number): Promise<ExhibitDTO>;
