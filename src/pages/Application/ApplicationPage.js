import React, {useState} from 'react';
import styled from 'styled-components';
import {Button, Form, Input, Checkbox, TextArea} from 'formik-semantic-ui';
import DropdownCustom from '../../components/formik-semantic-ui-custom/DropdownCustom';
import {Button as SUIButton} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {Grid, Header, Label, Container, Transition} from 'semantic-ui-react';
import FileUploadInput from '../../components/FileUpload';

import regSign from '../../resources/images/regSign.svg';

// Sections
import {sections} from './Sections';

// Styled components
const RegSign = styled.img.attrs(props => ({
  src: regSign
}))`
  min-width: 300px;
  width: 60vw;
  z-index: 2;
  padding: 40px 0px;
`;

const SectionTitleContainer = styled.div`
  padding-top: 40px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: flex-end;
`;

const ApplicationPage = () => {
  const [currSection, setCurrSection] = useState(0);
  const [history, setHistory] = useState([
    ...sections.map(sec => sec.initialValues)
  ]);

  const _handleSubmit = (values, formikApi) => {
    // console.log(values, formikApi);
    let newHistory = history;
    const keys = Object.keys(newHistory[currSection]);
    for (let i = 0; i < keys.length; i++) {
      newHistory[currSection][keys[i]] = values[keys[i]];
    }
    setHistory(newHistory);
    console.log(newHistory);
    if (currSection < sections.length - 1) {
      setCurrSection(currSection + 1);
    } else {
      console.log(values);
    }
    formikApi.setSubmitting(false);
  };

  const _handleReset = (values, formikApi) => {
    setCurrSection(currSection - 1);
  };

  console.log(history[currSection]);

  // See https://www.npmjs.com/package/formik-semantic-ui
  // For documentation on some of these
  return (
    <div
      style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}
    >
      <RegSign />
      <Grid container stretched>
        <Grid.Row centered>
          <Grid.Column>
            <SectionTitleContainer>
              <Header size='huge'>{sections[currSection].title}</Header>
            </SectionTitleContainer>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column>
            <Form
              onSubmit={_handleSubmit}
              onReset={_handleReset}
              initialValues={history[currSection]}
              validationSchema={sections[currSection].schema}
              enableReinitialize
            >
              {formikProps => (
                <Transition.Group duration={200}>
                  <React.Fragment>
                    {sections[currSection].fields.map(field => {
                      const {
                        name,
                        label,
                        componentType,
                        componentProps,
                        ...extras
                      } = field;
                      if (componentType === 'TextField') {
                        return (
                          <Input
                            name={name}
                            label={label}
                            inputProps={componentProps}
                            fieldProps={{
                              required: componentProps.required
                            }}
                            key={name}
                            errorComponent={({message}) => (
                              <Label basic color='red' pointing>
                                {message}
                              </Label>
                            )}
                          />
                        );
                      }
                      if (componentType === 'Dropdown') {
                        return (
                          <DropdownCustom
                            name={name}
                            label={label}
                            options={extras.options}
                            inputProps={componentProps}
                            fieldProps={{
                              required: componentProps.required
                            }}
                            key={name}
                            errorComponent={({message}) => (
                              <Label basic color='red' pointing>
                                {message}
                              </Label>
                            )}
                          />
                        );
                      }
                      if (componentType === 'TextArea') {
                        return (
                          <TextArea
                            name={name}
                            label={label}
                            inputProps={componentProps}
                            fieldProps={{
                              required: componentProps.required
                            }}
                            key={name}
                            errorComponent={({message}) => (
                              <Label basic color='red' pointing>
                                {message}
                              </Label>
                            )}
                          />
                        );
                      }
                      if (componentType === 'Terms') {
                        return (
                          <React.Fragment key={name}>
                            <Header size='tiny'>{label}</Header>
                            <Checkbox
                              name={name}
                              label={{
                                children: (
                                  <Container text style={{minWidth: 0}}>
                                    {extras.content}
                                  </Container>
                                )
                              }}
                              inputProps={componentProps}
                              errorComponent={() => null}
                            />
                            {formikProps.errors[name] && (
                              <Label basic color='red' pointing>
                                {formikProps.errors[name]}
                              </Label>
                            )}
                          </React.Fragment>
                        );
                      }
                      if (componentType === 'FileUpload') {
                        return (
                          <FileUploadInput
                            key={name}
                            formikProps={formikProps}
                            name={name}
                            label={label}
                            fieldProps={{
                              required: componentProps.required
                            }}
                          />
                        );
                      }
                    })}
                    <ButtonGroup>
                      {currSection === 0 && (
                        <SUIButton as={Link} to='/' basic>
                          Cancel
                        </SUIButton>
                      )}
                      {currSection > 0 && <Button.Reset>Back</Button.Reset>}
                      <Button.Submit>
                        {currSection < sections.length - 1 ? 'Next' : 'Submit'}
                      </Button.Submit>
                    </ButtonGroup>
                  </React.Fragment>
                </Transition.Group>
              )}
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default ApplicationPage;
