import { Test, TestingModule } from '@nestjs/testing';
import { FileRepository } from './file.repository';
import { FileManagementService } from './file-management.service';

const mockFileRepository = () => ({
  findByName: jest.fn(),
});

const mockFiles = [
  { id: '', name: 'zz', uri: '', saveDateTime: '' },
  { id: '', name: 'xx', uri: '', saveDateTime: '' },
];
describe('FileService', () => {
  let fileService: FileManagementService;
  let fileRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileManagementService,
        { provide: FileRepository, useFactory: mockFileRepository },
      ],
    }).compile();

    fileService = module.get(FileManagementService);
    fileRepository = module.get(FileRepository);
  });

  // it('FileService should call FileRepository and return valid data', async () => {
  //   fileRepository.findByName.mockResolvedValue(mockFiles);
  //   const result = await fileService.searchFileName('xxx');
  //
  //   expect(fileRepository.findByName).toHaveBeenCalled();
  //   expect(result).toEqual(mockFiles);
  // });
});
