const { contextBridge, ipcRenderer } = require('electron');

// Expoe apenas as operacoes necessarias a interface, sem liberar acesso geral
// ao Electron ou ao Node.js dentro da pagina.
contextBridge.exposeInMainWorld('api', {
  // Este pedido nao precisa de resposta, entao usa send em vez de invoke.
  mostrarSobre: () => ipcRenderer.send('mostrar-sobre'),

  // invoke espera a resposta correspondente ao handler do processo principal.
  buscarClima: (cidade) => ipcRenderer.invoke('buscar-clima', cidade),
});
