# Explicação técnica do código de verificação de número primo

Este arquivo descreve a lógica usada em `num_primos.py` para determinar se um número inteiro é primo.

## Estrutura do código

O código foi refatorado para separar responsabilidades:
- `eh_primo(n)` valida a entrada e aplica casos especiais.
- `possui_divisor_impar(numero)` cuida da busca por divisores ímpares.
- `main()` encapsula a execução de exemplos.

## Função `eh_primo(n)`

A função aceita um inteiro `n` e retorna `True` se ele for primo.

### Validação inicial

- `if not isinstance(n, int) or n < 2:`
  - Garante que apenas inteiros válidos sejam processados.
  - Números menores que 2 não são primos.

### Casos triviais

- `if n in (2, 3):`
  - 2 e 3 são primos e são tratados imediatamente.
- `if n % 2 == 0:`
  - Elimina rapidamente os números pares maiores que 2.

### Delegação de responsabilidade

- `return not possui_divisor_impar(n)`
  - Encaminha a verificação dos possíveis divisores para uma função separada.
  - Isso melhora a legibilidade e torna o código mais modular.

## Função `possui_divisor_impar(numero)`

- Usa `math.isqrt(numero)` para calcular a raiz quadrada inteira de `numero`.
- Testa apenas divisores ímpares de 3 até `limite`.
- Se encontrar um divisor, retorna `True`.
- Caso contrário, retorna `False`.

### Por que isso funciona?

- Um número composto sempre tem um divisor menor ou igual à sua raiz quadrada.
- Números pares já foram eliminados antes de chegar aqui.

## Função `main()`

- Agrupa os exemplos de teste em uma lista.
- Imprime o resultado de cada valor usando `eh_primo(valor)`.
- Facilita a execução direta do script.

## Benefícios da refatoração

- Código mais legível e de fácil manutenção.
- Responsabilidades separadas em funções pequenas.
- Uso de `math.isqrt` para uma verificação de limite clara e eficiente.
- Estrutura limpa com `main()` e entrada protegida por `if __name__ == '__main__'.`
