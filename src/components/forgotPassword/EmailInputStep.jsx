import InputText from '../UI/InputText';
import Button from '../UI/Button';

export default function EmailInputStep({ onSubmit, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data.email);
  };

  return (
    <div className="card p-4 shadow-sm">
      <h3 className="text-center mb-4">Mot de passe oublié</h3>
      <form onSubmit={handleSubmit}>
        <InputText
          containerClasses="mb-3"
          id="email"
          name="email"
          label="Email"
          placeholder="Votre email"
          required={true}
        />
        <Button content="Envoyer" isLoading={isLoading} />
      </form>
    </div>
  );
}
