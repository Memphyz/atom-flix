export const PT_LANG = {
     FAVORITES: 'Favoritos',
     LOADING_NEW_ITEMS: 'Carregando novos itens',
     PORTUGUESE: 'Português',
     ENGLISH: 'Inglês',
     ADD_TO_FAVORITES: 'Adicionar aos Favoritos',
     SIGN_IN: 'Entrar',
     SIGN_UP: 'Cadastrar',
     LOGOUT: 'Sair',
     GUEST: 'Convidado',
     USERNAME: 'Usuário',
     PASSWORD: 'Senha',
     USERNAME_OR_PASSWORD_INVALID: 'Usuário ou Senha incorretos!',
     FILL_ALL_FIELDS: 'Preencha corretamente todos os campos em vermelho para continuar',
     WELCOME_BACK: 'Bem vindo de volta',
     ALREADY_LOGGED: 'Você já está logado 🫡',
     ACCOUNT: 'Conta',
     ACCESS_DENIED: '❌ Você não tem permissão para acessar esse recurso',
     UNLOGGED_MESSAGE: 'Você precisa estar logado para acessar esse recurso',
     ALSO_KNOWN_AS: 'Também conhecido como',
     ORIGINAL_TITLE: 'Título original',
     ERRORS: (error) => {
          return {
               minLength: `O campo não possui a quantidade mínima de ${error?.minLength?.requiredLength} caracteres`,
               required: 'Campo obrigatório'
          }
     }
}