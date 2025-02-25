import { useState } from 'react';
import Button from '../UI/Button';

export default function MethodSelectionStep({ userData, onSelectMethod, isLoading }) {
  const [selectedMethod, setSelectedMethod] = useState(userData.email ? "email" : "sms");

  const handleSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSelectMethod(selectedMethod);
  };

  return (
    <div className="card p-4 shadow-sm">
      <h3 className="text-center mb-4">Réinitialisation du mot de passe</h3>
      <p className="mb-3">Nous avons trouvé un compte associé à :</p>
      <p>Email: {userData.email}</p>
      <p>Téléphone: {userData.phoneNumber}</p>
      <p>Choisissez comment recevoir votre code OTP :</p>
      <div className="d-flex justify-content-around mb-3">
        <Button content="Email" classList={selectedMethod === "email" ? "btn-success" : "btn-secondary"} onClick={() => handleSelect("email")} />
        <Button content="SMS" classList={selectedMethod === "sms" ? "btn-success" : "btn-secondary"} onClick={() => handleSelect("sms")} />
      </div>
      <div className="mb-3">
        <p>Votre code sera envoyé à : {selectedMethod === "email" ? userData.email : userData.phoneNumber}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <Button content="Confirmer" isLoading={isLoading} />
      </form>
    </div>
  );
}
