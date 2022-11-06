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

export function PositionsSelect({
  value,
  onSelectValue,
}: Pick<CustomSelectProps<ApplicantIndividualCompanyPosition>, "value" | "onSelectValue">) {
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
        if (data && Array.isArray(value)) {
          onSelectValue([
            ...value,
            { name: data.createApplicantIndividualCompanyPosition.name, id: Date.now().toString() },
          ]);
        }
      })
      .catch(() => {});

  return (
    <CustomSelect
      value={value}
      options={list}
      multiple={true}
      label="Positions"
      loading={loading}
      onSelectValue={onSelectValue}
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
