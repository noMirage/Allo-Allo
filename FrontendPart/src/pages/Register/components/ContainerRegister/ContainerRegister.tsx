
import { RegisterEmail } from '../RegisterEmail/RegisterEmail';
import { VerificationEmail } from '../VerificationEmail/VerificationEmail';
import { useState } from 'react';
import { POST_VERIFICATY_EMAIL } from '../../../../configs/configs';
import { utilServer } from '../../../../utils/js/utilServer';

export function ContainerRegister() {
  const [verificationEmail, setVerificationEmail] = useState<boolean>(true);
  const [conditions, setConditions] = useState<string>();

  const [valueEmail, setValueEmail] = useState<string>("");

  async function handleSubmit(email: string, isSwitch: boolean = true) {
    setValueEmail(email);
    setVerificationEmail(false);
    let data = await utilServer<string>(POST_VERIFICATY_EMAIL, 'post', { email });
    setValueEmail(email);
    if (!data.success) {
      setConditions(data.error);
    }
    if (isSwitch) {
      setVerificationEmail(!verificationEmail);
    }
  }

  function handleChangeVarificationEmail() {
    setVerificationEmail(!verificationEmail);
  }

  if (verificationEmail) {
    return (
      <RegisterEmail setVerificationEmail={setVerificationEmail} handleSubmit={handleSubmit} />
    )
  } else {
    return (
      <VerificationEmail handleSubmit={handleSubmit} valueEmail={valueEmail} handleChangeVarificationEmail={handleChangeVarificationEmail} />
    );
  };
}