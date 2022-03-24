import { Test, TestingModule } from '@nestjs/testing';
import Company from '../database/entities/company.entity';
import { CompanyController } from '../controllers/company.controller';
import { CompanyService } from '../services/company.service';

const companiesList: Company[] = [
  new Company({id: "703d2d63-a4ff-4121-af79-123a76cf0f52", name: "Google", cnpj: "87067171000116", address: "São Paulo/SP" }),
  new Company({id: "8aa34e43-24d3-402b-8861-9401a27ec1a3", name: "Facebook", cnpj: "26974018000188", address: "Rio de Janeiro/RJ" }),
];

describe('AppController', () => {
  let companyController: CompanyController;
  let companyService: CompanyService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: CompanyService,
          useValue: {
            listAll: jest.fn().mockResolvedValue(companiesList),
            getOne: jest.fn().mockResolvedValue(companiesList[0]),
            create: jest.fn().mockResolvedValue(companiesList[0]),
            update: jest.fn(),
            delete: jest.fn().mockResolvedValue({ message: 'success!' }),
          },
        },
      ],
    }).compile();

    companyController = app.get<CompanyController>(CompanyController);
    companyService = app.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(companyController).toBeDefined();
    expect(companyService).toBeDefined();
  });

  describe('.index', () => {
    it('shold return a companys list entity', async () => {
      const result = await companyController.index();
      expect(result).toEqual(companiesList);
    });

    it('shold not return a companies list entity', async () => {
      const result = await companyController.index();
      expect(result).not.toEqual('ERROR!!!');
    });
  });

  describe('.show', () => {
    it('shold return a company entity', async () => {
      const result = await companyController.show("703d2d63-a4ff-4121-af79-123a76cf0f52");
      expect(result).toEqual(companiesList[0]);
    });

    it('shold not return a company entity', async () => {
      const result = await companyController.show("703d2d63-a4ff-4121-af79-123a76cf0f52");
      expect(result).not.toEqual('ERROR!!!');
    });
  });

  describe('.post', () => {
    it('create entity', async () => {
      const result = await companyController.create({ name: "Google", cnpj: "87067171000116", address: "São Paulo/SP" });
      expect(result).toEqual(companiesList[0]);
    });
  });

  describe('.delete', () => {
    it('shold remove a company entity', async () => {
      const result = await companyController.delete("703d2d63-a4ff-4121-af79-123a76cf0f52");
      expect(result).toEqual({ message: 'success!' });
    });
  });
});
