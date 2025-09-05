import { useState } from "react";
import styles from "./Formulario.module.css";

// Utilitário para formatar CPF
const formatCPF = (value) => {
  if (!value) return "";
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

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
    const value = e.target.value.replace(/\D/g, "").slice(0, 8);
    setFormData((prev) => ({ ...prev, cep: value }));
  };

  const handleUFChange = (e) => {
    const value = e.target.value.toUpperCase().slice(0, 2);
    setFormData((prev) => ({ ...prev, uf: value }));
  };

  const handleMembroChange = (index, field, value) => {
    const newMembros = [...formData.membros];
    newMembros[index][field] =
      field === "cpf" ? formatCPF(value) : value;
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

    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMsg(`✅ Cadastro realizado! Código da equipe: ${data.invite_code}`);
        setFormData({
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
        });
      } else {
        setErrorMsg(data.error || "Ocorreu um erro desconhecido.");
      }
    } catch (err) {
      setErrorMsg("❌ Falha na conexão: Verifique se o servidor está online.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
          <h1>Criar Conta / Equipe</h1>
          {/* ✅ Exibição de mensagens de feedback */}
          {errorMsg && <p className={styles.error}>{errorMsg}</p>}
          {successMsg && <p className={styles.success}>{successMsg}</p>}
        </div>

        {/* --- Informações de Acesso --- */}
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

        {/* --- Dados Pessoais --- */}
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

        {/* --- Endereço --- */}
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
                  onChange={handleInputChange}
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
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </fieldset>

        {/* --- Membros da Equipe --- */}
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
                    onChange={(e) => handleMembroCPFChange(index, e.target.value)}
                  />
                </div>
              </div>
              {formData.membros.length > 1 && (
                <button
                  type="button"
                  className={styles.memberButton}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      membros: prev.membros.filter((_, i) => i !== index),
                    }));
                  }}
                >
                  ❌ Remover
                </button>
              )}
            </div>
          ))}
          {formData.membros.length < 3 && (
            <button
              type="button"
              className={styles.memberButton}
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  membros: [...prev.membros, { nome: "", birthdate: "", cpf: "" }],
                }))
              }
            >
              ➕ Adicionar Membro
            </button>
          )}
        </fieldset>

        {/* --- Consentimento --- */}
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
    </main>
  );
}

export default FormularioPage;