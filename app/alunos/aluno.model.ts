// models/Aluno.ts

// Definindo a classe AlunoModel para representar o tipo de um Aluno
export class AlunoModel {
    id: string;
    nome: string;
    curso: string;
    modalidade: string;
    status: string;
  
    constructor(id: string, nome: string, curso: string, modalidade: string, status: string) {
      this.id = id;
      this.nome = nome;
      this.curso = curso;
      this.modalidade = modalidade;
      this.status = status;
    }
  
    // Método estático para buscar todos os alunos
    static async buscarTodos(): Promise<AlunoModel[]> {
      const res = await fetch(`http://localhost:3000/api/alunos`);
      const data = await res.json();
      
      // Retorna um array de instâncias da classe Aluno
      return data.map((item: any) => new AlunoModel(item.id, item.nome, item.curso, item.modalidade, item.status));
    }
  
    // Método estático para buscar aluno por ID a partir do array de alunos
    static async buscarPorId(id: string): Promise<AlunoModel | undefined> {
      const alunos = await AlunoModel.buscarTodos(); // Busca todos os alunos
      return alunos.find(aluno => aluno.id === id); // Encontra o aluno pelo ID
    }
  
    // Método estático para buscar alunos por nome a partir do array de alunos
    static async buscarPorNome(nome: string): Promise<AlunoModel[]> {
      const alunos = await AlunoModel.buscarTodos(); // Busca todos os alunos
      return alunos.filter(aluno => aluno.nome.toLowerCase().includes(nome.toLowerCase())); // Filtra alunos pelo nome
    }
  }
  