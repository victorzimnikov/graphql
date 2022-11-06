import React from "react";
import { Formik } from "formik";
import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { array, object, string } from "yup";

import { InputField } from "./InputField";
import { RelationSelectField } from "./RelationSelectField";
import { PositionSelectField } from "./PositionSelectField";
import {
  ApplicantIndividualCompanyPosition,
  ApplicantIndividualCompanyRelation,
} from "../gql/graphql";

const StyledComponent = styled.form`
  flex: 1;
  width: 300px;
  display: flex;
  align-self: center;
  flex-direction: column;
  justify-content: center;
`;

const validationSchema = object({
  name: string().required("Required").min(5, "Min length 5").max(10, "Max length 10"),
  description: string().required("Required").min(5, "Min length 5").max(10, "Max length 10"),
  positions: array().min(1, "Select position"),
  relation: object()
    .nullable()
    .test({
      name: "relation",
      message: "Select relation",
      test: (value) => value != null && value.name,
    }),
});

interface FormProps {
  readonly name: string;
  readonly description: string;
  readonly positions: ApplicantIndividualCompanyPosition[];
  readonly relation: ApplicantIndividualCompanyRelation | null;
}

interface Props {
  readonly initialValues: FormProps;
  readonly onSubmit: (values: FormProps) => void;
}

export function SendForm({ onSubmit, initialValues }: Props) {
  return (
    <StyledComponent>
      <Formik
        onSubmit={onSubmit}
        validateOnBlur={true}
        validateOnMount={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <Stack spacing={2}>
            <PositionSelectField name="positions" />
            <RelationSelectField name="relation" />

            <InputField
              name="name"
              inputProps={{
                label: "Name",
                inputProps: { maxLength: 10 },
              }}
            />
            <InputField
              name="description"
              inputProps={{
                minRows: 5,
                multiline: true,
                label: "Description",
                inputProps: { maxLength: 10 },
              }}
            />

            <Button variant="outlined" onClick={() => handleSubmit()}>
              Submit
            </Button>
          </Stack>
        )}
      </Formik>
    </StyledComponent>
  );
}
