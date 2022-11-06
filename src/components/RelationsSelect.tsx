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

export function RelationsSelect({
  value,
  onChange,
}: Pick<CustomSelectProps<ApplicantIndividualCompanyRelation>, "value" | "onChange">) {
  const [relationResult] = useQuery<QueryResultType>({
    query: elementsQuery,
  });

  const [createRelationResult, createRelation] = useMutation(createRelationMutation);

  const loading = createRelationResult.fetching || relationResult.fetching;

  const list = relationResult.data?.applicantIndividualCompanyRelations?.data || [];

  const addRelationHandler = (name: string) => createRelation({ name }).catch(() => {});

  return (
    <CustomSelect
      value={value}
      options={list}
      label="Relation"
      loading={loading}
      onChange={onChange}
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
