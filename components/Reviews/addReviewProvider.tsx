import { createContext, useContext } from "react";

interface AddReviewContextProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const AddReviewContext = createContext<AddReviewContextProps>(null!);
export const useAddReviewContext = () => {
  const props = useContext(AddReviewContext);
  if (!props) throw new Error("No AddReviewContext provided");
  return props;
};
