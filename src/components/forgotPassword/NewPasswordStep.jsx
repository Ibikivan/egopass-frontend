import { useState } from "react";
import Button from "../UI/Button";
import InputText from "../UI/InputText";
import eyeIcon from '../../assets/eye.svg';
import eyeSlashedIcon from '../../assets/eye-slash.svg';

export default function NewPasswordStep({ onSubmit, isLoading }) {
  const [isPwdVisible, setIsPwdVisible] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data.newPassword, data.confirmPassword);
  };

  const togglePwdVisible = () => {
    setIsPwdVisible(!isPwdVisible)
  }

  return (
    <div className="card p-4 shadow-sm">
      <h3 className="text-center mb-4">Nouveau Mot de Passe</h3>
      <form onSubmit={handleSubmit}>
        <div className='position-relative'>
          <InputText
            containerClasses="mb-3"
            id="newPassword"
            name="newPassword"
            label="Nouveau mot de passe"
            type={isPwdVisible ? 'text' : 'password'}
            placeholder="Entrez votre nouveau mot de passe"
            required={true}
          />
          {isPwdVisible
            ? <img src={eyeSlashedIcon} onClick={togglePwdVisible} alt='eye slashed icon' className='pwd_eye_icon' />
            : <img src={eyeIcon} onClick={togglePwdVisible} alt='eye icon' className='pwd_eye_icon' />
          }
        </div>

        <div className='position-relative'>
          <InputText
            containerClasses="mb-3"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirmer le mot de passe"
            type={isPwdVisible ? 'text' : 'password'}
            placeholder="Confirmez votre nouveau mot de passe"
            required={true}
          />
          {isPwdVisible
            ? <img src={eyeSlashedIcon} onClick={togglePwdVisible} alt='eye slashed icon' className='pwd_eye_icon' />
            : <img src={eyeIcon} onClick={togglePwdVisible} alt='eye icon' className='pwd_eye_icon' />
          }
        </div>
        <Button content="Réinitialiser" isLoading={isLoading} />
      </form>
    </div>
  );
}
