import time

def pegar_maior_valor(l):
    maior = 0
    for item in l:
        if item > maior:
            maior = item
    return maior

def linha_eh_valida(posicoes, linha):
    for pos in posicoes:
        if pos[0] == linha:
            return False
    return True

def diagonal_eh_valida(posicoes, linha, coluna):
    for pos in posicoes:
        if pos[0] - pos[1] == linha - coluna or pos[0] + pos[1] == linha + coluna:
            return False
    return True

def adicionar_rainhas(posicoes, N):
    primeira_coluna_a_tentar = pegar_maior_valor([ pos[1] for pos in posicoes ]) + 1 if len(posicoes) > 0 else 0
    for coluna_a_tentar in range(primeira_coluna_a_tentar, N):
        for linha_a_tentar in range(N):
            if linha_eh_valida(posicoes, linha_a_tentar) and diagonal_eh_valida(posicoes, linha_a_tentar, coluna_a_tentar):
                posicoes.append((linha_a_tentar, coluna_a_tentar))
                break


def reposicionar_rainha(posicoes, N, antiga_posicao):
    antiga_linha = antiga_posicao[0]
    antiga_coluna = antiga_posicao[1]
    coluna_a_tentar = antiga_coluna
    for linha_a_tentar in range(antiga_linha, N):
        if linha_a_tentar > antiga_linha and linha_eh_valida(posicoes, linha_a_tentar) and diagonal_eh_valida(posicoes, linha_a_tentar, coluna_a_tentar):
            posicoes.append((linha_a_tentar, coluna_a_tentar))
            return True
    return False

def exibir_tabuleiro(posicoes, N):
    espacos_por_linhas = ((N * 2) + 1)
    for linha in range(N):
        print('-' * espacos_por_linhas)
        for coluna in range(N):
            havia_rainha = False
            for pos in posicoes:
                if pos[0] == linha and pos[1] == coluna:
                    havia_rainha = True
                    print('|r', end = '')
                    break
            if not havia_rainha:
                print('| ', end = '')
        print('|\n', end = '')
    print('-' * espacos_por_linhas, end='\n\n')

def girar_posicoes_90_graus_a_direita(posicoes, N):
    novas_posicoes = []
    for pos in posicoes:
        nova_posicao = (pos[1], N - pos[0] - 1)
        novas_posicoes.append(nova_posicao)
    return novas_posicoes

def validar_que_posicoes_sao_iguais(posicoes1, posicoes2):
    for pos1 in posicoes1:
        try:
            posicoes2.index(pos1)
        except:
            return False
    return True

def validar_que_posicoes_ja_existem(antigas_posicoes, nova_posicao):
    for antiga_posicao in antigas_posicoes:
        if validar_que_posicoes_sao_iguais(antiga_posicao, nova_posicao):
            return True
    return False

def achar_quantidade_de_combinacoes(N):
    inicio = time.time()

    posicoes_rainhas = []
    antigas_posicoes_rainhas = []

    while True:
        adicionar_rainhas(posicoes_rainhas, N)

        if len(posicoes_rainhas) == N:
            if not validar_que_posicoes_ja_existem(antigas_posicoes_rainhas, posicoes_rainhas):
                antigas_posicoes_rainhas.append(posicoes_rainhas.copy())
            
            posicoes_rotacionadas_rainhas = girar_posicoes_90_graus_a_direita(posicoes_rainhas, N)
            if not validar_que_posicoes_ja_existem(antigas_posicoes_rainhas, posicoes_rotacionadas_rainhas):
                antigas_posicoes_rainhas.append(posicoes_rotacionadas_rainhas.copy())
            
            posicoes_rotacionadas_rainhas = girar_posicoes_90_graus_a_direita(posicoes_rotacionadas_rainhas, N)
            if not validar_que_posicoes_ja_existem(antigas_posicoes_rainhas, posicoes_rotacionadas_rainhas):
                antigas_posicoes_rainhas.append(posicoes_rotacionadas_rainhas.copy())

            posicoes_rotacionadas_rainhas = girar_posicoes_90_graus_a_direita(posicoes_rotacionadas_rainhas, N)
            if not validar_que_posicoes_ja_existem(antigas_posicoes_rainhas, posicoes_rotacionadas_rainhas):
                antigas_posicoes_rainhas.append(posicoes_rotacionadas_rainhas.copy())

        foi_possivel_reposicionar_rainha = False
        while not foi_possivel_reposicionar_rainha and len(posicoes_rainhas) > 0:
            ultima_posicao = posicoes_rainhas.pop()
            foi_possivel_reposicionar_rainha = reposicionar_rainha(posicoes_rainhas, N, ultima_posicao)

        if not foi_possivel_reposicionar_rainha and len(posicoes_rainhas) == 0:
            break

    duracao = time.time() - inicio

    return (duracao, len(antigas_posicoes_rainhas))
