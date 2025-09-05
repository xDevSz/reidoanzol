// src/components/Formulario/index.jsx

import { useState } from 'react';
import styles from './Formulario.module.css';

function FormularioPage() {
  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    cpf: '',
    rg: '',
    birthdate: '',
    phone: '',
    address: '',
    city: '',
    uf: '',
    cep: '',
    membros: [
      { nome: '', birthdate: '', cpf: '' },
      { nome: '', birthdate: '', cpf: '' },
      { nome: '', birthdate: '', cpf: '' },
    ],
    consent: false, // <-- novo campo para a checkbox
  });

  // Função genérica para inputs comuns
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Máscara CPF
  const formatCPF = (value) => {
    if (!value) return '';
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  // Handle CPF principal
  const handleCPFChange = (event) => {
    const formatted = formatCPF(event.target.value);
    setFormData((prev) => ({ ...prev, cpf: formatted }));
  };

  // Handle CPF dos membros
  const handleMembroCPFChange = (index, value) => {
    const formatted = formatCPF(value);
    setFormData((prev) => {
      const newMembros = [...prev.membros];
      newMembros[index].cpf = formatted;
      return { ...prev, membros: newMembros };
    });
  };

  // Handle campos dos membros (nome e data)
  const handleMembroChange = (index, field, value) => {
    setFormData((prev) => {
      const newMembros = [...prev.membros];
      newMembros[index][field] = value;
      return { ...prev, membros: newMembros };
    });
  };

  // Envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.consent) {
      alert("Você precisa autorizar o uso dos seus dados para continuar.");
      return;
    }

    console.log("Dados do formulário:", formData);
    alert("Formulário enviado!");
  };

  return (
    <main className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
          <h1>Criar Conta</h1>
        </div>

        {/* --- Seção de Informações de Acesso --- */}
        <fieldset className={styles.fieldset}>
          <legend>Informações de Acesso</legend>
          <div className={styles.inputGroup}>
            <div className={styles.inputWithIcon}>
              <span className={styles.icon}>✉️</span>
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Seu melhor email" 
                required 
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputWithIcon}>
              <span className={styles.icon}>🔒</span>
              <input 
                type="password" 
                name="password" 
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Crie uma senha forte" 
                required 
              />
            </div>
          </div>
        </fieldset>

        {/* --- Seção de Dados Pessoais --- */}
        <fieldset className={styles.fieldset}>
          <legend>Dados Pessoais</legend>
          <div className={styles.inputGroup}>
            <div className={styles.inputWithIcon}>
              <span className={styles.icon}>👤</span>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Nome completo" 
                required 
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputWithIcon}>
              <span className={styles.icon}>📁</span>
              <input
                type="text"
                name="cpf"
                placeholder="CPF"
                value={formData.cpf}
                onChange={handleCPFChange}
                required
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputWithIcon}>
              <span className={styles.icon}>📁</span>
              <input
                type="text"
                name="rg"
                value={formData.rg}
                onChange={handleInputChange}
                placeholder="RG"
                required
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputWithIcon}>
              <span className={styles.icon}>🗓️</span>
              <input 
                type="date" 
                name="birthdate" 
                value={formData.birthdate} 
                onChange={handleInputChange} 
                required 
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputWithIcon}>
              <span className={styles.icon}>📞</span>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Telefone" 
                required 
              />
            </div>
          </div>
        </fieldset>

        {/* --- Seção de Endereço --- */}
        <fieldset className={styles.fieldset}>
          <legend>Endereço</legend>
          <div className={styles.inputGroup}>
            <div className={styles.inputWithIcon}>
              <span className={styles.icon}>📍</span>
              <input 
                type="text" 
                name="address" 
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Endereço (Rua, Nº, Bairro)" 
                required 
              />
            </div>
          </div>
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <div className={styles.inputWithIcon}>
                <span className={styles.icon}>🏙️</span>
                <input 
                  type="text" 
                  name="city" 
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Cidade" 
                  required 
                />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.inputWithIcon}>
                <span className={styles.icon}>🗺️</span>
                <input 
                  type="text" 
                  name="uf" 
                  value={formData.uf}
                  onChange={handleInputChange}
                  placeholder="UF" 
                  required 
                />
              </div>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputWithIcon}>
              <span className={styles.icon}>🌐</span>
              <input 
                type="text" 
                name="cep" 
                value={formData.cep}
                onChange={handleInputChange}
                placeholder="CEP" 
                required 
              />
            </div>
          </div>
        </fieldset>

        {/* --- Seção de Novos Membros --- */}
        <fieldset className={styles.fieldset}>
          <legend>Novos Membros da Equipe</legend>
          {formData.membros.map((membro, index) => (
            <div key={index} className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <div className={styles.inputWithIcon}>
                  <span className={styles.icon}>👤</span>
                  <input
                    type="text"
                    placeholder={`Nome do Membro ${index + 1}`}
                    value={membro.nome}
                    onChange={(e) => handleMembroChange(index, 'nome', e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <div className={styles.inputWithIcon}>
                  <span className={styles.icon}>🗓️</span>
                  <input
                    type="date"
                    value={membro.birthdate}
                    onChange={(e) => handleMembroChange(index, 'birthdate', e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <div className={styles.inputWithIcon}>
                  <span className={styles.icon}>📁</span>
                  <input
                    type="text"
                    placeholder="CPF"
                    value={membro.cpf}
                    onChange={(e) => handleMembroCPFChange(index, e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </fieldset>

        {/* --- Checkbox de consentimento --- */}
        <div className={styles.inputGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleInputChange}
              required
            />
            Eu autorizo o uso dos meus dados conforme a política de privacidade.
          </label>
        </div>

        <button type="submit" className={styles.submitButton}>
          FINALIZAR CADASTRO
        </button>
      </form>
    </main>
  );
}

export default FormularioPage;
