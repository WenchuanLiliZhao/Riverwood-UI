import * as React from "react";
import { Button } from "../../../../../../../components";
import { Modal } from "../../../../play-components/Modal";
import { MaterialIcon } from "../../../../../../../components/shared/material-icon";
import { FEEDBACK_PRESET_REASONS } from "../../../../mockup-data";
import styles from "./FeedbackModal.module.scss";

export interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  timeSlot?: string;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedReason, setSelectedReason] = React.useState<string>("");
  const [customReason, setCustomReason] = React.useState<string>("");

  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason);
    setCustomReason("");
  };

  const handleCustomReasonChange = (value: string) => {
    setCustomReason(value);
    setSelectedReason("");
  };

  const handleSubmit = () => {
    const reason = selectedReason || customReason.trim();
    if (reason) {
      onSubmit(reason);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedReason("");
    setCustomReason("");
    onClose();
  };

  const canSubmit = selectedReason !== "" || customReason.trim() !== "";

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className={styles["feedback-modal"]}>
      <div className={styles["modal-container"]}>
        <div className={styles["icon-wrapper"]}>
          <MaterialIcon icon="thumb_up" className={styles["thumbs-up-icon"]} />
        </div>
        <div className={styles["content"]}>
          <div className={styles["reason-list"]}>
            {FEEDBACK_PRESET_REASONS.map((reason: string, index: number) => (
              <div
                key={index}
                className={`${styles["reason-item"]} ${
                  selectedReason === reason ? styles["reason-item-selected"] : ""
                }`}
                onClick={() => handleReasonSelect(reason)}
              >
                {reason}
              </div>
            ))}
            <div className={styles["custom-reason"]}>
              <input
                type="text"
                placeholder="Other reason..."
                value={customReason}
                onChange={(e) => handleCustomReasonChange(e.target.value)}
                className={styles["custom-reason-input"]}
              />
            </div>
          </div>
          <div className={styles["actions"]}>
            <Button
              content={{ text: "Skip" }}
              design={{
                variant: "ghost",
                semantic: "secondary",
                size: "medium",
              }}
              onClick={handleClose}
              hoverable={true}
            />
            <Button
              content={{ text: "Submit" }}
              design={{
                variant: "fill",
                semantic: "brand",
                size: "medium",
              }}
              onClick={handleSubmit}
              disabled={!canSubmit}
              hoverable={true}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

