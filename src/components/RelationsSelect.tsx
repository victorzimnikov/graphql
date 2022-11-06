import React from "react";
import { useMutation, useQuery } from "urql";

import { CustomSelect, CustomSelectProps } from "./CustomSelect";
import {
  ApplicantIndividualCompanyRelation,
  ApplicantIndividualCompanyRelationPaginator,
} from "../gql/graphql";

type QueryResultType = Record<
  "applicantIndividualCompanyRelations",
  ApplicantIndividualCompanyRelationPaginator
>;

type MutationResultType = Record<
  "createApplicantIndividualCompanyRelation",
  ApplicantIndividualCompanyRelation
>;

const elementsQuery = /* GraphQL */ `
  query {
    applicantIndividualCompanyRelations(first: 50) {
      data {
        id
        name
      }
    }
  }
`;

const createRelationMutation = /* GraphQL */ `
  mutation ($name: String!) {
    createApplicantIndividualCompanyRelation(name: $name) {
      name
    }
  }
`;

export function RelationsSelect(
  props: Pick<
    CustomSelectProps<ApplicantIndividualCompanyRelation>,
    "value" | "onSelectValue" | "InputProps"
  >,
) {
  const [relationResult] = useQuery<QueryResultType>({
    query: elementsQuery,
  });

  const [createRelationResult, createRelation] =
    useMutation<MutationResultType>(createRelationMutation);

  const loading = createRelationResult.fetching || relationResult.fetching;
  const list = relationResult.data?.applicantIndividualCompanyRelations?.data || [];

  const addRelationHandler = (name: string) =>
    createRelation({ name })
      .then(({ data }) => {
        if (data) {
          props.onSelectValue({
            name: data.createApplicantIndividualCompanyRelation.name,
            id: Date.now().toString(),
          });
        }
      })
      .catch(() => {});

  return (
    <CustomSelect
      {...props}
      options={list}
      label="Relation"
      loading={loading}
      onAdd={addRelationHandler}
      isOptionEqualToValue={(option, value) => option.name === value?.name}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }

        return option.name;
      }}
    />
  );
}
