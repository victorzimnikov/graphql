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
  onChange,
}: Pick<CustomSelectProps<ApplicantIndividualCompanyPosition>, "value" | "onChange">) {
  const [getPositionsResult] = useQuery<QueryResultType>({
    query: positionsQuery,
  });
  const [createPositionResult, createPosition] = useMutation(createPositionMutation);

  const loading = getPositionsResult.fetching || createPositionResult.fetching;

  const list = getPositionsResult.data?.applicantIndividualCompanyPositions?.data || [];

  const addPositionHandler = (name: string) => createPosition({ name }).catch(() => {});

  return (
    <CustomSelect
      value={value}
      options={list}
      multiple={true}
      label="Positions"
      loading={loading}
      onChange={onChange}
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
