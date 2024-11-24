import { AlunoModel } from "../alunos/aluno.model";
import { DisciplinaModel } from "../disciplinas/disciplina.model";
import { MatriculaModel } from "./matricula.model";

class MatriculaController {
  // Armazena todas as matrículas em memória
  private matriculas: MatriculaModel[] = [];

  /**
   * Realiza a matrícula de um aluno em uma disciplina.
   * @param aluno - Instância de AlunoModel
   * @param disciplina - Instância de DisciplinaModel
   * @returns {MatriculaModel} - A matrícula realizada
   */
  realizarMatricula(aluno: AlunoModel, disciplina: DisciplinaModel): MatriculaModel {
    // Verifica se o aluno já está matriculado na disciplina
    const existente = this.matriculas.find(
      (matricula) => matricula.aluno.id === aluno.id && matricula.disciplina.id === disciplina.id && matricula.estaAtiva()
    );

    if (existente) {
      throw new Error(`O aluno ${aluno.nome} já está matriculado na disciplina ${disciplina.nome}.`);
    }

    // Cria uma nova matrícula e adiciona ao array de matrículas
    const novaMatricula = new MatriculaModel(aluno, disciplina);
    this.matriculas.push(novaMatricula);
    return novaMatricula;
  }

  /**
   * Lista todas as matrículas de um aluno.
   * @param alunoId - ID do aluno
   * @returns {MatriculaModel[]} - Lista de matrículas do aluno
   */
  listarMatriculasPorAluno(alunoId: string): MatriculaModel[] {
    return this.matriculas.filter((matricula) => matricula.aluno.id === alunoId);
  }

  /**
   * Cancela uma matrícula ativa.
   * @param alunoId - ID do aluno
   * @param disciplinaId - ID da disciplina
   */
  cancelarMatricula(alunoId: string, disciplinaId: string): void {
    // Busca a matrícula ativa do aluno na disciplina
    const matricula = this.matriculas.find(
      (mat) => mat.aluno.id === alunoId && mat.disciplina.id === disciplinaId && mat.estaAtiva()
    );

    if (!matricula) {
      throw new Error("Matrícula não encontrada ou já está cancelada.");
    }

    // Cancela a matrícula
    matricula.cancelar();
  }
}

export default new MatriculaController();
