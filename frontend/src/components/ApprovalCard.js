import React, { useState } from 'react';
import './ApprovalCard.css';

function ApprovalCard({ name, reason, onClick, change }) {
  const [buttonText1, setButtonText1] = useState('Approve');
  const [buttonText2, setButtonText2] = useState('Reject');
  const [isDisabled, setIsDisabled] = useState(false);

  const handleApprove = () => {
    setButtonText1('Approved');
    setIsDisabled(true);
    // Simulate successful approval (replace with actual API call)
    if (onClick) {
      onClick(); // Call the provided onClick function if exists
    }
  };

  const handleReject = () => {
    setButtonText2('Rejected');
    setIsDisabled(true);
    // Simulate successful rejection (replace with actual API call)
    if (change) {
      change(); // Call the provided change function if exists
    }
  };

  return (
    <div className='approval__card'>
      <h4 className='font-bold text-lg'>{name}</h4>
      <p>{reason}</p>
      <div className='buttons'>
        <button disabled={isDisabled} onClick={handleApprove} style={{ margin: '5px' }}>
          {buttonText1}
        </button>
        <button disabled={isDisabled} onClick={handleReject} className='secondary__button' style={{ margin: '5px' }}>
        {buttonText2}
        </button>
      </div>
    </div>
  );
}

export default ApprovalCard;
