// Esta lógica roda no processo principal, fora da página da interface.
const climaDasCidades = {
  'grajaú': { cidade: 'Grajaú', temperatura: 34, condicao: 'Ensolarado' },
  'são luís': { cidade: 'São Luís', temperatura: 30, condicao: 'Parcialmente nublado' },
  imperatriz: { cidade: 'Imperatriz', temperatura: 35, condicao: 'Ensolarado' },
  teresina: { cidade: 'Teresina', temperatura: 37, condicao: 'Muito quente' },
  fortaleza: { cidade: 'Fortaleza', temperatura: 29, condicao: 'Ventando' },
};

// Simula uma consulta que demora 1,5 segundo. A função rejeita a Promise
// quando a cidade está vazia ou não existe; o handler IPC transforma essa
// rejeição em uma resposta que a tela pode tratar com seu próprio catch.
function buscarClima(cidade) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const chave = cidade.trim().toLowerCase();

      if (chave === '') {
        reject(new Error('Digite o nome de uma cidade.'));
        return;
      }

      const clima = climaDasCidades[chave];
      if (!clima) {
        reject(new Error(`Cidade "${cidade}" não encontrada.`));
        return;
      }

      // Retorna uma cópia para que quem recebe o resultado não altere o objeto
      // que serve de base para as próximas consultas.
      resolve({ ...clima });
    }, 1500);
  });
}

module.exports = buscarClima;
