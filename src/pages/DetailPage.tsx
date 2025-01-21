import React from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../hooks";

export const DetailPage = () => {
  const { id } = useParams();
  const data = useAppSelector((state) => state.detail[id ?? "-"]);
  return <div>DetailPage{JSON.stringify(data, null, 2)}</div>;
};
