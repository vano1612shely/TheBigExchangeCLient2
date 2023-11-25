import { useDispatch } from "react-redux";
import { rootAction } from "../store/root-action";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
};
