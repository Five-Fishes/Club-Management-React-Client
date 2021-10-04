import { SearchEngine } from 'app/shared/util/native-search-utils';

describe('Search Engine', () => {
  const response: IMockReponse[] = [
    {
      firstName: 'LU',
      lastName: 'XIANZE',
    },
    {
      firstName: 'LU',
      lastName: 'xian ze',
    },
    {
      firstName: 'SIA',
      lastName: 'SIM CHEONG',
    },
    {
      firstName: 'YAW',
      lastName: 'JIAN HAO',
    },
    {
      firstName: 'SAW',
      lastName: 'KIAT Chun',
    },
    {
      firstName: 'Chan',
      lastName: 'Ka Chun',
    },
  ];

  const generateIndex = (mockResponse: IMockReponse) => {
    const searchIndex = (mockResponse.firstName?.trim() || '') + (mockResponse.lastName?.trim() || '');
    return searchIndex.replace(/\s+/g, '').toLowerCase();
  };

  const searchEngine: SearchEngine = new SearchEngine<IMockReponse>(JSON.parse(JSON.stringify(response)), generateIndex);

  it('search 1', () => {
    expect(searchEngine.search('').length).toEqual(6);
  });
  it('search 2', () => {
    expect(searchEngine.search('uxianz').length).toEqual(2);
  });
  it('search 3', () => {
    expect(searchEngine.search('sia').length).toEqual(1);
  });
  it('search 4', () => {
    expect(searchEngine.search('awji').length).toEqual(1);
  });
  it('search 5', () => {
    expect(searchEngine.search('KIATC').length).toEqual(1);
  });
  it('search 6', () => {
    expect(searchEngine.search('CHan').length).toEqual(1);
  });
});

interface IMockReponse {
  firstName: string;
  lastName: string;
}
