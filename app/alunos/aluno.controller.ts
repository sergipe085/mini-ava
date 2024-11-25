import { AlunoModel } from "./aluno.model";

// controllers/AlunoController.ts
export class AlunoController {
  // Cache para armazenar os alunos em memória
  private alunosCache: AlunoModel[] | null = null;
  
  // Método para listar alunos
  public async listarAlunos(nome: string, curso: string, modalidade: string): Promise<AlunoModel[]> {
    // Se os alunos já estão armazenados no cache, retorna do cache
    if (this.alunosCache) {
      console.log(nome, curso);
      console.log("Retornando alunos do cache");
      return this.alunosCache.filter(a => 
        (!curso || a.curso === curso) && 
        (!nome || a.nome.toLocaleLowerCase().includes(nome.toLocaleLowerCase())) &&
        (!modalidade || a.modalidade === modalidade)
      );
    }

    // Se os dados não estão no cache, faz a chamada ao microsserviço
    const alunos = await AlunoModel.buscarPorNome(nome);
    
    // Armazena os alunos em cache para futuras requisições
    this.alunosCache = alunos;
    console.log("Alunos carregados do microsserviço e armazenados no cache");

    // Retorna os alunos
    return alunos;
  }

  // Método para detalhar um aluno específico
  public async detalharAluno(id: string): Promise<AlunoModel | null> {
    // Verifica se os dados estão no cache
    if (this.alunosCache) {
      const alunoCache = this.alunosCache.find(a => a.id === id);
      if (alunoCache) {
        console.log("Retornando aluno do cache");
        return alunoCache;
      }
    }

    // Se o aluno não estiver no cache, faz a chamada ao microsserviço
    const aluno = await AlunoModel.buscarPorId(id);
    console.log("Aluno carregado do microsserviço");

    // Retorna o aluno encontrado
    return aluno;
  }
}

export default new AlunoController();
