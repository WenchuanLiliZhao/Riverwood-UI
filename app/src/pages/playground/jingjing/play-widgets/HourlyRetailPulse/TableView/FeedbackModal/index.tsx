import * as React from "react";
import { Button } from "../../../../../../../components";
import { Modal } from "../../../../play-components/Modal";
import { MaterialIcon } from "../../../../../../../components/shared/material-icon";
import {
  FEEDBACK_PRESET_REASONS,
  FEEDBACK_THUMBS_DOWN_CATEGORIES,
  type FeedbackCategory,
} from "../../../../mockup-data";
import styles from "./FeedbackModal.module.scss";

export interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  feedbackType: "thumbsUp" | "thumbsDown";
  timeSlot?: string;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  feedbackType,
}) => {
  const [selectedReason, setSelectedReason] = React.useState<string>("");
  const [selectedCategory, setSelectedCategory] = React.useState<FeedbackCategory>("traffic");

  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason);
  };

  const handleCategoryChange = (category: FeedbackCategory) => {
    setSelectedCategory(category);
    setSelectedReason("");
  };

  const handleSubmit = () => {
    if (selectedReason) {
      onSubmit(selectedReason);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedReason("");
    setSelectedCategory("traffic");
    onClose();
  };

  const canSubmit = selectedReason !== "";

  const isThumbsUp = feedbackType === "thumbsUp";
  const currentCategory = FEEDBACK_THUMBS_DOWN_CATEGORIES.find(
    (cat) => cat.id === selectedCategory
  );
  const currentReasons = isThumbsUp
    ? FEEDBACK_PRESET_REASONS
    : currentCategory?.reasons ?? [];

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className={styles["feedback-modal"]}>
      <div className={styles["modal-container"]}>
        <div className={styles["header"]}>
          <div className={styles["header-content"]}>
          <MaterialIcon
            icon={isThumbsUp ? "thumb_up" : "thumb_down"}
            className={isThumbsUp ? styles["thumbs-up-icon"] : styles["thumbs-down-icon"]}
          />
          <h3 className={styles["header-title"]}>
            {isThumbsUp ? "Why do you like it?" : "Why don't you like it?"}
          </h3>
          </div>
          <p className={styles["header-description"]}>
            Your feedback will help us improve the product.
          </p>
        </div>
        <div className={styles["content"]}>
          {!isThumbsUp && (
            <div className={styles["category-tabs"]}>
              {FEEDBACK_THUMBS_DOWN_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  className={`${styles["category-tab"]} ${
                    selectedCategory === category.id ? styles["category-tab-active"] : ""
                  }`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          )}
          <div className={styles["reason-list"]}>
            {currentReasons.map((reason: string, index: number) => (
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

