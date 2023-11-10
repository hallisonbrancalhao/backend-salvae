import {
  CategoriaEstabelecimento,
  Coordenadas,
  EnderecoEstabelecimento,
  Estabelecimento,
} from '../../core/infra/entities';
import { CreateEstabelecimentoDto } from '../../core/infra/dtos';
import { EstabelecimentoService } from '../../modules/estabelecimento/estabelecimento.service';
import { GeocodingService } from '../../utilities';
import { PasswordHasherService } from '../../utilities/password-hasher';
import { Repository, DataSource } from 'typeorm';

describe('EstabelecimentoService', () => {
  let mockEstabelecimentoRepository = {
    create: jest.fn().mockReturnValueOnce({
      save: jest.fn().mockResolvedValueOnce({}),
    }),
    save: jest.fn().mockResolvedValueOnce({}),
    createQueryBuilder: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getOneOrFail: jest.fn().mockResolvedValueOnce({}),
      getMany: jest.fn().mockResolvedValueOnce([1]),
    }),
    findOne: jest.fn().mockResolvedValueOnce({
      leftJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getOneOrFail: jest
        .fn()
        .mockResolvedValueOnce({ id: 1, cnpj: '1094793396464' }),
    }),
    update: jest.fn().mockResolvedValueOnce({}),
  } as unknown as Repository<Estabelecimento>;

  let mockEnderecoRepository = {
    create: jest.fn().mockReturnValueOnce({
      save: jest.fn().mockResolvedValueOnce({}),
    }),
    save: jest.fn().mockResolvedValueOnce({}),
    findOne: jest.fn().mockResolvedValueOnce({}),
  } as unknown as Repository<EnderecoEstabelecimento>;

  let mockCoordenadasRepository = {
    create: jest.fn().mockReturnValueOnce({
      save: jest.fn().mockResolvedValueOnce({}),
    }),
    save: jest.fn().mockResolvedValueOnce({}),
  } as unknown as Repository<Coordenadas>;

  let mockCategoriaRepository = {
    findOne: jest.fn().mockResolvedValueOnce({
      save: jest.fn().mockResolvedValueOnce({}),
    }),
    save: jest.fn().mockResolvedValueOnce({}),
  } as unknown as Repository<CategoriaEstabelecimento>;

  let mockGeocodingService = {
    getCoordinates: jest
      .fn()
      .mockResolvedValueOnce({ latitude: '3', longitude: '4' }),
  } as unknown as GeocodingService;

  let mockHasher = {
    hashPassword: jest.fn().mockResolvedValueOnce('hashedPassword'),
  } as unknown as PasswordHasherService;

  let mockConnection = {
    transaction: jest.fn().mockImplementation((callback) =>
      callback({
        save: jest.fn().mockResolvedValueOnce({}),
      }),
    ),
  } as unknown as DataSource;
  let estabelecimentoService: EstabelecimentoService;
  let estabelecimentoDto: CreateEstabelecimentoDto;

  beforeEach(() => {
    mockGeocodingService = {
      getCoordinates: jest
        .fn()
        .mockResolvedValueOnce({ latitude: '3', longitude: '4' }),
    } as unknown as GeocodingService;
    mockHasher = {
      hashPassword: jest.fn().mockResolvedValueOnce('hashedPassword'),
    } as unknown as PasswordHasherService;
    mockConnection = {
      transaction: jest.fn().mockImplementation((callback) =>
        callback({
          save: jest.fn().mockResolvedValueOnce({}),
        }),
      ),
    } as unknown as DataSource;

    estabelecimentoService = new EstabelecimentoService(
      mockEstabelecimentoRepository,
      mockEnderecoRepository,
      mockCoordenadasRepository,
      mockCategoriaRepository,
      mockConnection,
      mockGeocodingService,
      mockHasher,
    );

    estabelecimentoDto = {
      cnpj: '1094793396464',
      nome: 'Lanchão do Hallison',
      senha: '123123',
      endereco: {
        cep: '87014-000',
        numero: '246',
        complemento: 'Casa',
        logradouro: 'Rua Fernão Dias',
        bairro: 'Zona Armazém',
        cidade: 'Maringá',
        estado: 'Paraná',
        pais: 'Brasil',
      },
      estabelecimentoCategoria: 3,
      whatsapp: '(43)988556622',
      instagram: '@hallisonbrancalhao',
      fotoCapa: 'Foto Teste',
      fotoPerfil: 'Foto Teste',
      status: true,
    };
  });

  describe('POST /estabelecimento', () => {
    it('should create a new establishment with valid data', async () => {
      const created = await estabelecimentoService.create(estabelecimentoDto);
      expect(created).toBeDefined();
    });

    it('should throw an error if the establishment already exists', async () => {
      await estabelecimentoService.create(estabelecimentoDto).catch((error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Estabelecimento já cadastrado');
      });
    });

    it('should throw an error if the category does not exist', async () => {
      estabelecimentoDto.estabelecimentoCategoria = -1;
      await estabelecimentoService.create(estabelecimentoDto).catch((error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Categoria não encontrada');
      });
    });

    it('should throw an error if the status is invalid', async () => {
      estabelecimentoDto.status = null;
      await estabelecimentoService.create(estabelecimentoDto).catch((error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Status inválido');
      });
    });
  });

  describe('GET /estabelecimento', () => {
    it('should return all establishments', async () => {
      const establishments = await estabelecimentoService.findAll();
      expect(establishments).toHaveLength(1);
    });

    it('should return a specific establishment', async () => {
      const establishment = await estabelecimentoService.findOne('1');
      expect(establishment).toBeDefined();
    });

    it('should throw an error if the establishment does not exist', async () => {
      await estabelecimentoService.findOne('-1').catch((error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Estabelecimento não encontrado');
      });
    });
  });

  // describe('PUT /estabelecimento', () => {
  //   it('should update an establishment with valid data', async () => {
  //     const idEstabelecimento = await estabelecimentoService.findAll();
  //     const updated = await estabelecimentoService.update(
  //       String(idEstabelecimento[0].id),
  //       estabelecimentoDto,
  //     );
  //     expect(updated).toBeDefined();
  //   });
  // });
});
