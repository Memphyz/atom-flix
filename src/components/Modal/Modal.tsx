import {
  ReactElement,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import "./Modal.scss";
import { className } from "../../shared/utils/classname";
import { uuid } from "../../shared/utils/uuid";
import { isMobile } from "../..";

const WAIT_TIME = 500;

export function Modal(props: {
  open: boolean;
  children?: ReactElement | string;
  onClose?: () => void;
}): ReactElement {
  const [isOpen, setOpen] = useState(false);
  const [isClose, setClose] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [ canHide, setCanHide ] = useState(false);
  const [id] = useState(uuid());

  useEffect(() => {
    setClose(!props.open);
    setShowClose(true);
    setTimeout(() => {
      setShowClose(false);
      setCanHide(true)
    }, WAIT_TIME * 10);
    if (props.open) {
      setOpen(props.open);
      return undefined;
    }
    setTimeout(() => {
      setOpen(props.open);
    }, WAIT_TIME);
  }, [props.open]);

  function hide(): void {
    setClose(true);
    if (canHide) {
      setShowClose(false);
    }
    setTimeout(() => {
      setOpen(false);
      props.onClose && props.onClose();
    }, WAIT_TIME);
  }

  function onMouseMove(event: SyntheticEvent): void {
    if (canHide) {
      const positionY: number = event.nativeEvent[ "pageY" ];
      setShowClose(positionY < 200);
    }
  }

  return (
    <div
      className={className({
        "atom-modal-wrapper": true,
        open: isOpen,
        close: isClose,
      })}
      id={id + "-wrapper"}
      onClick={hide}
    >
      <div
        className="atom-modal"
        onMouseMove={onMouseMove}
        id={id}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <div
          className={className({
            close: true,
            show: !isMobile ? (showClose || isMobile) && showClose : true,
          })}
          onClick={hide}
        />
        {isOpen && props.children}
      </div>
    </div>
  );
}
