L = int(input("Digite a linha (0 ≤ L ≤ 11): "))

T = input("Digite a operação ('S' para soma, 'M' para média): ").strip().upper()

M = []

for i in range(12):
    linha = []
    for j in range(12):
        valor = float(input(f"Digite o valor para M[{i}][{j}]: "))
        linha.append(valor)
    M.append(linha)

soma = sum(M[L])

if T == 'S':
    resultado = soma
elif T == 'M':
    resultado = soma / 12

print(f"{resultado:.1f}")
