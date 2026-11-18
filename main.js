const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('node:path');
const buscarClima = require('./clima');

function criarJanela() {
  const janela = new BrowserWindow({
    width: 700,
    height: 550,
    webPreferences: {
      // O preload e a ponte controlada entre a pagina e o processo principal.
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  janela.loadFile(path.join(__dirname, 'src', 'index.html'));
}

// O renderer nao abre dialogos do sistema diretamente. Ele envia um pedido
// pelo preload, e o processo principal mostra o dialogo ligado a janela certa.
ipcMain.on('mostrar-sobre', (evento) => {
  const janela = BrowserWindow.fromWebContents(evento.sender);

  if (!janela) return;

  dialog.showMessageBox(janela, {
    type: 'info',
    title: 'Sobre',
    message: 'Consulta de Clima',
    detail: 'Versão 1.0\nProgramação Desktop — IFMA Campus Grajaú',
  });
});

// invoke/handle faz uma solicitacao e devolve uma resposta a tela.
// O erro e convertido em dado para que o Electron nao o transforme em uma
// excecao remota com o prefixo "Error invoking remote method...".
ipcMain.handle('buscar-clima', async (_evento, cidade) => {
  try {
    const clima = await buscarClima(cidade);
    return { sucesso: true, clima };
  } catch (erro) {
    return { sucesso: false, mensagem: erro.message };
  }
});

app.whenReady().then(criarJanela);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
