import Button from "../UI/Button";
import InputText from "../UI/InputText";

export default function NewPasswordStep({ onSubmit, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data.newPassword, data.confirmPassword);
  };

  return (
    <div className="card p-4 shadow-sm">
      <h3 className="text-center mb-4">Nouveau Mot de Passe</h3>
      <form onSubmit={handleSubmit}>
        <InputText
          containerClasses="mb-3"
          id="newPassword"
          name="newPassword"
          label="Nouveau mot de passe"
          type="password"
          placeholder="Entrez votre nouveau mot de passe"
          required={true}
        />
        <InputText
          containerClasses="mb-3"
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmer le mot de passe"
          type="password"
          placeholder="Confirmez votre nouveau mot de passe"
          required={true}
        />
        <Button content="Réinitialiser" isLoading={isLoading} />
      </form>
    </div>
  );
}
