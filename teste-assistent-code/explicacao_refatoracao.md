# Explicação do Código em refatoracao.py

O código define uma função chamada `c` que recebe uma lista `l` como parâmetro. A função calcula e retorna quatro valores: a soma total dos elementos da lista, a média, o maior valor e o menor valor.

## Detalhes da Função

- **Inicialização da soma (t)**: Começa com `t = 0`.
- **Loop para somar**: Percorre todos os elementos da lista e adiciona cada um a `t`.
- **Cálculo da média (m)**: Divide a soma total pelo número de elementos (`len(l)`).
- **Inicialização de máximo e mínimo**: Define `mx` e `mn` como o primeiro elemento da lista.
- **Loop para encontrar max e min**: Percorre novamente a lista para atualizar `mx` se encontrar um valor maior, e `mn` se encontrar um menor.
- **Retorno**: Retorna `t`, `m`, `mx`, `mn`.

## Código de Exemplo

O código cria uma lista `x` com valores [23, 7, 45, 2, 67, 12, 89, 34, 56, 11].

Chama a função `c(x)` e desempacota os valores retornados em `a`, `b`, `c2`, `d` (usando `c2` para evitar conflito com o nome da função).

Imprime os resultados:

- Total: a
- Média: b
- Maior: c2
- Menor: d

## Observações

O código poderia ser otimizado, por exemplo, calculando max e min no mesmo loop da soma para eficiência. Também, nomes de variáveis mais descritivos melhorariam a legibilidade.