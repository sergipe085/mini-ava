import React, { useEffect, useState } from "react";
import { LivroModel } from "./livro.model";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import livroController from "./livro.controller";

class LivroView {
  // Método para renderizar um seletor de livros
  renderSeletor({
    livroSelecionado,
    setLivroSelecionado,
  }: {
    livroSelecionado: LivroModel | null;
    setLivroSelecionado: (livro: LivroModel | null) => void;
  }) {
    const [livros, setLivros] = useState<LivroModel[]>([]);
    const [carregando, setCarregando] = useState<boolean>(true);

    // Carregar livros ao montar o componente
    useEffect(() => {
      const carregarLivros = async () => {
        try {
          setCarregando(true);
          const lista = await livroController.listarTodos();
          setLivros(lista);
        } catch (error) {
          console.error("Erro ao carregar livros:", error);
        } finally {
          setCarregando(false);
        }
      };

      carregarLivros();
    }, []);

    if (carregando) {
      return <p>Carregando livros...</p>;
    }

    return (
      <div>
        <Label htmlFor="seletor-livros">Selecione um livro:</Label>
        <Select
          value={livroSelecionado?.id || ""}
          onValueChange={(v) => setLivroSelecionado(livros.find((l) => l.id === v) || null)}
        >
          <SelectTrigger id="seletor-livros" className="">
            <SelectValue placeholder="Selecione um livro" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Livros</SelectLabel>
              {livros.map((livro) => (
                <SelectItem key={livro.id} value={livro.id} disabled={!livro.estaDisponivel()}>
                  {livro.titulo} {!livro.estaDisponivel() ? " (Indisponível)" : ""}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  }
}

export default new LivroView();
