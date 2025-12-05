
import { RegisterEmail } from '../RegisterEmail/RegisterEmail';
import { VerificationEmail } from '../VerificationEmail/VerificationEmail';
import { useState } from 'react';
import { TConditionResponses } from '../../types/types';
import { POST_VERIFICATY_EMAIL } from '../../../../configs/configs';
import { utilServer } from '../../../../utils/js/utilServer';

export function ContainerRegister() {
  const [verificationEmail, setVerificationEmail] = useState<boolean>(true);
  const [conditions, setConditions] = useState<TConditionResponses>();

  const [valueEmail, setValueEmail] = useState<string>("");

  async function handleSubmit(email: string) {
    const data = await utilServer(POST_VERIFICATY_EMAIL, 'post', { email });
    setValueEmail(email);
    if (data && typeof data === 'object' && 'message' in data) {
      setConditions(data.message as TConditionResponses);
    }
    setVerificationEmail(!verificationEmail);
  }

  function handleChangeVarificationEmail() {
    setVerificationEmail(!verificationEmail);
  }

  if (verificationEmail) {
    return (
      <RegisterEmail handleSubmit={handleSubmit} />
    )
  } else {
    return (
      <VerificationEmail valueEmail={valueEmail} handleChangeVarificationEmail={handleChangeVarificationEmail} />
    );
  };
}