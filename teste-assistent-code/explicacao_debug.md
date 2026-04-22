# Análise de Erros - debug.py

## Erros Encontrados e Correções

### 1. **Erro de Sintaxe - Linha 5** ❌
**Problema:** Faltam aspas no argumento da função `input()`
```python
# ERRADO:
item1 = float(input(Preço do item 1? ))

# CORRETO:
item1 = float(input("Preço do item 1? "))
```
**Motivo:** Strings em Python devem estar entre aspas simples ou duplas.

---

### 2. **Erro de Tipo - Linha 23** ❌
**Problema:** A função `input()` retorna uma string, não um número. Não pode ser usado diretamente em operações matemáticas.
```python
# ERRADO:
desconto_cupom = (input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))
desconto = subtotal * (desconto_cupom / 100)  # Erro: não pode dividir string por número

# CORRETO:
desconto_cupom = int(input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))
desconto = subtotal * (desconto_cupom / 100)
```
**Motivo:** Precisa converter o valor de entrada para inteiro ou float.

---

### 3. **Erro de Formatação - Linha 37** ❌
**Problema:** Falta o prefixo `f` na string para ativar a formatação com chaves `{}`
```python
# ERRADO:
print(" Item 2:        R$ {total_item2:.2f}")  # Imprime literalmente: R$ {total_item2:.2f}

# CORRETO:
print(f" Item 2:        R$ {total_item2:.2f}")  # Imprime: R$ 100.00 (exemplo)
```
**Motivo:** Strings f-string permitem interpolação de variáveis com `{variável}`.

---

### 4. **Erro de Indentação - Linha 42** ❌
**Problema:** Falta espaço na indentação do `print()` dentro do `if`
```python
# ERRADO:
if desconto_cupom > 0: 
print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")

# CORRETO:
if desconto_cupom > 0: 
    print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")
```
**Motivo:** Python usa indentação para definir blocos de código. Código dentro de `if` deve estar indentado.

---

### 5. **Erro de Lógica - Linha 41** ❌
**Problema:** Comparação de string com número. Mesmo convertendo na linha 23, a comparação não funcionaria corretamente se `desconto_cupom` fosse string.
```python
# ERRADO:
if desconto_cupom > 0:  # Erro se desconto_cupom for "0" (string)

# CORRETO:
if desconto_cupom > 0:  # Funciona corretamente se desconto_cupom for int
```
**Motivo:** Tipos de dados devem ser compatíveis com a operação.

---

## Resumo
- **1 erro de sintaxe** (aspas faltantes)
- **1 erro de tipo** (string vs número)
- **1 erro de formatação** (falta de f-string)
- **1 erro de indentação** (bloco if não indentado)
- **1 erro de lógica** (comparação de tipos incompatíveis)
