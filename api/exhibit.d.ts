export interface ExhibitionHallDTO{
  id: number,
  name: string,
  description: string
}

export interface ExhibitDTO {
  label: string
  description: string
  url: string,
  figureUrl: string,
  hot: boolean,
  exhibitionHall: ExhibitionHallDTO
}

export declare function getExhibitInfoById(id: number): Promise<ExhibitDTO>;

export declare function getRandomExhibits(): Promise<Array<ExhibitDTO>>;
