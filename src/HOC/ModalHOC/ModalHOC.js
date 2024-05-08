import React from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL } from "../../redux/types/ModalTypes";
export default function ModalHOC() {
  const dispatch = useDispatch();
  const { IsModalOpen, width, title, Component, maskClosable, closeIcon } = useSelector(
    (state) => state.ModalReducer
  );
  return (
    <>
      <Modal
        title={title}
        centered
        keyboard={true}
        open={IsModalOpen}
        onOk={() => dispatch({ type: CLOSE_MODAL })}
        onCancel={() => dispatch({ type: CLOSE_MODAL })}
        width={width}
        footer={null}
        closeIcon={closeIcon}
        maskClosable={maskClosable}
      >
        {Component}
      </Modal>
    </>
  );
}
