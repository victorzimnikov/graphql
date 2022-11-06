import React from "react";
import { useMutation, useQuery } from "urql";

import { CustomSelect, CustomSelectProps } from "./CustomSelect";
import {
  ApplicantIndividualCompanyPosition,
  ApplicantIndividualCompanyPositionPaginator,
} from "../gql/graphql";

type QueryResultType = Record<
  "applicantIndividualCompanyPositions",
  ApplicantIndividualCompanyPositionPaginator
>;

type MutationResultType = Record<
  "createApplicantIndividualCompanyPosition",
  ApplicantIndividualCompanyPosition
>;

const positionsQuery = /* GraphQL */ `
  query {
    applicantIndividualCompanyPositions(first: 50) {
      data {
        id
        name
      }
    }
  }
`;

const createPositionMutation = /* GraphQL */ `
  mutation ($name: String!) {
    createApplicantIndividualCompanyPosition(name: $name) {
      name
    }
  }
`;

export function PositionsSelect(
  props: Pick<
    CustomSelectProps<ApplicantIndividualCompanyPosition>,
    "value" | "onSelectValue" | "InputProps"
  >,
) {
  const [getPositionsResult] = useQuery<QueryResultType>({
    query: positionsQuery,
  });
  const [createPositionResult, createPosition] =
    useMutation<MutationResultType>(createPositionMutation);

  const loading = getPositionsResult.fetching || createPositionResult.fetching;
  const list = getPositionsResult.data?.applicantIndividualCompanyPositions?.data || [];

  const addPositionHandler = (name: string) =>
    createPosition({ name })
      .then(({ data }) => {
        if (data && Array.isArray(props.value)) {
          props.onSelectValue([...props.value, data.createApplicantIndividualCompanyPosition]);
        }
      })
      .catch(() => {});

  return (
    <CustomSelect
      {...props}
      options={list}
      multiple={true}
      label="Positions"
      loading={loading}
      onAdd={addPositionHandler}
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
