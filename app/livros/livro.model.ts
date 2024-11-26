export class LivroModel {
    id: string;
    titulo: string;
    autor: string;
    ano: number;
    status: string;
  
    constructor(id: string, titulo: string, autor: string, ano: number) {
      this.id = id;
      this.titulo = titulo;
      this.autor = autor;
      this.ano = ano;
      this.status = "disponivel";
    }
  
    // Método para buscar todos os livros
    static async buscarTodos(): Promise<LivroModel[]> {
      const res = await fetch('/api/livros');
      const data = await res.json();
      
      return data.map((item: any) => new LivroModel(item.id, item.titulo, item.autor, item.ano));
    }

    emprestar() {
      this.status = "emprestado"
    }

    estaDisponivel() {
      return this.status == "disponivel"
    }
}
  