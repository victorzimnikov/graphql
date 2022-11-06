import React from "react";
import styled from "@emotion/styled";

const Component = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 4px;
`;

interface Props {
  readonly text: string;
  readonly className?: string;
}

export function ErrorText({ className, text }: Props) {
  return <Component className={className}>{text}</Component>;
}
