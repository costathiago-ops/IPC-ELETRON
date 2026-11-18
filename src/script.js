const campoCidade = document.getElementById('campo-cidade');
const botaoConsultar = document.getElementById('botao-consultar');
const mensagem = document.getElementById('mensagem');
const resultadoCidade = document.getElementById('resultado-cidade');
const resultadoTemperatura = document.getElementById('resultado-temperatura');
const resultadoCondicao = document.getElementById('resultado-condicao');

botaoConsultar.addEventListener('click', consultar);
document.getElementById('botao-sobre').addEventListener('click', mostrarSobre);

function mostrarSobre() {
  // O renderer pede ao processo principal para abrir o dialogo nativo.
  window.api.mostrarSobre();
}

async function consultar() {
  botaoConsultar.disabled = true;
  mensagem.textContent = 'Buscando...';
  mensagem.className = 'mensagem carregando';

  try {
    // await mantem a interface aguardando a resposta assincrona do IPC.
    const resposta = await window.api.buscarClima(campoCidade.value);

    if (!resposta.sucesso) {
      // Converte a mensagem recebida em erro para que o catch abaixo continue
      // sendo o unico lugar responsavel por exibir falhas na tela.
      throw new Error(resposta.mensagem);
    }

    const clima = resposta.clima;
    mensagem.textContent = '';
    mensagem.className = 'mensagem';
    resultadoCidade.textContent = clima.cidade;
    resultadoTemperatura.textContent = `${clima.temperatura} ºC`;
    resultadoCondicao.textContent = clima.condicao;
  } catch (error) {
    mensagem.textContent = error.message;
    mensagem.className = 'mensagem erro';
    resultadoCidade.textContent = '-';
    resultadoTemperatura.textContent = '-';
    resultadoCondicao.textContent = '-';
  } finally {
    botaoConsultar.disabled = false;
  }
}
