import { Test, TestingModule } from '@nestjs/testing';
import Employee from '../database/entities/employee.entity';
import { EmployeeController } from '../controllers/employee.controller';
import { EmployeeService } from '../services/employee.service';

const employeesList: Employee[] = [
  new Employee({id: "703d2d63-a4ff-4121-af79-123a76cf0f52", name: "Otavio Corrêa P. Silva", cpf: "98860939003", address: "Igrejinha/RS", email: "email1@gmail.com" }),
  new Employee({id: "8aa34e43-24d3-402b-8861-9401a27ec1a3", name: "Samuel Silva", cpf: "81540372030", address: "Igrejinha/RS", email: "email3@gmail.com" }),
  new Employee({id: "51837571-1d05-4c3f-918a-847e4b8b6253", name: "Alexandro Fernandes", cpf: "39932578045", address: "Viamão/RS", email: "email2@gmail.com" }),
  new Employee({id: "eafa20af-571e-4b1b-86fa-1349c95ae714", name: "Pafuncio de Oliveira", cpf: "98480517085", address: "São Paulo/SP", email: "email4@gmail.com" }),
];

describe('AppController', () => {
  let employeeController: EmployeeController;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
          useValue: {
            listAll: jest.fn().mockResolvedValue(employeesList),
            getOne: jest.fn().mockResolvedValue(employeesList[0]),
            create: jest.fn().mockResolvedValue(employeesList[0]),
            update: jest.fn(),
            delete: jest.fn().mockResolvedValue({ message: 'success!' }),
          },
        },
      ],
    }).compile();

    employeeController = app.get<EmployeeController>(EmployeeController);
    employeeService = app.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(employeeController).toBeDefined();
    expect(employeeService).toBeDefined();
  });

  describe('.index', () => {
    it('shold return a employees list entity', async () => {
      const result = await employeeController.index();
      expect(result).toEqual(employeesList);
    });

    it('shold not return a employees list entity', async () => {
      const result = await employeeController.index();
      expect(result).not.toEqual('ERROR!!!');
    });
  });

  describe('.show', () => {
    it('shold return a employee entity', async () => {
      const result = await employeeController.show("703d2d63-a4ff-4121-af79-123a76cf0f52");
      expect(result).toEqual(employeesList[0]);
    });

    it('shold not return a employee entity', async () => {
      const result = await employeeController.show("703d2d63-a4ff-4121-af79-123a76cf0f52");
      expect(result).not.toEqual('ERROR!!!');
    });
  });

  describe('.post', () => {
    it('create entity', async () => {
      const result = await employeeController.create({name: "Otavio Corrêa P. Silva", cpf: "98860939003", address: "Igrejinha/RS", email: "email1@gmail.com" });
      expect(result).toEqual(employeesList[0]);
    });
  });

  describe('.delete', () => {
    it('shold remove a employee entity', async () => {
      const result = await employeeController.delete("703d2d63-a4ff-4121-af79-123a76cf0f52");
      expect(result).toEqual({ message: 'success!' });
    });
  });
});
