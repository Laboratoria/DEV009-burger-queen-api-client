import React from "react";

interface EditDeleteButtonsProps {
    onEditClick: () => void;
    onDeleteClick: () => void;
}

const EditDeleteButtons: React.FC<EditDeleteButtonsProps> = ({ onEditClick, onDeleteClick }) => {
    return (
        <div>
            <button className="edit-button" onClick={onEditClick}>
                Edit
            </button>
            <button className="delete-button" onClick={onDeleteClick}>
                Delete
            </button>
        </div>
    );
}

export default EditDeleteButtons;
