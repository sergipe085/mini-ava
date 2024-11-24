export class DisciplinaModel {
    id: string;
    nome: string;
    curso: string;
  
    constructor(id: string, nome: string, curso: string) {
      this.id = id;
      this.nome = nome;
      this.curso = curso;
    }
  
    // Método para buscar todas as disciplinas
    static async buscarTodas(): Promise<DisciplinaModel[]> {
      const res = await fetch('/api/disciplinas');
      const data = await res.json();
      
      return data.map((item: any) => new DisciplinaModel(item.id, item.nome, item.curso));
    }
}
  