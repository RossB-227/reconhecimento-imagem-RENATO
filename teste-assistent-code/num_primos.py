"""Verificação de número primo com estrutura limpa."""

from math import isqrt


def eh_primo(n: int) -> bool:
    """Retorna True se n for primo."""
    if not isinstance(n, int) or n < 2:
        return False

    if n in (2, 3):
        return True

    if n % 2 == 0:
        return False

    return not possui_divisor_impar(n)


def possui_divisor_impar(numero: int) -> bool:
    """Retorna True se houver divisor ímpar de numero."""
    limite = isqrt(numero)
    for divisor in range(3, limite + 1, 2):
        if numero % divisor == 0:
            return True
    return False


def main() -> None:
    exemplos = [1, 2, 3, 4, 5, 16, 17, 18, 19, 20, 23, 25]
    for valor in exemplos:
        print(f"{valor} -> {eh_primo(valor)}")


if __name__ == '__main__':
    main()
