import { LivroModel } from "./livro.model";

class LivroController {
  private livrosCache: LivroModel[] | null = null;

  // Método para buscar disciplinas de um curso específico
  public async listarTodos(): Promise<LivroModel[]> {
    try {
      // Chamando o método estático no model para buscar as disciplinas
      let livros = []
      if (!this.livrosCache) {
        this.livrosCache = await LivroModel.buscarTodos();
      }
      livros = this.livrosCache;
      
      // Filtrando as disciplinas pelo curso
      return livros;
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      throw new Error("Não foi possível buscar os livros.");
    }
  }
}

export default new LivroController();
