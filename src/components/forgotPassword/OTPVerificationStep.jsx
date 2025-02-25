import Button from "../UI/Button";
import InputText from "../UI/InputText";


export default function OTPVerificationStep({ onSubmit, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data.otp);
  };

  return (
    <div className="card p-4 shadow-sm">
      <h3 className="text-center mb-4">Vérifier le code OTP</h3>
      <form onSubmit={handleSubmit}>
        <InputText
          containerClasses="mb-3"
          id="otp"
          name="otp"
          label="Code OTP"
          placeholder="Entrez le code reçu"
          required={true}
        />
        <Button content="Vérifier" isLoading={isLoading} />
      </form>
    </div>
  );
}
