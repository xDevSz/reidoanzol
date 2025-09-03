import styles from './Formulario.module.css';

function FormularioPage() {
  // Uma função para lidar com o envio do formulário no futuro
  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o recarregamento da página
    alert('Formulário enviado! (A lógica de envio ainda não foi implementada)');
    // Aqui você adicionaria a lógica para enviar os dados para um servidor
  };

  return (
    <main className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
          <h1>Ficha de Inscrição para Pesca</h1>
          <p>Preencha os dados do líder da equipe para iniciar o cadastro.</p>
        </div>

        <fieldset className={styles.fieldset}>
          <legend>Dados Pessoais</legend>
          
          <div className={styles.inputGroup}>
            <label htmlFor="fullName">Nome Completo</label>
            <input type="text" id="fullName" name="fullName" placeholder="Digite seu nome completo" required />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="cpf">CPF</label>
            <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" required />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="phone">Telefone / WhatsApp</label>
            <input type="tel" id="phone" name="phone" placeholder="(69) 99999-9999" required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="seu.email@exemplo.com" required />
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Endereço</legend>
          
          <div className={styles.inputGroup}>
            <label htmlFor="cep">CEP</label>
            <input type="text" id="cep" name="cep" placeholder="00000-000" required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="address">Logradouro (Rua, Av.)</label>
            <input type="text" id="address" name="address" placeholder="Ex: Av. Sete de Setembro" required />
          </div>
          
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="number">Número</label>
              <input type="text" id="number" name="number" required />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="complement">Complemento</label>
              <input type="text" id="complement" name="complement" placeholder="Apto, Bloco, etc." />
            </div>
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="city">Cidade</label>
            <input type="text" id="city" name="city" placeholder="Ex: Porto Velho" required />
          </div>
        </fieldset>
        
        <button type="submit" className={styles.submitButton}>
          Cadastrar e Montar Equipe
        </button>
      </form>
    </main>
  );
}

export default FormularioPage;