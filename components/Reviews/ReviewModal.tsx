import { ComponentPropsWithoutRef, FC, useState } from "react";
import {
  AddReviewContext,
  useAddReviewContext,
} from "@/components/Reviews/addReviewProvider";
import clsx from "clsx";

interface ModalProps extends ComponentPropsWithoutRef<"div"> {}
const ModalComponent: FC<ModalProps> = ({ children, ...rest }) => {
  const [open, setOpen] = useState<boolean>(false);
  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };
  return (
    <AddReviewContext.Provider value={{ open, onOpen, onClose }}>
      {children}
      <div></div>
    </AddReviewContext.Provider>
  );
};

interface ModalButtonProps extends ComponentPropsWithoutRef<"button"> {}
const ModalButton: FC<ModalButtonProps> = ({
  children,
  className,
  onClick,
  ...rest
}) => {
  const props = useAddReviewContext();
  return (
    <button
      className={clsx("", className)}
      onClick={(e) => {
        onClick?.(e);
        props.onOpen();
      }}
    >
      {children}
    </button>
  );
};

interface ModalContentProps extends ComponentPropsWithoutRef<"div"> {}

const ModalContent: FC<ModalContentProps> = ({ children, ...rest }) => {
  const props = useAddReviewContext();
  return (
    <>
      {" "}
      {props.open ? (
        <>
          {" "}
          <div
            className="fixed w-[100vw] h-[100vh] left-0 top-0 bg-zinc-900 bg-opacity-50 z-10"
            onClick={() => props.onClose()}
          ></div>
          <div className="absolute z-20 bg-zinc-900 p-[20px] rounded-[10px] min-w-[300px] left-[calc(50%_-_150px)] drop-shadow-3xl-light">
            {children}
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

interface ModalCloseButtonProps extends ComponentPropsWithoutRef<"button"> {}
const ModalCloseButton: FC<ModalCloseButtonProps> = ({
  children,
  className,
  onClick,
  ...rest
}) => {
  const props = useAddReviewContext();
  return (
    <button
      className={clsx("", className)}
      onClick={(e) => {
        onClick?.(e);
        props.onClose();
      }}
    >
      {children}
    </button>
  );
};

const Modal = Object.assign(ModalComponent, {
  Button: ModalButton,
  Content: ModalContent,
  CloseButton: ModalCloseButton,
});
export default Modal;
