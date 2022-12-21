import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "../../shared/common/constant";

export const fetchSample = async () => {
  return axios.get("api/sample").then((res) => res.data);
};

export const useFetchSample = () => {
  // @ts-ignore
  return useQuery([QUERIES.FETCH_SAMPLE], fetchSample);
};
