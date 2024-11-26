import { AlunoModel } from "../alunos/aluno.model";
import { DisciplinaModel } from "../disciplinas/disciplina.model";
import { MatriculaModel } from "./matricula.model";

class MatriculaController {
  // Armazena todas as matrículas em memória
  private matriculas: MatriculaModel[] = [];

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

  listarMatriculasPorAluno(alunoId: string): MatriculaModel[] {
    return this.matriculas.filter((matricula) => matricula.aluno.id === alunoId);
  }

  cancelarMatricula(matriculaId: string): void {
    // Busca a matrícula ativa do aluno na disciplina
    const matricula = this.matriculas.find(
      (mat) => mat.id === matriculaId && mat.estaAtiva()
    );

    if (!matricula) {
      throw new Error("Matrícula não encontrada ou já está cancelada.");
    }

    // Cancela a matrícula
    matricula.cancelar();
  }
}

export default new MatriculaController();
