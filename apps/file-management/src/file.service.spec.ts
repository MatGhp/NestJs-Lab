import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { FileRepository } from './file.repository';

const mockFileRepository = () => ({
  findByName: jest.fn(),
});

const mockFiles = [
  { id: '', name: 'zz', uri: '', saveDateTime: '' },
  { id: '', name: 'xx', uri: '', saveDateTime: '' },
];
describe('FileService', () => {
  let fileService: FileService;
  let fileRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        { provide: FileRepository, useFactory: mockFileRepository },
      ],
    }).compile();

    fileService = module.get(FileService);
    fileRepository = module.get(FileRepository);
  });

  it('FileService should call FileRepository and return valid data', async () => {
    fileRepository.findByName.mockResolvedValue(mockFiles);
    const result = await fileService.searchFileName('xxx');

    expect(fileRepository.findByName).toHaveBeenCalled();
    expect(result).toEqual(mockFiles);
  });
});
