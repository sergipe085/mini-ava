import { DisciplinaModel } from "./disciplina.model";

class DisciplinaController {
  // Método para buscar disciplinas de um curso específico
  public async buscarPorCurso(curso: string): Promise<DisciplinaModel[]> {
    try {
      // Chamando o método estático no model para buscar as disciplinas
      const disciplinas = await DisciplinaModel.buscarTodas();
      
      // Filtrando as disciplinas pelo curso
      return disciplinas.filter(
        (disciplina) => disciplina.curso.toLowerCase() === curso.toLowerCase()
      );
    } catch (error) {
      console.error("Erro ao buscar disciplinas:", error);
      throw new Error("Não foi possível buscar as disciplinas.");
    }
  }
}

export default new DisciplinaController();