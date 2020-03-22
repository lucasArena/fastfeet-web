import React from 'react';
import Proptypes from 'prop-types';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import { Wrapper, Content, FormHeader, MainForm, FormButton } from './styles';

import history from '../../services/history';

export default function FormContainer({
  children,
  title,
  handleSubmit,
  schema,
  initialData,
}) {
  function handleBack() {
    history.goBack();
  }

  return (
    <Wrapper>
      <Content>
        <MainForm
          schema={schema}
          onSubmit={handleSubmit}
          initialData={initialData}
        >
          <FormHeader>
            <h1>{title}</h1>
            <div>
              <FormButton color="#CCCCCC" type="button" onClick={handleBack}>
                <MdKeyboardArrowLeft color="#fff" size={24} />
                <span>Voltar</span>
              </FormButton>
              <FormButton color="#9159c1" type="submit">
                <MdCheck color="#fff" size={24} />
                <span>Salvar</span>
              </FormButton>
            </div>
          </FormHeader>
          <main>{children}</main>
        </MainForm>
      </Content>
    </Wrapper>
  );
}

FormContainer.propTypes = {
  children: Proptypes.oneOfType([Proptypes.element, Proptypes.func]).isRequired,
  title: Proptypes.string.isRequired,
  handleSubmit: Proptypes.func.isRequired,
  schema: Proptypes.object,
  initialData: Proptypes.object,
};

FormContainer.defaultProps = {
  schema: {},
  initialData: {},
};
