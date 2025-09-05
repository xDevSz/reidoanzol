import { useState } from "react";
import styles from "./Formulario.module.css";
import Modal from '../../components/Modal';

// Utilitário para formatar CPF - Versão Corrigida
const formatCPF = (value) => {
  if (!value) return "";
  const cleaned = value.replace(/\D/g, "");
  return cleaned
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

// Utilitário para formatar CEP
const formatCEP = (value) => {
    if (!value) return "";
    const cleaned = value.replace(/\D/g, "").slice(0, 8);
    return cleaned
        .replace(/(\d{5})(\d)/, "$1-$2");
}

function FormularioPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    cpf: "",
    birthdate: "",
    address: "",
    city: "",
    uf: "",
    cep: "",
    membros: [{ nome: "", birthdate: "", cpf: "" }],
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCPFChange = (e) => {
    const formatted = formatCPF(e.target.value);
    setFormData((prev) => ({ ...prev, cpf: formatted }));
  };

  const handleCEPChange = (e) => {
    const formatted = formatCEP(e.target.value);
    setFormData((prev) => ({ ...prev, cep: formatted }));
  };

  const handleUFChange = (e) => {
    const value = e.target.value.toUpperCase().slice(0, 2);
    setFormData((prev) => ({ ...prev, uf: value }));
  };

  const handleMembroChange = (index, field, value) => {
    const newMembros = [...formData.membros];
    newMembros[index][field] = field === "cpf" ? formatCPF(value) : value;
    setFormData((prev) => ({ ...prev, membros: newMembros }));
  };

  const addMembro = () => {
    if (formData.membros.length < 3) {
      setFormData((prev) => ({
        ...prev,
        membros: [...prev.membros, { nome: "", birthdate: "", cpf: "" }],
      }));
    }
  };

  const removeMembro = (index) => {
    const newMembros = formData.membros.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, membros: newMembros }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    if (!formData.consent) {
      setErrorMsg("Você precisa autorizar o uso dos seus dados.");
      setLoading(false);
      return;
    }

    setSuccessMsg("✅ Envio de dados desativado para testes.");
    setIsModalOpen(true);
    setLoading(false);
  };

  return (
    <>
    <main className={styles.formContainer} style={{textAlign: 'center', padding: '50px', fontSize: '24px'}}>
      As Inscrições Estarão Disponíveis em Breve!
      </main>
    </>
    // Para comentar o JSX, você deve usar o formato de comentário do JavaScript
    // { /* ... todo o seu código JSX */ }
    // Este código não será renderizado
    /*
    <main className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
          <h1>Criar Conta / Equipe</h1>
          {errorMsg && <p className={styles.error}>{errorMsg}</p>}
        </div>

        <fieldset className={styles.fieldset} disabled={loading}>
          <legend>Informações de Acesso</legend>
          <div className={styles.inputGroup}>
            <div className={styles.inputWithIcon}>
              <span className={styles.icon}>✉️</span>
              <input
                type="email"
                name="email"
                placeholder="Seu melhor email"
                value={formData.email}
                onChange={handleInputChange}
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
                placeholder="Crie uma senha forte"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </fieldset>

        <fieldset className={styles.fieldset} disabled={loading}>
          <legend>Dados Pessoais</legend>
          <div className={styles.inputGroup}>
            <div className={styles.inputWithIcon}>
              <span className={styles.icon}>👤</span>
              <input
                type="text"
                name="fullName"
                placeholder="Nome completo"
                value={formData.fullName}
                onChange={handleInputChange}
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
        </fieldset>

        <fieldset className={styles.fieldset} disabled={loading}>
          <legend>Endereço</legend>
          <div className={styles.inputGroup}>
            <div className={styles.inputWithIcon}>
              <span className={styles.icon}>📍</span>
              <input
                type="text"
                name="address"
                placeholder="Endereço (Rua, Nº, Bairro)"
                value={formData.address}
                onChange={handleInputChange}
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
                  placeholder="Cidade"
                  value={formData.city}
                  onChange={handleInputChange}
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
                  placeholder="UF"
                  value={formData.uf}
                  onChange={handleUFChange}
                  required
                  maxLength={2}
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
                placeholder="CEP"
                value={formData.cep}
                onChange={handleCEPChange}
                required
              />
            </div>
          </div>
        </fieldset>

        <fieldset className={styles.fieldset} disabled={loading}>
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
                    onChange={(e) => handleMembroChange(index, "nome", e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <div className={styles.inputWithIcon}>
                  <span className={styles.icon}>🗓️</span>
                  <input
                    type="date"
                    value={membro.birthdate}
                    onChange={(e) => handleMembroChange(index, "birthdate", e.target.value)}
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
                    onChange={(e) => handleMembroChange(index, "cpf", e.target.value)}
                  />
                </div>
              </div>
              {formData.membros.length > 1 && (
                <button
                  type="button"
                  className={styles.memberButton}
                  onClick={() => removeMembro(index)}
                >
                  ❌ Remover
                </button>
              )}
            </div>
          ))}
          {formData.membros.length < 3 && (
            <button type="button" className={styles.memberButton} onClick={addMembro}>
              ➕ Adicionar Membro
            </button>
          )}
        </fieldset>

        <div className={styles.checkboxContainer}>
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

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? "SALVANDO..." : "FINALIZAR CADASTRO"}
        </button>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Cadastro realizado!">
        <p>{successMsg}</p>
        <button
          onClick={() => setIsModalOpen(false)}
          style={{
            marginTop: "15px",
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            background: "green",
            color: "white",
            cursor: "pointer",
          }}
        >
          OK
        </button>
      </Modal>
    </main>
    */
  );
}

export default FormularioPage;