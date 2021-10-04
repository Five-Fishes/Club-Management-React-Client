interface ISearchableModel<T> {
  elem: T;
  index: string;
}

export class SearchEngine<T> {
  private searchableModelList: Array<ISearchableModel<T>>;
  private genIndexFn: (obj: T) => string;

  constructor(searchIn: T[], genIndex: (obj: T) => string) {
    this.genIndexFn = genIndex;
    this.searchableModelList = searchIn.map<ISearchableModel<T>>(element => ({
      elem: element,
      index: this.genIndexFn(element),
    }));
  }

  search(searchWith: string): T[] {
    if (searchWith.trim().length === 0) {
      return this.searchableModelList.map<T>(element => element.elem);
    }

    return this.searchableModelList
      .filter(element => element.index.toLowerCase().includes(searchWith.toLowerCase()))
      .map<T>(element => element.elem);
  }

  updateEngine(searchIn: T[]): SearchEngine<T> {
    this.searchableModelList = searchIn.map<ISearchableModel<T>>(element => ({
      elem: element,
      index: this.genIndexFn(element),
    }));
    return this;
  }
}
